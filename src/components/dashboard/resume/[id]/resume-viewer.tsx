"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounceValue, useResizeObserver } from "usehooks-ts";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { ScrollArea } from "@/components/ui/scroll-area";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface ResumeViewerProps {
  resumeBlob: Blob;
  width: number;
}

const PADDING = 16 as const;

export default function ResumeViewer({ resumeBlob }: ResumeViewerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { width = 0 } = useResizeObserver({
    ref: ref,
    box: "border-box"
  });

  const [debouncedWidth] = useDebounceValue(width, 100);

  return (
    <ScrollArea
      ref={ref}
      className="flex-1 h-[calc(100dvh-48px)] md:h-dvh"
    >
      {resumeBlob ? (
        <Document
          file={resumeBlob}
          onLoadError={error => console.error('Error while loading document!', error)}
          loading={
            <div className="w-full h-96 flex justify-center items-center">
              Loading...
            </div>
          }
          className={`flex flex-col items-center justify-center p-[${PADDING}px]`}
        >
          <Page
            pageNumber={1}
            scale={1}
            width={debouncedWidth - (PADDING * 2)}
            className="border border-slate-300 shadow"
          />
          <div className="h-40" />
        </Document>
      ) : (
        null
      )}
    </ScrollArea>
  );
}