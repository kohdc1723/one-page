import { ReactNode } from "react";

import ResumeIdLayoutWrapper from "@/components/(dashboard)/resume/[id]/resume-id-layout-wrapper";

interface ResumeIdLayoutProps {
  children: ReactNode;
}

export default function ResumeIdLayout({ children }: ResumeIdLayoutProps) {
  return (
    <ResumeIdLayoutWrapper>
      {children}
    </ResumeIdLayoutWrapper>
  );
}