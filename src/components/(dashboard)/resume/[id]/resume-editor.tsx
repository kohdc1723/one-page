"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ResumeViewer from "./resume-viewer";
import { pdf } from "@react-pdf/renderer";
import ResumeDocument from "./resume-document";
import { useEffect, useState } from "react";

export default function ResumeEditor({ resume }) {
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
      <ScrollArea className="flex-1 h-[calc(100dvh-48px)] md:h-dvh bg-blue-100">
        ResumeEditor
      </ScrollArea>
      <ResumeViewer pdfBlob={pdfBlob} />
    </div>
  );
}