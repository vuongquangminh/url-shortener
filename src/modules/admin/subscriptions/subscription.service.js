export class SubscriptionService {
  constructor(subscriptionPlanRepository) {
    this.subscriptionPlanRepository = subscriptionPlanRepository;
  }
  async assignSubscription(userId, subPlanId ) {
    const subData = {
      userId: Number(userId),
      planId: Number(subPlanId),
      status: "active",
      startDate: new Date(),
    };
    return this.subscriptionPlanRepository.assignSubscription(subData);
  }
  async updateAssignedSubscription ( userId, subPlanId, status) {
    const subData = {
      userId: Number(userId),
      planId: Number(subPlanId),
      status,
    };
    return this.subscriptionPlanRepository.updateAssignedSubscription(subData);
  }
  async deleteAssignedSubscription ( userId, subPlanId) {
    const subData = {
      userId: Number(userId),
      planId: Number(subPlanId),
    };
    return this.subscriptionPlanRepository.deleteAssignedSubscription(subData);
  }
}
