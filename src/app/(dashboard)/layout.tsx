import { ReactNode } from "react";

import Navbar from "../../components/(dashboard)/navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative">
      <Navbar />
      <main className="mt-12 md:ml-12">
        {children}
      </main>
    </div>
  );
}