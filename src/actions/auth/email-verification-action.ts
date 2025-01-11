"use server";

import { prisma } from "@/lib/prisma";
import { SafeServerAction } from "@/types/actions";
import { getUserByEmailOrNull } from "@/utils/user";
import { getVerificationTokenByTokenOrNull } from "@/utils/verification-token";
import { VerificationToken } from "@prisma/client";

export const emailVerificationAction: SafeServerAction<string | null, VerificationToken> = async (token) => {
  if (!token) {
    return {
      isSuccess: false,
      error: "Missing token"
    };
  }

  const existingToken = await getVerificationTokenByTokenOrNull(token);

  if (!existingToken) {
    return {
      isSuccess: false,
      error: "Token not found"
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
      error: "User not found"
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email
      }
    });

    const verificationToken = await prisma.verificationToken.delete({
      where: { id: existingToken.id }
    });

    return {
      isSuccess: true,
      data: verificationToken,
      message: "Email verified"
    };
  } catch (err) {
    console.error("Failed to verify email:", err);

    return {
      isSuccess: false,
      error: "Something went wrong"
    };
  }
}