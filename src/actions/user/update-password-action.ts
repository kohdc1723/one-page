"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { PasswordSchema, UpdatePasswordSchema } from "@/schemas/password-schema";

interface UpdatePasswordActionProps {
  id: string;
  values: z.infer<typeof PasswordSchema>
}

export default async function updatePasswordAction({ id, values }: UpdatePasswordActionProps): Promise<User | null> {
  if (!id) return null;

  const parsedValues = PasswordSchema.safeParse(values);
  if (!parsedValues.success) {
    return null;
  }

  const parsedValuesForUpdate = UpdatePasswordSchema.safeParse(values);
  if (!parsedValuesForUpdate.success) {
    return null;
  }

  const { password } = parsedValuesForUpdate.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword
      }
    })

    return user;
  } catch {
    return null;
  }
}