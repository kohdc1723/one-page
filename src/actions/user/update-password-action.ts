"use server";

import * as z from "zod";
import { hash } from "bcrypt-ts";

import { prisma } from "@/lib/prisma";
import { PasswordSchema } from "@/schemas/password-schema";
import { SafeServerAction } from "@/types/actions";
import { User } from "@prisma/client";

export const updatePasswordAction: SafeServerAction<z.infer<typeof PasswordSchema>, User> = async (values) => {
  const parsedValues = PasswordSchema.safeParse(values);
  if (!parsedValues.success) {
    return {
      isSuccess: false,
      error: "Invalid input"
    };
  }

  const { id, password } = parsedValues.data;
  const hashedPassword = await hash(password, 10);

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword
      }
    });

    return {
      isSuccess: true,
      data: user
    };
  } catch (err) {
    console.error("Failed to update password:", err);

    return {
      isSuccess: false,
      error: "Failed to update password"
    };
  }
}