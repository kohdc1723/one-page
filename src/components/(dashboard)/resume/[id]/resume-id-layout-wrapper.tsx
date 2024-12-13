"use client";

import { ReactNode } from "react";
import { useIsClient } from "usehooks-ts";

import { useSidebarStore } from "@/store/use-sidebar-store";
import { SidebarType } from "@/types/sidebar";
import { cn } from "@/lib/utils";

interface ResumeIdLayoutWrapperProps {
  children: ReactNode;
  initialSidebar: SidebarType;
}

export default function ResumeIdLayoutWrapper({
  children,
  initialSidebar
}: ResumeIdLayoutWrapperProps) {
  const isClient = useIsClient();
  const { sidebar } = useSidebarStore();
  const isSidebarOpen = sidebar === "open";

  // render on server side
  if (!isClient) {
    const isInitialSidebarOpen = initialSidebar === "open";

    return (
      <div className={cn(
        "fixed w-full left-0 top-12 md:top-0",
        isInitialSidebarOpen ? "md:left-40 md:w-[calc(100dvw-160px)]" : "md:left-14 md:w-[calc(100dvw-56px)]"
      )}>
        {children}
      </div>
    );
  }

  // render on client side
  return (
    <div className={cn(
      "fixed w-full left-0 top-12 md:top-0",
      isSidebarOpen ? "md:left-40 md:w-[calc(100dvw-160px)]" : "md:left-14 md:w-[calc(100dvw-56px)]"
    )}>
      {children}
    </div>
  );
}