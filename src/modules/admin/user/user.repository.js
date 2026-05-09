import { prisma } from "../../../config/prisma.js";

export class UserRepository {
  constructor() {}
  async getAllUsers() {
    const users = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    return users;
  }
  async updateUser(userId, updateData) {
    const result = await prisma.user.update({
      where: { id: Number(userId) },
      data: updateData,
    });
    return result;
  }
  async deleteUser(userId) {
    const result = await prisma.user.delete({
      where: { id: Number(userId) },
    });
    return result;
  }
}
