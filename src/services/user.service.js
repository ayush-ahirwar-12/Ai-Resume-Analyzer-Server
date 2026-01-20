import MongoCacheRepository from "../repositories/implementations/MongoCacheRepository.js";
import mongoUserRepository from "../repositories/implementations/mongoUserRepository.js";

class UserService {
  constructor() {
    this.UserRepository = new mongoUserRepository();
    this.cacheRepository = new MongoCacheRepository();
  }
  async createUser(data) {
    const email = data.email.toLowerCase().trim();
    const cacheKey = `user:email:${email}`;

    const isExist = null;
    if (!isExist) {
      isExist = await this.UserRepository.findUserbyEmail(email);
      if (isExist) {
        await this.cacheRepository.set(cacheKey, JSON.stringify(isExist), 3600);
        console.log(existingUser, "existuser");
      }
    }
    if(isExist){
        throw new Error("Email already exists",409);
        
    }
  }
}

export default UserService;
