"use server";

import * as z from "zod";
import { hash } from "bcrypt-ts";

import { NewPasswordSchema } from "@/schemas/new-password-schema";
import { getResetPasswordTokenByTokenOrNull } from "@/utils/reset-password-token";
import { getUserByEmailOrNull } from "@/utils/user";
import { prisma } from "@/lib/prisma";
import { SafeServerAction } from "@/types/actions";

export const newPasswordAction: SafeServerAction<z.infer<typeof NewPasswordSchema>, undefined> = async (values) => {
  const { token } = values;

  if (!token) {
    return {
      isSuccess: false,
      error: "Missing token"
    };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: "Invalid fields"
    };
  }

  const { password } = validatedFields.data;

  const existingToken = await getResetPasswordTokenByTokenOrNull(token);

  if (!existingToken) {
    return {
      isSuccess: false,
      error: "Invalid token"
    };
  }

  const hasExpired = new Date(existingToken.expires_at) < new Date();

  if (hasExpired) {
    return {
      isSuccess: false,
      error: "Token has expired"
    };
  }

  const existingUser = await getUserByEmailOrNull(existingToken.email);

  if (!existingUser) {
    return {
      isSuccess: false,
      error: "Email does not exist"
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await prisma.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        password: hashedPassword
      }
    });
  
    await prisma.resetPasswordToken.delete({
      where: {
        id: existingToken.id
      }
    });

    return {
      isSuccess: true,
      data: undefined,
      message: "Password updated"
    };
  } catch (err) {
    console.error("Failed to update password:", err);

    return {
      isSuccess: false,
      error: "Something went wrong"
    };
  }
}