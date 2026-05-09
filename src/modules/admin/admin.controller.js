import { ca } from "zod/locales";
import { AuthController } from "../auth/auth.controller.js";

export class AdminController extends AuthController {
  constructor(userService, subscriptionPlanService, subscriptionService) {
    super();
    this.userService = userService;
    this.subscriptionPlanService = subscriptionPlanService;
    this.subscriptionService = subscriptionService;
  }
  login = async (req, res, next) => {
    try {
      const body = req.body;
      const user = await this.authService.login(body);
      console.log("user: ", user);
      if (user.role !== "ADMIN") {
        const error = new Error("Forbidden");
        error.statusCode = 403;
        throw error;
      }
      res.json({
        success: true,
        message: "Admin logged in successfully",
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  getUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json({
        success: true,
        message: "Users retrieved successfully",
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const updateData = req.body;
    try {
      const result = await this.userService.updateUser(userId, updateData);
      res.json({
        success: true,
        message: "User updated successfully",
        data: { result },
      });
    } catch (error) {
      next(error);
    }
  };
  deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
      const result = await this.userService.deleteUser(userId);
      res.json({
        success: true,
        message: "User deleted successfully",
        data: { result },
      });
    } catch (error) {
      next(error);
    }
  };

  getSubscriptionPlans = async (req, res, next) => {
    try {
      const subPlans = await this.subscriptionPlanService.getAllsubPlans();
      res.json({
        success: true,
        message: "SubscriptionPlan retrieved successfully",
        data: {
          subPlans,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  createSubscriptionPlan = async (req, res, next) => {
    try {
      const body = req.body;
      const subPlan = await this.subscriptionPlanService.createSubscriptionPlan(
        body
      );
      res.json({
        success: true,
        message: "SubscriptionPlan created successfully",
        data: {
          subPlan,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  updateSubscriptionPlan = async (req, res, next) => {
    const subPlanId = req.params.id;
    const updateData = req.body;
    console.log("updateData: ", updateData);
    try {
      const result = await this.subscriptionPlanService.updateSubscriptionPlan(
        subPlanId,
        updateData
      );
      res.json({
        success: true,
        message: "SubscriptionPlan updated successfully",
        data: { result },
      });
    } catch (error) {
      next(error);
    }
  };
  deleteSubscriptionPlan = async (req, res, next) => {
    const subPlanId = req.params.id;
    try {
      const result = await this.subscriptionPlanService.deleteSubscriptionPlan(
        subPlanId
      );
      res.json({
        success: true,
        message: "SubscriptionPlan deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  assignSubscription = async (req, res, next) => {
    const userId = req.params.id;
    const { subPlanId } = req.body;
    try {
      const result = await this.subscriptionService.assignSubscription(
        userId,
        subPlanId
      );
      res.json({
        success: true,
        message: "SubscriptionPlan assigned successfully",
        data: { result },
      });
    } catch (error) {
      next(error);
    }
  };
  updateAssignedSubscription = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const subPlanId = req.body.subPlanId;
      const status = req.body.status;
      const result = this.subscriptionService.updateAssignedSubscription(
        userId,
        subPlanId,
        status
      );
      res.json({
        success: true,
        message: "SubscriptionPlan updated successfully",
        data: { result },
      });
    } catch (error) {
      next(error);
    }
  };
  deleteAssignedSubscription = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const subPlanId = req.body.subPlanId;
      const result = this.subscriptionService.deleteAssignedSubscription(
        userId,
        subPlanId
      );
      res.json({
        success: true,
        message: "SubscriptionPlan deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
