import { ReactNode } from "react";

import DashboardLayoutWrapper from "@/components/dashboard/dashboard-layout-wrapper";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardLayoutWrapper>
      {children}
    </DashboardLayoutWrapper>
  );
}