"use client";

import { Dispatch, SetStateAction, forwardRef } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ResumeWithRelations } from "@/types/resume";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ContentsTab from "./contents-tab";
import StylesTab from "./styles-tab";
import DesignTab from "./design-tab";

interface ResumeEditorProps {
  resume: ResumeWithRelations;
  setResume: Dispatch<SetStateAction<ResumeWithRelations>>;
}

const ResumeEditor = forwardRef<HTMLDivElement, ResumeEditorProps>((
  { resume, setResume }, ref
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClickTab = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    router.push(`?${params.toString()}`);
  }

  return (
    <div
      ref={ref}
      className="flex-1 h-[calc(100dvh-104px)] md:h-[calc(100dvh-56px)] border-r border-slate-300"
    >
      <ul className="p-4 h-14 flex items-center gap-4 border-b border-slate-300">
        <li className="flex-1">
          <Button
            variant="ghost"
            onClick={() => handleClickTab("contents")}
            className={cn(
              "w-full py-2 rounded text-center text-sm text-emerald-900 font-medium hover:bg-emerald-900/5",
              searchParams.get("tab") === "contents" && "bg-emerald-900/10"
            )}
          >
            Contents
          </Button>
        </li>
        <li className="flex-1">
          <Button
            variant="ghost"
            onClick={() => handleClickTab("styles")}
            className={cn(
              "w-full py-2 rounded text-center text-sm text-emerald-900 font-medium hover:bg-emerald-900/5",
              searchParams.get("tab") === "styles" && "bg-emerald-900/10"
            )}
          >
            Styles
          </Button>
        </li>
        <li className="flex-1">
          <Button
            variant="ghost"
            onClick={() => handleClickTab("design")}
            className={cn(
              "w-full py-2 rounded text-center text-sm text-emerald-900 font-medium hover:bg-emerald-900/5",
              searchParams.get("tab") === "design" && "bg-emerald-900/10"
            )}
          >
            Design
          </Button>
        </li>
      </ul>
      <ScrollArea className="flex-1 h-[calc(100dvh-160px)] md:h-[calc(100dvh-112px)]">
        {(searchParams.get("tab") === "contents") && (
          <ContentsTab
            resume={resume}
            setResume={setResume}
          />
        )}
        {(searchParams.get("tab") === "styles") && <StylesTab />}
        {(searchParams.get("tab") === "design") && <DesignTab />}
      </ScrollArea>
    </div>
  );
});

ResumeEditor.displayName = "ResumeEditor";

export default ResumeEditor;