import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json("Invalid parameter", {
      status: 400
    });
  }
  
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json(`No user found with id ${id}`, {
        status: 404
      });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("GET /api/user/[id] failed:", err);

    return NextResponse.json(`Failed to get user with id ${id}`, {
      status: 500
    });
  }
}