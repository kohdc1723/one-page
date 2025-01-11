import { prisma } from "@/lib/prisma";

export const getUserByEmailOrNull = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    return user;
  } catch {
    return null;
  }
}

export const getUserByIdOrNull = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    return user;
  } catch {
    return null;
  }
}