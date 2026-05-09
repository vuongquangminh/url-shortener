import { UserRepository } from "./user.repository.js";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
  async updateUser(userId, updateData) {
    const result = await this.userRepository.updateUser(userId, updateData);
    if (!result) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return result;
  }
  async deleteUser(userId) {
    const result = await this.userRepository.deleteUser(userId);
    if (!result) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return result;
  }
}
