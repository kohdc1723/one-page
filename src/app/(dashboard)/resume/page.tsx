import ResumeSection from "@/components/(dashboard)/resume/resume-section";
import Resume from "@/types/resume";
import resumes from "@/mock/resumes";

async function fetchAllResumes(): Promise<Resume[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(resumes.map((resume) => ({
        ...resume,
        createdAt: new Date(resume.createdAt).toLocaleDateString(),
        updatedAt: new Date(resume.updatedAt).toLocaleDateString()
      })));
    }, 1000);
  });
}

export default async function ResumePage() {
  const allResumes = await fetchAllResumes();

  return <ResumeSection resumes={allResumes} />
}