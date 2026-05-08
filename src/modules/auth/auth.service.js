import { generateToken } from "../../utils/generateToken.js";
import { verifyPassword } from "../../utils/verifyPassword.js";
import { UserRepository } from "./auth.reposotory.js";

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async register(userData) {
    const checkExisting = await this.userRepository.findByEmail({
      where: {
        email: userData.email,
      },
    });
    if (checkExisting) {
      throw new Error("User already exists");
    }
    userData.password = await hashPassword(userData.password);
    const user = await this.userRepository.register(userData);
    return user;
  }
  async login(userData) {
    const user = await this.userRepository.findByEmail(userData.email);
    if (!user) {
      const error = new Error("Email not found!");
      error.status = 404;
      throw error;
    }
    const isPasswordValid = await verifyPassword(
      userData.password,
      user.password
    );
    console.log({'userdata.password': userData.password, 'user.password': user.password, isPasswordValid})
    if (!isPasswordValid) {
      const error = new Error("Invalid password!");
      error.status = 401;
      throw error;
    }
    const token = await generateToken(user);
    user.token = token;
    return user;
  }
}
