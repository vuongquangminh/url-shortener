import { prisma } from "../../config/prisma.js";

export class UserRepository {
  constructor() {}

  async register(userData) {
    const result = await prisma.user.create({
      data: userData,
    });
    return result;
  }
  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
