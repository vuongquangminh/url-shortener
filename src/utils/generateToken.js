import env from "../config/env.js";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },

    env.jwtSecret,

    {
      expiresIn: env.jwtExpiresIn,
    }
  );
};
