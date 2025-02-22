"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { useResizeObserver } from "usehooks-ts";

import ResumeBuilderHeader from "./resume-builder-header";
import ResumeEditor from "./resume-editor";
import ResumeViewer from "./resume-viewer";
import ResumeDocument from "../../../resume-document/resume-document";
import { ResumeWithRelations } from "@/types/resume";
import { useResumeStore } from "@/store/use-resume-store";

interface ResumeBuilderProps {
  initialResume: ResumeWithRelations;
  initialResumeBlob: Blob;
}

export default function ResumeBuilder({
  initialResume,
  initialResumeBlob
}: ResumeBuilderProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const { width = 0 } = useResizeObserver({
    ref: innerRef,
    box: "border-box"
  });

  const [resume, setResume] = useState(initialResume);
  const [resumeBlob, setResumeBlob] = useState(initialResumeBlob);

  const generatePdf = useCallback(async () => {
    if (resume) {
      const blob = await pdf(<ResumeDocument resume={resume} />).toBlob();
      setResumeBlob(blob);
    }
  }, [resume]);
  
  useEffect(() => {
    generatePdf();
  }, [generatePdf]);

  return (
    <div className="flex flex-col w-full">
      <ResumeBuilderHeader resume={resume} />
      <div className="h-[calc(100dvh-104px)] md:h-[calc(100dvh-56px)] flex flex-col md:flex-row">
        <ResumeEditor
          ref={innerRef}
          resume={resume}
          setResume={setResume}
        />
        <ResumeViewer
          resumeBlob={resumeBlob}
          width={width - 34}
        />
      </div>
    </div>
  );
}