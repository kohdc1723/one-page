"use server";

import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/utils/user";
import { getVerificationTokenByToken } from "@/utils/verification-token";

export const emailVerificationAction = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      success: false,
      error: "Token not found"
    }
  }

  const hasExpired = new Date(existingToken.expires_at) < new Date();

  if (hasExpired) {
    return {
      success: false,
      error: "Token has expired"
    }
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      success: false,
      error: "User not found"
    }
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

    await prisma.verificationToken.delete({
      where: { id: existingToken.id }
    });

    return {
      success: true,
      message: "Email verified"
    };
  } catch (err) {
    const error = err as Error;
    console.error("Failed to verify email:", error.message);

    return {
      success: false,
      error: "Something went wrong"
    }
  }
}