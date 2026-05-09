import { generateToken } from "../../utils/generateToken.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { verifyPassword } from "../../utils/verifyPassword.js";

export class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async register(userData) {
    const checkExisting = await this.userRepository.findByEmail(userData.email);
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
    if (!isPasswordValid) {
      const error = new Error("Invalid password!");
      error.status = 401;
      throw error;
    }
    const token = await generateToken(user);
    user.token = token;
    return user;
  }
  async getProfile(userId) {
    const user = await this.userRepository.getProfile(userId);
    if (!user) {
      const error = new Error("User not found!");
      error.status = 404;
      throw error;
    }
    return user;
  }
}
