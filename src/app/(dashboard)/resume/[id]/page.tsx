import ResumeEditor from "@/components/(dashboard)/resume/[id]/resume-editor";
import ResumeViewer from "@/components/(dashboard)/resume/[id]/resume-viewer";

interface ResumeIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResumeIdPage({ params }: ResumeIdPageProps) {
  const { id } = await params;
  console.log(id);

  return (
    <div className="flex flex-col w-full">
      <div className="h-14 bg-green-100">
        header
      </div>
      <div className="h-[calc(100dvh-104px)] md:h-[calc(100dvh-56px)] flex flex-col md:flex-row">
        <ResumeEditor />
        <ResumeViewer />
      </div>
    </div>
  );
}