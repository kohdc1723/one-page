"use server";

import { revalidateTag } from "next/cache";

import { prisma } from "@/lib/prisma";
import { SafeServerAction } from "@/types/actions";
import { Header } from "@prisma/client";

export const deleteHeaderAction: SafeServerAction<string, Header> = async (headerId) => {
  try {
    const header = await prisma.header.delete({
      where: { id: headerId }
    })

    revalidateTag(`resume-${header.resumeId}`);

    return {
      isSuccess: true,
      data: header
    }
  } catch (error) {
    console.error("Failed to delete header:", error);

    return {
      isSuccess: false,
      error: "Failed to delete header"
    }
  }
}