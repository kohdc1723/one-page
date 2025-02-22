import { Prisma } from "@prisma/client";

export type ResumeWithRelations = Prisma.ResumeGetPayload<{
  include: {
    header: true;
    sections: {
      include: {
        educationItems: true;
        workExperienceItems: {
          include: {
            positions: true;
          }
        };
        skillItems: true;
        projectItems: true;
      }
    }
  }
}>;

export type SectionWithRelations = Prisma.SectionGetPayload<{
  include: {
    workExperienceItems: {
      include: {
        positions: true;
      }
    };
    projectItems: true;
    skillItems: true;
    educationItems: true;
  }
}>;

export type WorkExperienceWithRelations = Prisma.WorkExperienceItemGetPayload<{
  include: {
    positions: true;
  }
}>;