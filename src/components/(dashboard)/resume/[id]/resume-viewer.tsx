"use client";

import { pdfjs } from 'react-pdf';
import { Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import { ScrollArea } from "@/components/ui/scroll-area";

export default function ResumeViewer({ pdfBlob }) {
  return (
    <ScrollArea className="flex-1 h-[calc(100dvh-48px)] md:h-dvh bg-red-100">
      <h2>PDF 미리보기</h2>
      {pdfBlob ? (
        <Document
          file={pdfBlob}
          onLoadError={error => console.error('Error while loading document!', error)}
          loading={<p>Loading PDF...</p>}
        >
          <Page pageNumber={1} />
        </Document>
      ) : (
        <p>Loading PDF...</p>
      )}
    </ScrollArea>
  );
}