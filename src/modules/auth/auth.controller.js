import { validateData } from "../../utils/validateData.js";
import { createUserSchema, loginUserSchema } from "./auth.validate.js";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }
  register = async (req, res, next) => {
    try {
      const body = validateData(createUserSchema, req.body);
      const user = await this.authService.register(body);
      res.json({
        success: true,
        message: "User registered successfully",
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  login = async (req, res, next) => {
    try {
      const body = validateData(loginUserSchema, req.body);
      const user = await this.authService.login(body);
      res.json({
        success: true,
        message: "User logged in successfully",
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  getProfile = async (req, res) => {
    try {
      const user = req.user;
      const detaiUser = await this.authService.getProfile(user.id);
      res.json({
        success: true,
        message: "User profile retrieved successfully",
        data: {
          detaiUser,
        },
      });
    } catch (error) {}
  };
}
