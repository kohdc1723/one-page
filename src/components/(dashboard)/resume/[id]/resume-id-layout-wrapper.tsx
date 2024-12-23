"use client";

import { ReactNode } from "react";

import { useSidebarStore } from "@/store/use-sidebar-store";
import { cn } from "@/lib/utils";

interface ResumeIdLayoutWrapperProps {
  children: ReactNode;
}

export default function ResumeIdLayoutWrapper({ children }: ResumeIdLayoutWrapperProps) {
  const { sidebar } = useSidebarStore();
  const isSidebarOpen = sidebar === "open";

  return (
    <div className={cn(
      "fixed top-12 md:top-0 left-0 h-dvh",
      isSidebarOpen ? "md:left-40 w-[calc(100dvw-160px)]" : "md:left-14 w-[calc(100dvw-56px)]"
    )}>
      {children}
    </div>
  );
}