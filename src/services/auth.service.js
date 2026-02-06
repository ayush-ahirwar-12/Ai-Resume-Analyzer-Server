import jwt from "jsonwebtoken";
import config from "../config/environment.js"

class AuthService{
    verifyToken(token){
        return jwt.sign(token,config.JWT_SECRET)
    }
}

export default AuthService

