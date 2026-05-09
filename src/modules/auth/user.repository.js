import { prisma } from "../../config/prisma.js";

export class UserRepository {

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
  async getProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        subscriptions: true, // Lấy quan hệ trực tiếp trong select luôn
      },
    });
    return user;
  }
}
