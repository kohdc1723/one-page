import * as z from "zod";

export const HeaderSchema = z.object({
  id: z.string()
    .min(1, "id is required"),
  resumeId: z.string()
    .min(1, "resumeId is required"),
  location: z.string(),
  email: z.string(),
  fullName: z.string(),
  phone: z.string(),
  links: z.array(z.string()),
});