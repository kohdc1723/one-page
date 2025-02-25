import { ScrollArea } from "@/components/ui/scroll-area";
import { ResumeWithRelations } from "@/types/resume";
import ContentsTab from "./contents-editor/contents-editor";
import StylesTab from "./styles-tab";
import DesignTab from "./design-tab";
import TabSelector from "./tab-selector";

interface ResumeEditorProps {
  resume: ResumeWithRelations;
  activeTab: string;
}

export default function ResumeEditor({ resume, activeTab }: ResumeEditorProps) {
  return (
    <div className="flex-1 h-[calc(100dvh-104px)] md:h-[calc(100dvh-56px)] border-r border-slate-300">
      <TabSelector activeTab={activeTab} />
      <ScrollArea className="flex-1 h-[calc(100dvh-160px)] md:h-[calc(100dvh-112px)]">
        {(activeTab === "contents") && (
          <ContentsTab
            resume={resume}
          />
        )}
        {(activeTab === "styles") && <StylesTab />}
        {(activeTab === "design") && <DesignTab />}
      </ScrollArea>
    </div>
  );
}