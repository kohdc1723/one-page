"use server";

import { prisma } from "@/lib/prisma";
import { SafeServerAction } from "@/types/actions";
import { Header } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const createHeaderAction: SafeServerAction<string, Header> = async (resumeId) => {
  try {
    const header = await prisma.header.create({
      data: {
        resumeId: resumeId,
        fullName: "",
        location: "",
        phone: "",
        email: "",
        links: []
      }
    })

    revalidateTag(`resume-${resumeId}`);

    return {
      isSuccess: true,
      data: header
    }
  } catch (error) {
    console.error("Failed to create header:", error);

    return {
      isSuccess: false,
      error: "Failed to create header"
    }
  }
}