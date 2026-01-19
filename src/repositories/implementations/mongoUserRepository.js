import userModel from "../../models/user.model"
import IUserRepository from "../contracts/IUserRepository"

class MongoUserRepository extends IUserRepository{
    async createUser(data){
        try {
            
        } catch (error) {
            
        }
    }
    async findUserbyEmail(email){
        try {
            const user = await userModel.findOne(email);
            return null;
        } catch (error) {
            
        }
    }
}