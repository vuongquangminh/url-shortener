import { prisma } from "../../config/prisma.js";

export class UrlRepository {
  async create(url) {
    const checkExisting = await prisma.url.findUnique({
      where: {
        originalUrl: url.originalUrl,
      },
    });
    if (checkExisting) {
      throw new Error("URL already exists");
    }
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
