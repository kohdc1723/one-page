import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  if (!userId) {
    return NextResponse.json("Invalid parameter", {
      status: 400
    });
  }

  try {
    const resumes = await prisma.resume.findMany({
      where: {
        userId
      }
    });

    return NextResponse.json(resumes);
  } catch (err) {
    console.error(`GET /api/resumes/user/[${userId}] failed:`, err);

    return NextResponse.json("Failed to get resumes", {
      status: 500
    });
  }
}
