import { ReactNode } from "react";
import { cookies } from "next/headers";

import DashboardLayoutWrapper from "@/components/(dashboard)/dashboard-layout-wrapper";
import { SidebarType } from "@/types/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const cookieStore = await cookies();
  const sidebar = cookieStore.get("sidebar")?.value ?? "open";

  return (
    <DashboardLayoutWrapper initialSidebar={sidebar as SidebarType}>
      {children}
    </DashboardLayoutWrapper>
  );
}