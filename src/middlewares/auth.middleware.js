import env from "../config/env.js";
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, env.jwtSecret);

    req.user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = "Invalid or expired token";
    next(error);
  }
};
