"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/login-schema";
import { getUserByEmailOrNull } from "@/utils/user";
import { generateVerificationToken, generateTwoFactorToken } from "@/utils/token";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { SafeServerAction } from "@/types/actions";
import { getTwoFactorTokenByEmailOrNull } from "@/utils/two-factor-token";
import { prisma } from "@/lib/prisma";
import { getTwoFactorConfirmationByUserIdOrNull } from "@/utils/two-factor-confirmation";

export const loginAction: SafeServerAction<
  z.infer<typeof LoginSchema>,
  string | undefined
> = async (values) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: "Invalid input"
    };
  }

  const { email, password, twoFactorCode } = validatedFields.data;

  const existingUser = await getUserByEmailOrNull(email);
  
  if (!existingUser || !existingUser.email) {
    return {
      isSuccess: false,
      error: "Email doesn't exist"
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {
      isSuccess: true,
      data: undefined,
      message: "Confirmation email sent"
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (twoFactorCode) {
      const twoFactorToken = await getTwoFactorTokenByEmailOrNull(existingUser.email);

      if (!twoFactorToken) {
        return {
          isSuccess: false,
          error: "Invalid 2FA code"
        };
      }

      if (twoFactorToken.token !== twoFactorCode) {
        return {
          isSuccess: false,
          error: "Invalid 2FA code"
        };
      }

      const hasExpired = new Date(twoFactorToken.expires_at) < new Date();

      if (hasExpired) {
        return {
          isSuccess: false,
          error: "2FA code expired"
        };
      }

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id
        }
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserIdOrNull(existingUser.id);

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id
          }
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return {
        isSuccess: true,
        data: "2FA",
        message: "2FA confirmation email sent"
      };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    return { 
      isSuccess: true,
      data: "LOGIN_SUCCESS",
      message: "Login success"
    };
  } catch (err) {
    console.error("Failed to login:", err);

    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return {
            isSuccess: false,
            error: "Invalid credentials"
          };
        default:
          return {
            isSuccess: false,
            error: "Something went wrong"
          };
      }
    }

    return {
      isSuccess: false,
      error: "Something went wrong"
    };
  }
};