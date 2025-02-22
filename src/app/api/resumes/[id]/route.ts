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
    const resume = await prisma.resume.findUnique({
      where: { id },
      include: {
        header: true,
        sections: {
          include: {
            educationItems: true,
            workExperienceItems: {
              include: {
                positions: true
              }
            },
            skillItems: true,
            projectItems: true
          }
        }
      }
    });

    if (!resume) {
      return NextResponse.json(`No resume found with id ${id}`, {
        status: 404
      });
    }

    return NextResponse.json(resume);
  } catch (err) {
    console.error("GET /api/resumes/[id] failed:", err);

    return NextResponse.json(`Failed to get resume with id ${id}`, {
      status: 500
    });
  }
}
