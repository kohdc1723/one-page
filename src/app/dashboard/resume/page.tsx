import { fetcher } from "@/lib/fetcher";
import { Resume } from "@prisma/client";
import ResumeSection from "@/components/dashboard/resume/resume-section";

export default async function ResumePage() {
  const response = await fetcher<Resume[]>("/api/resumes", {
    next: {
      tags: ["resumes"]
    }
  });

  if (response.success) {
    const resumes = response.data as Resume[];

    return <ResumeSection resumes={resumes} />
  }

  throw new Error(response.error);
}