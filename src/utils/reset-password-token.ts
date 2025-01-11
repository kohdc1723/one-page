import { prisma } from "@/lib/prisma";

export const getResetPasswordTokenByTokenOrNull = async (token: string) => {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
      where: { token }
    })

    return resetPasswordToken;
  } catch {
    return null;
  }
}

export const getResetPasswordTokenByEmailOrNull = async (email: string) => {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
      where: { email }
    })

    return resetPasswordToken;
  } catch {
    return null;
  }
}