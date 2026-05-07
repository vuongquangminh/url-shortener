import { prisma } from "../../config/prisma.js";

export class UrlClickRepository {
    async create(data) {
      return prisma.urlClick.create({
        data,
      });
    }
  }