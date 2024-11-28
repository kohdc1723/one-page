import { ReactNode } from "react";

import NavbarWrapper from "@/components/(dashboard)/navbar-wrapper";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <NavbarWrapper>
      <main className="mt-12 ml-0 md:mt-0 md:ml-40">
        {children}
      </main>
    </NavbarWrapper>
  );
}