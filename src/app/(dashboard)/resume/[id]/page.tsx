import { ScrollArea } from "@/components/ui/scroll-area";

interface ResumeIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResumeIdPage({ params }: ResumeIdPageProps) {
  const { id } = await params;
  console.log(id);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row">
        <ScrollArea className="md:flex-1 h-[calc(100dvh-104px)] md:h-[calc(100dvh-56px)] border-r">
          <div className="h-[calc(100dvh-104px)]"></div>
          <div className="h-[2000px]"></div>
        </ScrollArea>
      </div>
    </div>
  );
}