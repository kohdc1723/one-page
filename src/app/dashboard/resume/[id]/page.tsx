import ResumeBuilder from "@/components/dashboard/resume/[id]/resume-builder";
import ResumeDocument from "@/components/dashboard/resume/[id]/resume-document/resume-document";
import { pdf } from "@react-pdf/renderer";

interface ResumeIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResumeIdPage({ params }: ResumeIdPageProps) {
  const { id } = await params;

  const resume = {
    title: "john-doe-resume",
    pageLayout: "singlePage",
    // common
    common: {

    },
    // header
    header: {
      name: "Dong-chan Koh",
      position: "Software Developer",
      contact: {
        location: "Vancouver, BC",
        email: "kohdc1723@gmail.com",
        phone: "+12368691945",
        links: {
          likedin: "linkedin.com",
          github: "github.com"
        }
      }
    },
    // contents
    contents: {
      workExperience: {
        column: 1,
        index: 0,
        items: [
          {
            company: "Apple",
            location: "Vancouver, BC",
            position: "Software Engineer",
            employmentType: "Full-time",
            workMode: "Remote",
            startDate: "",
            endDate: "",
            bullets: []
          },
          {
            company: "Apple",
            location: "Vancouver, BC",
            position: "Software Engineer",
            employmentType: "Full-time",
            workMode: "Remote",
            startDate: "",
            endDate: "",
            bullets: []
          }
        ]
      },
      projects: {
        column: 1,
        index: 1,
        items: [
          
        ]
      },
      skills: {
        column: 1,
        index: 2,
        items: [
          
        ]
      },
      education: {
        column: 1,
        index: 3,
        items: [
          
        ]
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