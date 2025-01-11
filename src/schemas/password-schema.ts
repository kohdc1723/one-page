import * as z from "zod";

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,40}$/;

const BasePasswordSchema = z.object({
  id: z.string()
    .min(1, "id is required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(40, "Password must be at most 40 characters long")
    .regex(
      passwordRegex,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
  confirmPassword: z.string()
})

export const PasswordSchema = BasePasswordSchema.refine(data => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords don't match"
});

export const UpdatePasswordSchema = BasePasswordSchema.omit({ confirmPassword: true });