import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export default async function getUserAction(id: string | undefined): Promise<User | null> {
  if (!id) return null;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
}