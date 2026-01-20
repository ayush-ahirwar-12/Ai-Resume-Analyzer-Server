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
    const userData = req.body;
    const result = await UserService.createUser(userData);

    res.cookie("token",result.token,{...this.cookieOptions,maxAge:60 * 60 *1000 });
    res.status(201).json({success:true,data:result});
  };
}

export default AuthController
