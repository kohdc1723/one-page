import crypt from "crypto";
import { v4 as uuid } from "uuid";

import { prisma } from "@/lib/prisma";
import { getVerificationTokenByEmailOrNull } from "@/utils/verification-token";
import { getResetPasswordTokenByEmailOrNull } from "@/utils/reset-password-token";
import { getTwoFactorTokenByEmailOrNull } from "@/utils/two-factor-token";

const ONE_HOUR = 3600 * 1000;

export const generateVerificationToken = async (email: string) => {
  const token = uuid();

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

export const generateTwoFactorToken  = async (email: string) => {
  const token = crypt.randomInt(100_000, 1_000_000).toString();
  // TODO: change to 15mins
  const expires_at = new Date(new Date().getTime() + ONE_HOUR);

  const existingToken = await getTwoFactorTokenByEmailOrNull(email);

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id
      }
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires_at
    }
  });

  return twoFactorToken;
}