import { CgMenu } from "react-icons/cg";

import { Button } from "@/components/ui/button";
import { ResumeWithRelations } from "@/types/resume";
import TitleForm from "./title-form";
import PdfExportButton from "./pdf-export-button";

interface ResumeHeaderProps {
  resume: ResumeWithRelations;
}

export default function ResumeHeader({ resume }: ResumeHeaderProps) {
  return (
    <header className="h-14 px-4 flex items-center justify-between gap-4 border-b border-slate-300">
      <TitleForm resume={resume} />
      <div className="flex items-center gap-4">
        <PdfExportButton resume={resume} />
        <Button className="w-12 md:w-24 flex items-center justify-center rounded border border-emerald-900 text-emerald-900 bg-orange-100/10 hover:bg-emerald-900/5">
          <CgMenu className="w-4 h-4" />
          <span className="hidden md:block">Menu</span>
        </Button>
      </div>
    </header>
  );
}