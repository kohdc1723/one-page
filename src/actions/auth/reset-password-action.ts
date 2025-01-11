"use server";

import * as z from "zod";

import { ResetPasswordSchema } from "@/schemas/reset-password-schema";
import { getUserByEmailOrNull } from "@/utils/user";
import { generateResetPasswordToken } from "@/utils/token";
import { sendResetPasswordEmail } from "@/lib/mail";
import { SafeServerAction } from "@/types/actions";

export const resetPasswordAction: SafeServerAction<z.infer<typeof ResetPasswordSchema>, undefined> = async (values) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: "Invalid email"
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmailOrNull(email);

  if (!existingUser) {
    return {
      isSuccess: false,
      error: "Email not found"
    };
  }

  try {
    const resetPasswordToken = await generateResetPasswordToken(email);
    await sendResetPasswordEmail(resetPasswordToken.email, resetPasswordToken.token);

    return {
      isSuccess: true,
      data: undefined,
      message: "Reset email sent"
    };
  } catch (err) {
    console.error("Failed to reset password:", err);

    return {
      isSuccess: false,
      error: "Something went wrong"
    };
  }
}