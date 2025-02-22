import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const resumes = await prisma.resume.findMany();

    return NextResponse.json(resumes);
  } catch (err) {
    console.error("GET /api/resumes failed:", err);

    return NextResponse.json("Failed to get resumes", {
      status: 500
    });
  }
}
