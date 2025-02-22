import { pdf } from "@react-pdf/renderer";
import { notFound } from "next/navigation";

import { fetcher } from "@/lib/fetcher";
import { ResumeWithRelations } from "@/types/resume";
import ResumeBuilder from "@/components/dashboard/resume/[id]/resume-builder";
import ResumeDocument from "@/components/resume-document/resume-document";

interface ResumeIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResumeIdPage({ params }: ResumeIdPageProps) {
  const { id } = await params;
  const response = await fetcher<ResumeWithRelations>(`/api/resumes/${id}`, {
    next: {
      tags: [`resume-${id}`]
    }
  });

  if (!response.success) {
    throw new Error(response.error);
  }

  if (!response.data) {
    notFound();
  }

  const resume = response.data;
  const resumeBlob = await pdf(<ResumeDocument resume={resume} />).toBlob();

  return (
    <div className="flex flex-col w-full">
      <ResumeBuilder
        initialResume={resume}
        initialResumeBlob={resumeBlob}
      />
    </div>
  );
}