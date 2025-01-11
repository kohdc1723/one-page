import * as z from "zod";

export const AccountInfoSchema = z.object({
  id: z.string()
    .min(1, "id is required"),
  name: z.string()
    .min(1, "Name is required")
    .max(40, "Name must be 40 characters maximum"),
  initial: z.string()
    .max(2, "Initial must be 2 characters maximum")
});