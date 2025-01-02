import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({
      success: false,
      error: "Invalid request"
    }, {
      status: 400
    });
  }
  
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({
      success: false,
      error: `Failed to get user with id ${id}`
    }, {
      status: 500
    });
  }
}