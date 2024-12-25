import { CgExport, CgMenu } from "react-icons/cg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ResumeBuilderHeaderProps {
  title: string;
}

export default function ResumeBuilderHeader({ title }: ResumeBuilderHeaderProps) {
  return (
    <header className="h-14 px-4 flex items-center justify-between gap-4 border-b border-slate-300">
      <Input
        type="text"
        value={title}
        className="focus-visible:ring-transparent focus:border-orange-300/50 rounded-none font-medium text-emerald-900 text-xl md:text-xl"
      />
      <div className="flex items-center gap-4">
        <Button className="w-12 md:w-24 flex items-center justify-center rounded bg-emerald-900 hover:bg-emerald-800">
          <CgExport className="w-4 h-4" />
          <span className="hidden md:block">Export</span>
        </Button>
        <Button className="w-12 md:w-24 flex items-center justify-center rounded border border-emerald-900 text-emerald-900 bg-orange-100/10 hover:bg-emerald-900/5">
          <CgMenu className="w-4 h-4" />
          <span className="hidden md:block">Menu</span>
        </Button>
      </div>
    </header>
  );
}