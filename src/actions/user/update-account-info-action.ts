"use server";

import * as z from "zod";

import { prisma } from "@/lib/prisma";
import { AccountInfoSchema } from "@/schemas/account-info-schema";
import { User } from "@prisma/client";
import { ServerActionResponse } from "../types";

interface UpdateAccountInfoActionProps {
  id: string;
  values: z.infer<typeof AccountInfoSchema>
}

export default async function updateAccountInfoAction({
  id,
  values
}: UpdateAccountInfoActionProps): Promise<ServerActionResponse<User>> {
  if (!id) {
    return {
      success: false,
      error: "Invalid parameters"
    }
  }

  const parsedValues = AccountInfoSchema.safeParse(values);
  if (!parsedValues.success) {
    return {
      success: false,
      error: "Invalid values"
    };
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...parsedValues.data
      }
    })

    return {
      success: true,
      data: user
    };
  } catch {
    return {
      success: false,
      error: "Failed to update an user"
    };
  }
}