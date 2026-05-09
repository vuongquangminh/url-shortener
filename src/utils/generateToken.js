import env from "../config/env.js";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },

    env.jwtSecret,

    {
      expiresIn: env.jwtExpiresIn,
    }
  );
};
