"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas/register-schema";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields"
    };
  }

  return {
    success: true,
    message: "Register success"
  };
};