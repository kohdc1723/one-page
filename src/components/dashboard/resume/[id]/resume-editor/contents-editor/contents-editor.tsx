import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ResumeWithRelations } from "@/types/resume";
import HeaderSection from "./header-section/header-section";

interface ContentsEditorProps {
  resume: ResumeWithRelations;
}

export default function ContentsEditor({ resume }: ContentsEditorProps) {
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
        <HeaderSection header={header} />

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