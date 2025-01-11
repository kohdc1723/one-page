import { v4 as uuid } from "uuid";
import { prisma } from "@/lib/prisma";

import { getVerificationTokenByEmailOrNull } from "./verification-token";
import { getResetPasswordTokenByEmailOrNull } from "./reset-password-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();

  const ONE_HOUR = 3600 * 1000;
  const expires_at = new Date(new Date().getTime() + ONE_HOUR);

  const existingToken  = await getVerificationTokenByEmailOrNull(email);
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires_at
    }
  });

  return verificationToken;
}

export const generateResetPasswordToken = async (email: string) => {
  const token = uuid();

  const ONE_HOUR = 3600 * 1000;
  const expires_at = new Date(new Date().getTime() + ONE_HOUR);

  const existingToken  = await getResetPasswordTokenByEmailOrNull(email);
  if (existingToken) {
    await prisma.resetPasswordToken.delete({
      where: {
        id: existingToken.id
      }
    });
  }

  const resetPasswordToken = await prisma.resetPasswordToken.create({
    data: {
      email,
      token,
      expires_at
    }
  });

  return resetPasswordToken;
}