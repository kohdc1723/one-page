"use client";

import { forwardRef } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

interface ResumeEditorProps {
  resume: any;
  setResume: any;
}

const ResumeEditor = forwardRef<HTMLDivElement, ResumeEditorProps>((
  { resume, setResume },
  ref
) => {
  const handleChangeName = (e) => setResume({
    ...resume,
    header: {
      ...resume.header,
      name: e.target.value
    }
  });

  return (
    <ScrollArea
      ref={ref}
      className="flex-1 h-[calc(100dvh-48px)] md:h-dvh border-r border-slate-300"
    >
      <input type="text" value={resume.header.name} onChange={handleChangeName} />
      {/* {JSON.stringify(resume, null, 4)} */}
    </ScrollArea>
  );
});

export default ResumeEditor;