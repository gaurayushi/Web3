import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import { registerSchema, loginSchema } from "../validators/auth";
import { comparePassword, hashPassword } from "../utils/hash";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";
import crypto from "crypto";

const router = Router();

function refreshCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProd,
    path: "/auth",
  };
}

router.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });

  const { name, email, password } = parsed.data;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ message: "Email already registered" });

  const user = await prisma.user.create({
    data: { name, email, password: await hashPassword(password) },
  });

  return res.status(201).json({ user: { id: user.id, name: user.name, email: user.email } });
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await comparePassword(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = signAccessToken({ userId: user.id });

  // refresh token with jti
  const tokenId = crypto.randomUUID();
  const refreshToken = signRefreshToken({ userId: user.id, tokenId });

  const days = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS || 7);
  const expiresAt = new Date(Date.now() + days * 86400000);

  await prisma.refreshToken.create({
    data: {
      id: tokenId,
      userId: user.id,
      tokenHash: await bcrypt.hash(refreshToken, 10),
      expiresAt,
    },
  });

  res.cookie("refresh_token", refreshToken, {
    ...refreshCookieOptions(),
    maxAge: expiresAt.getTime() - Date.now(),
  });

  return res.json({ accessToken, user: { id: user.id, name: user.name, email: user.email } });
});

router.post("/refresh", async (req, res) => {
  const token = req.cookies?.refresh_token;
  if (!token) return res.status(401).json({ message: "Missing refresh token" });

  let decoded: any;
  try {
    decoded = verifyRefreshToken(token);
  } catch {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  const row = await prisma.refreshToken.findUnique({ where: { id: decoded.tokenId } });
  if (!row || row.userId !== decoded.userId || row.revoked) {
    return res.status(401).json({ message: "Refresh token not recognized" });
  }

  if (row.expiresAt < new Date()) {
    return res.status(401).json({ message: "Refresh token expired" });
  }

  const ok = await bcrypt.compare(token, row.tokenHash);
  if (!ok) return res.status(401).json({ message: "Refresh token mismatch" });

  // rotate
  await prisma.refreshToken.update({ where: { id: row.id }, data: { revoked: true } });

  const accessToken = signAccessToken({ userId: decoded.userId });

  const newTokenId = crypto.randomUUID();
  const newRefreshToken = signRefreshToken({ userId: decoded.userId, tokenId: newTokenId });

  const days = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS || 7);
  const expiresAt = new Date(Date.now() + days * 86400000);

  await prisma.refreshToken.create({
    data: {
      id: newTokenId,
      userId: decoded.userId,
      tokenHash: await bcrypt.hash(newRefreshToken, 10),
      expiresAt,
    },
  });

  res.cookie("refresh_token", newRefreshToken, {
    ...refreshCookieOptions(),
    maxAge: expiresAt.getTime() - Date.now(),
  });

  return res.json({ accessToken });
});

router.post("/logout", async (req, res) => {
  const token = req.cookies?.refresh_token;

  if (token) {
    try {
      const decoded: any = verifyRefreshToken(token);
      await prisma.refreshToken.updateMany({
        where: { userId: decoded.userId, revoked: false },
        data: { revoked: true },
      });
    } catch {}
  }

  res.clearCookie("refresh_token", refreshCookieOptions());
  return res.json({ message: "Logged out" });
});

export default router;
