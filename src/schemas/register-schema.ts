import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string()
    .min(1, "Email is required to register")
    .email("Invalid email format"),
  password: z.string()
    .min(6, "Minimum 6 characters are required"),
  name: z.string()
    .min(1, "Name is required to register")
});