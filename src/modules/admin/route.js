const express = require("express");
const { AdminController } = require("./admin.controller.js");
const { roleAdminMiddleware } = require("../../middlewares/role.middleware.js");
const { authMiddleware } = require("../../middlewares/auth.middleware.js");
const { UserService } = require("./user/user.service.js");
const {
  SubscriptionPlanRepository,
} = require("./subscriptions/subscriptionPlan.repository.js");
const {
  SubscriptionPlanService,
} = require("./subscriptions/subscriptionPlan.service.js");
const router = express.Router();

const userSvc = new UserService();
const subRepo = new SubscriptionPlanRepository();
const subSvc = new SubscriptionPlanService(subRepo);

const adminController = new AdminController(userSvc, subSvc);

/**
 * @swagger
 * /api/v1/admin/login:
 *   post:
 *     summary: Login admin
 *     description: Authenticate admin user and return JWT token.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "minh@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successfully
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
router.post("/login", adminController.login);
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management APIs
 */

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get users successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 */

router.get(
  "/users",
  authMiddleware,
  roleAdminMiddleware,
  adminController.getUsers
);
/**
 * @swagger
 * /api/v1/admin/users:
 *   post:
 *     summary: Create user by admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               name:
 *                 type: string
 *                 example: "Minh"
 *               role:
 *                 type: string
 *                 example: "USER"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 */
router.post(
  "/users",
  authMiddleware,
  roleAdminMiddleware,
  adminController.register
);
/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   put:
 *     summary: Update user by admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "updated@gmail.com"
 *               name:
 *                 type: string
 *                 example: "Updated Minh"
 *               role:
 *                 type: string
 *                 example: "ADMIN"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: User not found
 */
router.put(
  "/users/:id",
  authMiddleware,
  roleAdminMiddleware,
  adminController.updateUser
);
/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   delete:
 *     summary: Delete user by admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: User not found
 */
router.delete(
  "/users/:id",
  authMiddleware,
  roleAdminMiddleware,
  adminController.deleteUser
);
/**
 * @swagger
 * /api/v1/admin/subscription-plans:
 *   get:
 *     summary: Get all subscription plans
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get subscription plans successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 */
router.get(
  "/subscription-plans",
  authMiddleware,
  roleAdminMiddleware,
  adminController.getSubscriptionPlans
);
/**
 * @swagger
 * /api/v1/admin/subscription-plans:
 *   post:
 *     summary: Create subscription plan
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Pro"
 *               price:
 *                 type: number
 *                 example: 9.99
 *               maxUrls:
 *                 type: integer
 *                 example: 100
 *               description:
 *                 type: string
 *                 example: "Pro plan for advanced users"
 *     responses:
 *       201:
 *         description: Subscription plan created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 */
router.post(
  "/subscription-plans",
  authMiddleware,
  roleAdminMiddleware,
  adminController.createSubscriptionPlan
);
/**
 * @swagger
 * /api/v1/admin/subscription-plans/{id}:
 *   put:
 *     summary: Update subscription plan
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Business"
 *               price:
 *                 type: number
 *                 example: 19.99
 *               maxUrls:
 *                 type: integer
 *                 example: 500
 *               description:
 *                 type: string
 *                 example: "Business plan"
 *     responses:
 *       200:
 *         description: Subscription plan updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Subscription plan not found
 */
router.put(
  "/subscription-plans/:id",
  authMiddleware,
  roleAdminMiddleware,
  adminController.updateSubscriptionPlan
);
/**
 * @swagger
 * /api/v1/admin/subscription-plans/{id}:
 *   delete:
 *     summary: Delete subscription plan
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Subscription plan deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Subscription plan not found
 */
router.delete(
  "/subscription-plans/:id",
  authMiddleware,
  roleAdminMiddleware,
  adminController.deleteSubscriptionPlan
);

module.exports = router;
