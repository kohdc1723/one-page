import ResumeEditor from "@/components/(dashboard)/resume/[id]/resume-editor";

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

  return (
    <div className="flex flex-col w-full">
      <div className="h-14 border-b border-slate-300">
        header {id}
      </div>
      <ResumeEditor resume={resume} />
    </div>
  );
}