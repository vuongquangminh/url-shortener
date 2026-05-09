import { prisma } from "../../../config/prisma.js";

export class SubscriptionRepository {
  constructor() {}
  async assignSubscription(data) {
    const { userId, planId} = data;
    const existingSubscription = await prisma.subscription.findFirst({
        where: {
            userId,
            planId,
        },
    })
    if (existingSubscription) {
        throw new Error("Subscription already exists for this user and plan.");
    }
    return prisma.subscription.create({
      data,
    });
  }
  async updateAssignedSubscription(data) {
    const { userId, planId, status } = data;
    return prisma.subscription.updateMany({
      where: {
        userId,
        planId,
      },
      data: {
        status,
      },
    });
  }
  async deleteAssignedSubscription(data) {
    const { userId, planId } = data;
    return prisma.subscription.deleteMany({
      where: {
        userId,
        planId,
      },
    });
  }
}
