"use server";

import * as z from "zod";

import { prisma } from "@/lib/prisma";
import { AccountInfoSchema } from "@/schemas/account-info-schema";
import { SafeServerAction } from "@/types/actions";
import { User } from "@prisma/client";

export const updateAccountInfoAction: SafeServerAction<z.infer<typeof AccountInfoSchema>, User> = async (values) => {
  const parsedValues = AccountInfoSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      isSuccess: false,
      error: "Invalid input"
    };
  }

  try {
    const { id } = values;

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...parsedValues.data
      }
    });

    return {
      isSuccess: true,
      data: user
    };
  } catch (err) {
    console.error("Failed to update an user:", err);

    return {
      isSuccess: false,
      error: "Failed to update an user"
    };
  }
}