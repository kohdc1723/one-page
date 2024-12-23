import ResumeEditor from "@/components/(dashboard)/resume/[id]/resume-editor";

interface ResumeIdPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResumeIdPage({ params }: ResumeIdPageProps) {
  const { id } = await params;

  const resume = {
    contact: {
      name: "John Doe",
      email: "johndoe@test.com",
      phone: "+12345678901",
      location: "Vancouver, BC"
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="h-14 bg-green-100">
        header {id}
      </div>
      <ResumeEditor resume={resume} />
    </div>
  );
}