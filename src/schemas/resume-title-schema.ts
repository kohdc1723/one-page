import * as z from "zod";

export const ResumeTitleSchema = z.object({
  id: z.string(),
  title: z.string()
    .min(1, "Title is required")
    .max(50, "Title must be less than 50 characters")
});