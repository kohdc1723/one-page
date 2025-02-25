import { fetcher } from "@/lib/fetcher";
import { Resume } from "@prisma/client";
import ResumeSection from "@/components/dashboard/resume/resume-section";
import { auth } from "@/auth";

export default async function ResumePage() {
  const session = await auth();
  const userId = session?.user.id;

  const response = await fetcher<Resume[]>(`/api/resumes/user/${userId}`, {
    next: {
      tags: [`resumes-${userId}`]
    }
  });

  if (response.success) {
    const resumes = response.data as Resume[];

    return <ResumeSection resumes={resumes} />
  }

  throw new Error(response.error);
}