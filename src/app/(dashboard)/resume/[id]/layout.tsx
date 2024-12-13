import { cookies } from "next/headers";
import { ReactNode } from "react";

import ResumeIdLayoutWrapper from "@/components/(dashboard)/resume/[id]/resume-id-layout-wrapper";
import { SidebarType } from "@/types/sidebar";

interface ResumeIdPageProps {
  children: ReactNode;
}

export default async function ResumeIdLayout({ children }: ResumeIdPageProps) {
  const cookieStore = await cookies();
  const sidebar = cookieStore.get("sidebar")?.value ?? "open";

  return (
    <ResumeIdLayoutWrapper initialSidebar={sidebar as SidebarType}>
      {children}
    </ResumeIdLayoutWrapper>
  );
}