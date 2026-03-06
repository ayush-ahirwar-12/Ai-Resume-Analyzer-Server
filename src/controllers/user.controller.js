import UserService from "../services/user.service";

class UserController{
    constructor(){
        this.userService = new UserService();
    }
    async updateUserRole(req,res,next){
        try {
            const {id} = req.params;
            const {roleId} = req.body;

             if (!roleId) {
        return res.status(400).json({ 
          success: false,
          message: "Role is required" 
        });
      }
        } catch (error) {
            
        }
    }
}