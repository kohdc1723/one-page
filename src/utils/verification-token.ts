import { prisma } from "@/lib/prisma";

export const getVerificationTokenByTokenOrNull = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    });

    return verificationToken;
  } catch {
    return null;
  }
}

export const getVerificationTokenByEmailOrNull = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email }
    });

    return verificationToken;
  } catch {
    return null;
  }
}