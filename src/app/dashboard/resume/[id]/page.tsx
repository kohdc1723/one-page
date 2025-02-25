import { pdf } from "@react-pdf/renderer";
import { notFound } from "next/navigation";

import { fetcher } from "@/lib/fetcher";
import { ResumeWithRelations } from "@/types/resume";
import ResumeDocument from "@/components/resume-document/resume-document";
import ResumeEditor from "@/components/dashboard/resume/[id]/resume-editor/resume-editor";
import ResumeViewer from "@/components/dashboard/resume/[id]/resume-viewer/resume-viewer";
import ResumeHeader from "@/components/dashboard/resume/[id]/resume-header/resume-header";

interface ResumeIdPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab: string }>;
}

export default async function ResumeIdPage({
  params,
  searchParams
}: ResumeIdPageProps) {
  const { id } = await params;
  const tab = (await searchParams).tab || "contents";

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
      <ResumeHeader resume={resume} />
      <div className="h-[calc(100dvh-104px)] md:h-[calc(100dvh-56px)] flex flex-col md:flex-row">
        <ResumeEditor
          resume={resume}
          activeTab={tab}
        />
        <ResumeViewer
          resume={resume}
          resumeBlob={resumeBlob}
        />
      </div>
    </div>
  );
}