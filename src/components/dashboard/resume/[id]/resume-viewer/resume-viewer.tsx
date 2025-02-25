"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounceValue, useResizeObserver } from "usehooks-ts";
import { pdf } from "@react-pdf/renderer";
import { CgSpinner } from "react-icons/cg";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ResumeWithRelations } from "@/types/resume";
import ResumeDocument from "@/components/resume-document/resume-document";
import NoDataComponent from "./no-data-component";
import ErrorComponent from "./error-component";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface ResumeViewerProps {
  resume: ResumeWithRelations;
  resumeBlob: Blob;
}

export default function ResumeViewer({
  resume,
  resumeBlob: initialResumeBlob
}: ResumeViewerProps) {
  const PADDING = 16;

  const ref = useRef<HTMLDivElement>(null);
  const { width = 0 } = useResizeObserver({
    ref: ref,
    box: "border-box"
  });

  const [debouncedWidth] = useDebounceValue(width, 100);

  const [resumeBlob, setResumeBlob] = useState<Blob>(initialResumeBlob);
  const [numPages, setNumPages] = useState<number>(1);

  const generatePdf = useCallback(async () => {
    if (resume) {
      const blob = await pdf(<ResumeDocument resume={resume} />).toBlob();
      setResumeBlob(blob);
    }
  }, [resume]);
  
  useEffect(() => {
    generatePdf();
  }, [generatePdf]);

  const onDocumentLoadSuccess = ({
    numPages
  }: {
    numPages: number
  }) => {
    setNumPages(numPages);
  };

  return (
    <ScrollArea
      ref={ref}
      className={`flex-1 h-[calc(100dvh-48px)] md:h-dvh`}
    >
      <Document
        file={resumeBlob}
        noData={<NoDataComponent />}
        loading={<CgSpinner className="animate-spin text-4xl text-emerald-900" />}
        error={<ErrorComponent />}
        onLoadSuccess={onDocumentLoadSuccess}
        className={`w-full flex flex-col items-center justify-center`}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page-${index + 1}`}
            pageNumber={index + 1}
            scale={1}
            width={debouncedWidth - (PADDING * 2)}
            className={`border border-slate-300 shadow mt-4`}
          />
        ))}
      </Document>
      {/* extra space for scrollbar */}
      <div className="h-40" />
    </ScrollArea>
  );
}