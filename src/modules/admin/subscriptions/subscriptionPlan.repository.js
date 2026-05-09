import { prisma } from "../../../config/prisma.js";

export class SubscriptionPlanRepository {
    constructor() {

    }
    async getAllSubscriptionPlans() {
        const subscriptionPlans = await prisma.subscriptionPlan.findMany();
        return subscriptionPlans;
    }
    async createSubscriptionPlan(subscriptionPlanData) {
        const result = await prisma.subscriptionPlan.create({
            data: subscriptionPlanData,
        });
        return result;
    }
    async deleteSubscriptionPlan(id) {
        const result = await prisma.subscriptionPlan.delete({
            where: { id: Number(id) },
        });
        return result;
    }
    async updateSubscriptionPlan(id, subscriptionPlanData) {
        const result = await prisma.subscriptionPlan.update({
            where: { id: Number(id) },
            data: subscriptionPlanData,
        });
        return result;
    }
    
}