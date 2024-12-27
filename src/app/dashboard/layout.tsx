import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import DashboardLayoutWrapper from "@/components/dashboard/dashboard-layout-wrapper";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SessionProvider>
      <DashboardLayoutWrapper>
        {children}
      </DashboardLayoutWrapper>
    </SessionProvider>
  );
}