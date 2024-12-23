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
  pdfBlob: any;
  width: number;
}

export default function ResumeViewer({ pdfBlob, width }: ResumeViewerProps) {
  return (
    <ScrollArea className="flex-1 h-[calc(100dvh-48px)] md:h-dvh">
      <div className="bg-blue-200 flex flex-col items-center justify-center m-4">
        {pdfBlob ? (
          <Document
            file={pdfBlob}
            onLoadError={error => console.error('Error while loading document!', error)}
            loading={<p>Loading PDF...</p>}
          >
            <div className="border border-slate-300">
              <Page
                pageNumber={1}
                scale={1}
                width={width}
              />
            </div>
          </Document>
        ) : (
          <p>Loading PDF...</p>
        )}
      </div>
      <div className="h-40" />
    </ScrollArea>
  );
}