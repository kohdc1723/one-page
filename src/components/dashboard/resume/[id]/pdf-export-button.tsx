"use client";

import ResumeDocument from "@/components/resume-document/resume-document";
import { Button } from "@/components/ui/button";
import { ResumeWithRelations } from "@/types/resume";
import { usePDF } from "@react-pdf/renderer";
import Link from "next/link";
import { useEffect } from "react";
import { CgExport, CgSpinner } from "react-icons/cg";

interface PdfExportButtonProps {
  resume: ResumeWithRelations;
}

export default function PdfExportButton({ resume }: PdfExportButtonProps) {
  const [instance, updateInstance] = usePDF({
    document: <ResumeDocument resume={resume} />
  });

  useEffect(() => {
    if (resume) {
      console.log({resume})
      updateInstance(<ResumeDocument resume={resume} />);
    }
  }, [resume, updateInstance]);

  if (instance.error) {
    return (
      <Button
        disabled
        className="w-12 md:w-24 flex items-center justify-center rounded bg-emerald-900"
      >
        <CgExport className="w-4 h-4" />
        <span className="hidden md:block">Export</span>
      </Button>
    );
  } else if (instance.loading) {
    return (
      <Button
        disabled
        className="w-12 md:w-24 flex items-center justify-center rounded bg-emerald-900"
      >
        <CgSpinner className="w-4 h-4 animate-spin" />
      </Button>
    )
  } else {
    return (
      <Link href={instance.url || ""} target="_blank">
        <Button className="w-12 md:w-24 flex items-center justify-center rounded bg-emerald-900 hover:bg-emerald-900/90">
          <CgExport className="w-4 h-4" />
          <span className="hidden md:block">Export</span>
        </Button>
      </Link>
    )
  }
}