"use client";

import { useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useResizeObserver, useWindowSize } from "usehooks-ts";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function ResumeViewer({ pdfBlob }) {
  const ref = useRef(null);

  const maxWindowWidth = window.screen.availWidth;
  const { width: currentWindowWidth } = useWindowSize();
  const scale = currentWindowWidth / maxWindowWidth;

  const { width = 0 } = useResizeObserver({
    ref: ref,
    box: "content-box"
  });

  return (
    <ScrollArea className="flex-1 h-[calc(100dvh-48px)] md:h-dvh">
      <div ref={ref} className="bg-blue-200 flex flex-col items-center justify-center m-4">
        <div>{width}, {scale}</div>
        {pdfBlob ? (
          <Document
            file={pdfBlob}
            onLoadError={error => console.error('Error while loading document!', error)}
            loading={<p>Loading PDF...</p>}
          >
            <div className="border">
              <Page
                pageNumber={1}
                scale={1}
                width={(width - 2) * scale}
              />
            </div>
          </Document>
        ) : (
          <p>Loading PDF...</p>
        )}
      </div>
      <div className="h-40"></div>
    </ScrollArea>
  );
}