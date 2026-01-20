import { tryCatch } from "bullmq";
import userModel from "../../models/user.model.js";
import IUserRepository from "../contracts/IUserRepository";

class MongoUserRepository extends IUserRepository {
  async createUser(data) {
    try {
    } catch (error) {}
  }
  async findUserbyEmail(email) {
    try {
      const user = await userModel.findOne(email);
      return user;
    } catch (error) {
      console.log("Error in finding user", error);
    }
  }
  async findUserbyId(Id) {
    try {
      const user = await userModel.findById(Id);
      return user;
    } catch (error) {
      console.log("Error in finding user", error);
    }
  }
}

export default MongoUserRepository;
