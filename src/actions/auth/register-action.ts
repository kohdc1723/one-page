"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas/register-schema";
import { getUserByEmailOrNull } from "@/utils/user";
import { generateVerificationToken } from "@/utils/token";
import { sendVerificationEmail } from "@/lib/mail";
import { SafeServerAction } from "@/types/actions";
import { User } from "@prisma/client";

export const registerAction: SafeServerAction<z.infer<typeof RegisterSchema>, User> = async (values) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: "Invalid fields"
    };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await getUserByEmailOrNull(email);

    if (existingUser) {
      return {
        isSuccess: false,
        error: "Email already in use"
      };
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {
      isSuccess: true,
      data: user,
      message: "Confirmation email sent"
    };
  } catch (err) {
    console.error("Failed to register:", err);

    return {
      isSuccess: false,
      error: "Something went wrong"
    };
  }
};