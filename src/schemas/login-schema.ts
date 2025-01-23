import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string()
    .min(1, "Email is required to log in")
    .email("Invalid email format"),
  password: z.string()
    .min(1, "Password is required to log in"),
  twoFactorCode: z.optional(z.string())
});