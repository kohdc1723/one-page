"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { CgExport, CgSpinner } from "react-icons/cg";

import ResumeDocument from "@/components/resume-document/resume-document";
import { Button } from "@/components/ui/button";
import { ResumeWithRelations } from "@/types/resume";

interface PdfExportButtonProps {
  resume: ResumeWithRelations;
}

export default function PdfExportButton({ resume }: PdfExportButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExportPdf = async () => {
    try {
      setIsLoading(true);
      const blob = await pdf(<ResumeDocument resume={resume} />).toBlob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resume.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleExportPdf}
      disabled={isLoading}
      className="w-12 md:w-24 flex items-center justify-center rounded bg-emerald-900 hover:bg-emerald-900/90"
    >
      {isLoading ? (
        <CgSpinner className="w-4 h-4 animate-spin" />
      ) : (
        <>
          <CgExport className="w-4 h-4" />
          <span className="hidden md:block">Export</span>
        </>
      )}
    </Button>
  );
}