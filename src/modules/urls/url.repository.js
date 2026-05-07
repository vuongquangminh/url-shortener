import { prisma } from "../../config/prisma.js";

export class UrlRepository {
  async create(url) {
    const result = await prisma.url.create({
      data: url,
    });
    return result;
  }

  async findByShortCode(shortCode) {
    return prisma.url.findUnique({
      where: {
        shortCode,
      },
    });
  }
  async incrementClickCount(shortCode) {
    return prisma.url.update({
      where: {
        shortCode,
      },
      data: {
        clickCount: {
          increment: 1,
        },
      },
    });
  }
}
