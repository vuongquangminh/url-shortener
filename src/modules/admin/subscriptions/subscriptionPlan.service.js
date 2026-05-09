export class SubscriptionPlanService {
  constructor(subscriptionPlanRepository) {
    this.subscriptionPlanRepository = subscriptionPlanRepository;
  }

  async getAllsubPlans() {
    return this.subscriptionPlanRepository.getAllSubscriptionPlans();
  }

  async createSubscriptionPlan(subscriptionPlanData) {
    return this.subscriptionPlanRepository.createSubscriptionPlan(
      subscriptionPlanData
    );
  }

  async deleteSubscriptionPlan(id) {
    return this.subscriptionPlanRepository.deleteSubscriptionPlan(id);
  }

  async updateSubscriptionPlan(id, subscriptionData) {
    return this.subscriptionPlanRepository.updateSubscriptionPlan(
      id,
      subscriptionData
    );
  }
}
