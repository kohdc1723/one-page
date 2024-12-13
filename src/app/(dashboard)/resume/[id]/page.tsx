import ResumeViewer from "@/components/(dashboard)/resume/[id]/resume-viewer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResumeIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResumeIdPage({ params }: ResumeIdPageProps) {
  const { id } = await params;

  return (
    <div className="w-full">
      <h1 className="h-14 bg-slate-100">/resume/{id} page</h1>
      <div className="flex flex-col md:flex-row">
        <ScrollArea className="md:flex-1 h-[calc(100dvh-104px)] md:h-[calc(100dvh-56px)] bg-slate-200">
          <div className="h-[calc(100dvh-56px)] bg-green-300"></div>
          <div className="h-[2000px] bg-red-300"></div>
        </ScrollArea>
        <ScrollArea className="md:flex-1 h-[calc(100dvh-104px)] md:h-[calc(100dvh-56px)] bg-slate-300">
          <div className="h-[calc(100dvh-104px)] bg-blue-300"></div>
          <div className="h-[2000px] bg-red-300"></div>
        </ScrollArea>
      </div>
    </div>
  );
}