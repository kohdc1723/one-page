"use client";

import { useEffect, useRef, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { useResizeObserver } from "usehooks-ts";

import { ScrollArea } from "@/components/ui/scroll-area";
import ResumeViewer from "./resume-viewer";
import ResumeDocument from "./resume-document/resume-document";

export default function ResumeEditor({ resume }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width = 0 } = useResizeObserver({
    ref: containerRef,
    box: "border-box"
  });

  const [pdfBlob, setPdfBlob] = useState(null);

  const generatePdf = async () => {
    const blob = await pdf(<ResumeDocument resume={resume} />).toBlob();
    setPdfBlob(blob);
  };

  useEffect(() => {
    generatePdf();
  }, [resume]);

  return (
    <div className="h-[calc(100dvh-104px)] md:h-[calc(100dvh-56px)] flex flex-col md:flex-row">
      <ScrollArea
        ref={containerRef}
        className="flex-1 h-[calc(100dvh-48px)] md:h-dvh border-r border-slate-300"
      >
        {width}
        ResumeEditor
      </ScrollArea>
      <ResumeViewer pdfBlob={pdfBlob} width={width - 34} />
    </div>
  );
}