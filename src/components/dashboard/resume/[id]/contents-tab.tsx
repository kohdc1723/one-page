import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ResumeWithRelations } from "@/types/resume";
import HeaderForm from "./header-form";
import { Dispatch, SetStateAction } from "react";

interface ContentsTabProps {
  resume: ResumeWithRelations;
  setResume: Dispatch<SetStateAction<ResumeWithRelations>>;
}

export default function ContentsTab({
  resume,
  setResume
}: ContentsTabProps) {
  const { header, sections } = resume;

  return (
    <div className="flex flex-col w-full text-sm font-medium">
      <Accordion
        type="multiple"
        defaultValue={[
          "header",
          "workExperience",
          "projects",
          "skills",
          "education"
        ]}
      >
        {/* header */}
        <AccordionItem
          value="header"
          className="border-slate-300"
        >
          <AccordionTrigger className="p-4 bg-emerald-900/5">
            Header
          </AccordionTrigger>
          <AccordionContent className="p-4 border-t border-slate-300">
            <HeaderForm
              header={header}
              setResume={setResume}
            />
          </AccordionContent>
        </AccordionItem>

        {/* work experience */}
        <AccordionItem
          value="workExperience"
          className="border-slate-300"
        >
          <AccordionTrigger className="p-4 bg-emerald-900/5">
            Work Experience
          </AccordionTrigger>
          <AccordionContent className="p-4 border-t border-slate-300">
            Work Experience Contents
          </AccordionContent>
        </AccordionItem>

        {/* projects */}
        <AccordionItem
          value="projects"
          className="border-slate-300"
        >
          <AccordionTrigger className="p-4 bg-emerald-900/5">
            Projects
          </AccordionTrigger>
          <AccordionContent className="p-4 border-t border-slate-300">
            Projects Contents
          </AccordionContent>
        </AccordionItem>

        {/* skills */}
        <AccordionItem
          value="skills"
          className="border-slate-300"
        >
          <AccordionTrigger className="p-4 bg-emerald-900/5">
            Skills
          </AccordionTrigger>
          <AccordionContent className="p-4 border-t border-slate-300">
            Skills Contents
          </AccordionContent>
        </AccordionItem>

        {/* education */}
        <AccordionItem
          value="education"
          className="border-slate-300"
        >
          <AccordionTrigger className="p-4 bg-emerald-900/5">
            Education
          </AccordionTrigger>
          <AccordionContent className="p-4 border-t border-slate-300">
            Education Contents
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}