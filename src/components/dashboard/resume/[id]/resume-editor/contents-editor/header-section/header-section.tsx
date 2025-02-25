import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import HeaderEditForm from "./header-edit-form";
import { Header } from "@prisma/client";
import HeaderCreateForm from "./header-create-form";

interface HeaderSectionProps {
  header: Header | null;
}

export default function HeaderSection({ header }: HeaderSectionProps) {
  return (
    <AccordionItem
      value="header"
      className="border-slate-300"
    >
      <AccordionTrigger className="p-4 bg-emerald-900/5">
        Header
      </AccordionTrigger>
      <AccordionContent className="p-4 border-t border-slate-300">
        {header ? (
          <HeaderEditForm header={header} />
        ) : (
          <HeaderCreateForm />
        )}
      </AccordionContent>
    </AccordionItem>
  )
}