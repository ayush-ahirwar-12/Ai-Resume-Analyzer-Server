import { tryCatch } from "bullmq";
import UserService from "../services/user.service.js";

class AuthController {
  constructor() {
    this.userService = new UserService();
  }
  get cookieOptions() {
    const isProd = process.env.NODE_ENV === "production";
    console.log(process.env.NODE_ENV);
    console.log({
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
    });
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
    };
  }

  register = async (req, res, next) => {
    try {
      const userData = req.body;
      const result = await this.userService.createUser(userData);

      res.cookie("token", result.token, {
        ...this.cookieOptions,
        maxAge: 60 * 60 * 1000,

      });
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error)
    }
  };
  
  login = async(req,res,next)=>{
    try {
      const{email,password} = req.body;

      const result = await this.userService.login({email,password});

      res.cookie("token",result.token,{...this.cookieOptions,maxAge:60*60*1000})

      res.cookie("refreshToken",result.refreshToken,{...this.cookieOptions,maxAge:60*60*1000});

      res.status(200).json({success:true,expiresIn:3600,data:result});

    } catch (error) {
      next(error);
    }
  }

  update = async(req,res,next)=>{
    try {
          const userId = req.params.id;
    const newData = req.body;
    const result = this.userService.update(userId,newData);

    res.status(200).json({success:true,data:result});
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
