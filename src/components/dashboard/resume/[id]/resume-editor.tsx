"use client";

import { ChangeEvent, forwardRef } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

interface ResumeEditorProps {
  resume: any;
  setResume: any;
}

const ResumeEditor = forwardRef<HTMLDivElement, ResumeEditorProps>((
  { resume, setResume }, ref
) => {
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => setResume({
    ...resume,
    header: {
      ...resume.header,
      name: e.target.value
    }
  });

  return (
    <div
      ref={ref}
      className="flex-1 h-[calc(100dvh-104px)] md:h-[calc(100dvh-56px)] border-r border-slate-300"
    >
      <ul className="p-4 h-14 flex items-center gap-4 border-b border-slate-300">
        <li className="py-2 rounded flex-1 text-center text-sm text-emerald-900 font-medium hover:bg-emerald-900/5">
          Contents
        </li>
        <li className="py-2 rounded flex-1 text-center text-sm text-emerald-900 font-medium hover:bg-emerald-900/5">
          Tab2
        </li>
        <li className="py-2 rounded flex-1 text-center text-sm text-emerald-900 font-medium hover:bg-emerald-900/5">
          Tab3
        </li>
        <li className="py-2 rounded flex-1 text-center text-sm text-emerald-900 font-medium hover:bg-emerald-900/5">
          Tab4
        </li>
      </ul>
      <ScrollArea
        className="flex-1 h-[calc(100dvh-160px)] md:h-[calc(100dvh-112px)]"
      >
        {/* <input type="text" value={resume.header.name} onChange={handleChangeName} /> */}
        {/* {JSON.stringify(resume, null, 4)} */}
        <div className="h-[calc(100dvh-112px)] bg-red-100"></div>
      </ScrollArea>
    </div>
  );
});

ResumeEditor.displayName = "ResumeEditor";

export default ResumeEditor;