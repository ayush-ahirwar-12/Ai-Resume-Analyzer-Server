import mongoUserRepository from "../repositories/implementations/mongoUserRepository"

class UserService{
    constructor(){
        this.mongoUserRepository = new mongoUserRepository();
    }
    async createUser(data){
        
    }
}