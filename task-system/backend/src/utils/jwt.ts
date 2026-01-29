import jwt, { JwtPayload } from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

if (!ACCESS_SECRET) throw new Error("ACCESS_TOKEN_SECRET missing");
if (!REFRESH_SECRET) throw new Error("REFRESH_TOKEN_SECRET missing");

export type AccessPayload = { userId: string };
export type RefreshPayload = { userId: string; tokenId: string };

export function signAccessToken(payload: AccessPayload) {
  const expires = Number(process.env.ACCESS_TOKEN_EXPIRES_SECONDS || 900);
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: expires });
}

export function signRefreshToken(payload: RefreshPayload) {
  const days = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS || 7);
  const expires = days * 24 * 60 * 60; // seconds
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: expires });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload & AccessPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET) as JwtPayload & RefreshPayload;
}
