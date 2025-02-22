"use server";

import { prisma } from "@/lib/prisma";
import { HeaderSchema } from "@/schemas/header-schema";
import { SafeServerAction } from "@/types/actions";
import { Header } from "@prisma/client";
import { revalidateTag } from "next/cache";
import * as z from "zod";

export const updateHeaderAction: SafeServerAction<z.infer<typeof HeaderSchema>, Header> = async (values) => {
  const parsedValues = HeaderSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      isSuccess: false,
      error: "Invalid input"
    };
  }
  
  try {
    const { id } = values;

    const header = await prisma.header.update({
      where: { id },
      data: {
        ...parsedValues.data
      }
    });

    revalidateTag(`resume-${parsedValues.data.resumeId}`);

    return {
      isSuccess: true,
      data: header
    };
  } catch (err) {
    console.error("Failed to update header:", err);

    return {
      isSuccess: false,
      error: "Failed to update header"
    };
  }
}