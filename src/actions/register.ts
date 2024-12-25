"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas/register-schema";
import { getUserByEmail } from "@/utils/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields"
    };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      success: false,
      message: "Email already in use"
    }
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  });

  // TODO: send verification token email

  return {
    success: true,
    message: "Register success"
  };
};