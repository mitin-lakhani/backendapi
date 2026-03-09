import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email(),
  password: z.string().min(6,"Password must be at least 6 chars"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const otpSchema = z.object({
  email: z.string().email(),
  otp: z.number(),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
