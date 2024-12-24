import ResumeBuilder from "@/components/(dashboard)/resume/[id]/resume-builder";
import ResumeDocument from "@/components/(dashboard)/resume/[id]/resume-document/resume-document";
import { pdf } from "@react-pdf/renderer";

interface ResumeIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResumeIdPage({ params }: ResumeIdPageProps) {
  const { id } = await params;

  const resume = {
    title: "john-doe-resume",
    pageLayout: "singlePage",
    header: {
      name: "Dong-chan Koh",
      email: "kohdc1723@gmail.com",
      phone: "+12368691945",
      location: "Vancouver, BC",
      position: "Software Developer"
    },
    contents: {
      workExperience: {

      },
      projects: {

      },
      skills: {

      },
      education: {

      }
    }
  };

  const resumeBlob = await pdf(<ResumeDocument resume={resume} />).toBlob();

  return (
    <div className="flex flex-col w-full">
      <ResumeBuilder
        initialResume={resume}
        initialResumeBlob={resumeBlob}
      />
    </div>
  );
}