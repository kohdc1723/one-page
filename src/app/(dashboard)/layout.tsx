import { ReactNode } from "react";

import NavbarWrapper from "@/components/(dashboard)/navbar-wrapper";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  console.log("dash")
  return (
    <NavbarWrapper>
      <main>
        {children}
      </main>
    </NavbarWrapper>
  );
}