import { NextFunction, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";

export type AuthedRequest = Request & {
  user?: { userId: string };
};

export function requireAuth(req: any, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ message: "Missing access token" });

  try {
    const decoded = verifyAccessToken(token);
    req.user = { userId: decoded.userId };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
}
