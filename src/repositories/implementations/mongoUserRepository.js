import { tryCatch } from "bullmq";
import userModel from "../../models/user.model.js";
import IUserRepository from "../contracts/IUserRepository.js";
import { AppError } from "../../utils/errors.js";

class MongoUserRepository extends IUserRepository {
  async createUser(data) {
    try {
      const user = new userModel(data);
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
  async findUserbyEmail(email) {
    try {
      const user = await userModel.findOne({ email });
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
  async update(userId, newData) {
    try {
      return await userModel.findByIdAndUpdate(userId, newData, { new: true });
    } catch (error) {
      throw new AppError("Error in updating User", 501, error);
    }
  }
};

export default MongoUserRepository;
