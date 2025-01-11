import * as z from "zod";

import { passwordRegex } from "./password-schema";

export const NewPasswordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(40, "Password must be at most 40 characters long")
    .regex(
      passwordRegex,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
  token: z.string()
    .nullable()
});