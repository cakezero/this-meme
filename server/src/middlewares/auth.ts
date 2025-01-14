import JWT from "../utils/jwt";
import type { Request, Response, NextFunction } from "express";
import type { User, CustomRequest } from "../utils/types";

export const requireAuth = (req: CustomRequest, res: Response, next: NextFunction) => {

  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res
      .status(401)
      .json({ message: "Unauthorized. Authorization header not set." });
      return;
    }
    
    const token = authHeader?.split("Bearer ")[1];

    if (!token) {
      res.status(401).json({
        message: "Unauthorized. Access token not set.",
      });
      return;
    }

    const decodedToken = JWT.verify(token as string);
    req.user = decodedToken as User;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res
        .status(400)
        .json({ message: "Token has expired" });
      return;
    }

    res
      .status(500)
      .json({ message: "Invalid token" });
  }
}