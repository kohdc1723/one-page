"use client";

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

export default function ResumeViewer({ resumeBlob, width }: ResumeViewerProps) {
  return (
    <ScrollArea className="flex-1 h-[calc(100dvh-48px)] md:h-dvh">
      <div className="flex flex-col items-center justify-center m-4">
        {resumeBlob ? (
          <Document
            file={resumeBlob}
            onLoadError={error => console.error('Error while loading document!', error)}
            loading={
              <div className="w-full h-96 flex justify-center items-center">
                Loading...
              </div>
            }
          >
            <div className="border border-slate-300 shadow">
              <Page
                pageNumber={1}
                scale={1}
                width={width}
              />
            </div>
          </Document>
        ) : (
          null
        )}
      </div>
      <div className="h-40" />
    </ScrollArea>
  );
}