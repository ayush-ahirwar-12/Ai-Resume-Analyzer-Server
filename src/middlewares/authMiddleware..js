import { redisClient } from "../config/redis";
import { AppError } from "../utils/errors";
import config from "../config/environment"
import jwt from "jsonwebtoken";

export const authMiddleware = async(req,res,next)=>{

    try {
            const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ","");
    if(!token){
        throw new AppError("Token must be provided",401);
    }
    const isBlacklisted = await redisClient.get(`bl_${token}`);
    if(isBlacklisted){
        throw new AppError("Token has been blacklisted",401);
    }

    const decoded = jwt.verify(token,config.JWT_SECRET);
    if(!decoded.isVerified || decoded.isVerified===false){
        throw new AppError("user is not verified",401);
    }

    req.userId = decoded.id;
    req.role = decoded.role;
    req.user={
        _id:decoded.id,
        email:decoded.email

    }
    next();
    } catch (error) {
        throw new AppError("Error in AuthMiddleware",400);
    }

}