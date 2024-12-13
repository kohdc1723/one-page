import React, { useEffect, useState, useRef, useCallback } from 'react';
// import Style from './pdfView.style';
import * as pdfjsLib from 'pdfjs-dist/webpack.mjs';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs';

export default function PdfViewer({ url }) {
  const canvasRef = useRef();
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const [pdfRef, setPdfRef] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const renderPage = useCallback(
    (pageNum, pdf = pdfRef) => {
      pdf &&
        pdf.getPage(pageNum).then(function (page) {
          const viewport = page.getViewport({ scale: 1.3 });
          const canvas = canvasRef.current;
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: canvas.getContext('2d'),
            viewport: viewport,
          };
          page.render(renderContext);
        });
    },
    [pdfRef]
  );

  useEffect(() => {
    renderPage(currentPage, pdfRef);
  }, [pdfRef, currentPage, renderPage]);

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(
      (loadedPdf) => {
        setPdfRef(loadedPdf);
      },
      function (reason) {
        console.error(reason);
      }
    );
  }, [url]);

  const nextPage = () =>
    pdfRef && currentPage < pdfRef.numPages && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <>
      <Style.ButtonsBox>
        <Style.Button onClick={prevPage}>이전 페이지</Style.Button>
        <Style.CurrentPage>현재 페이지 : {currentPage}</Style.CurrentPage>
        <Style.Button onClick={nextPage}>다음 페이지</Style.Button>
      </Style.ButtonsBox>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}