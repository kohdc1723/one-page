"use server";

import * as z from "zod";

import { prisma } from "@/lib/prisma";
import { Resume } from "@prisma/client";
import { SafeServerAction } from "@/types/actions";
import { ResumeTitleSchema } from "@/schemas/resume-title-schema";
import { revalidateTag } from "next/cache";

export const updateTitleAction: SafeServerAction<z.infer<typeof ResumeTitleSchema>, Resume> = async (values) => {
  const parsedValues = ResumeTitleSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      isSuccess: false,
      error: "Invalid input"
    };
  }

  try {
    const { id } = values;

    const resume = await prisma.resume.update({
      where: { id },
      data: {
        title: parsedValues.data.title
      }
    });

    revalidateTag(`resume-${parsedValues.data.id}`);

    return {
      isSuccess: true,
      data: resume
    };
  } catch (err) {
    console.error("Failed to update resume title:", err);

    return {
      isSuccess: false,
      error: "Failed to update resume title"
    };
  }
}