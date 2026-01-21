import { emailQueue } from "../queues/emailQueue.js";
import MongoCacheRepository from "../repositories/implementations/MongoCacheRepository.js";
import mongoUserRepository from "../repositories/implementations/mongoUserRepository.js";
import  jwt from "jsonwebtoken"
import config from "../config/environment.js"

class UserService {
  constructor() {
    this.UserRepository = new mongoUserRepository();
    this.cacheRepository = new MongoCacheRepository();
  }
  _getSafeRole(user) {
    return user.role
      ? {
          _id: user.role._id,
          name: user.role.name,
          description: user.role.description,
        }
      : null;
  }

  _getSafeUserPayload(user) {
    return {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber || null,
      role: this._getSafeRole(user),
      isVerified: user.isVerified,
    };
  }
  async createUser(data) {
    const email = data.email.toLowerCase().trim();
    const cacheKey = `user:email:${email}`;

    let isExist = null;
    if (!isExist) {
      isExist = await this.UserRepository.findUserbyEmail(email);
      if (isExist) {
        await this.cacheRepository.set(cacheKey, JSON.stringify(isExist), 3600);
        console.log(isExist, "existuser");
      }
    }
    if (isExist) {
      throw new Error("Email already exists", 409);
    }

    const user = await this.UserRepository.createUser({ ...data, email });

    const userWithRole = await this.UserRepository.findUserbyId(user._id);

    if (!userWithRole) throw new Error("Failed to fetch create user");

    const safeUser = this._getSafeUserPayload(userWithRole);

    await this.cacheRepository.set(
      `user:id:${userWithRole._id}`,
      JSON.stringify(safeUser),
      3600,
    );

    await this.cacheRepository.set(
      cacheKey,
      JSON.stringify({ ...safeUser, password: user.password }),
      3600,
    );
    const jwtPayload = {
      id: safeUser._id,
      email: safeUser.email,
      firstName: safeUser.firstName,
      lastName: safeUser.lastName,
      role: safeUser?.role?.name,
      isVerified: safeUser?.isVerified,
    };

    try {
      emailQueue.add(
        "verification-mail",
        {
          id: safeUser._id,
          email: safeUser.email,
          name: safeUser.firstName,
        },
        {
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 5000,
          },
          removeOnComplete: true,
          removeOnFail: false,
        },
      );
      console.info(`Welcome email job queued for ${safeUser?.email}`);
    } catch (error) {
      console.log("Failed to queue Verification email", {
        email: safeUser.email,
        error: error.message,
      });
    }


    const token = jwt.sign(jwtPayload,process.env.JWT_SECRET,{expiresIn:"1h"});
    return { user: safeUser, token };

  }
}

export default UserService;
