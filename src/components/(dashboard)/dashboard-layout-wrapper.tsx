"use client";

import { ReactNode, useEffect } from "react";
import { useIsClient, useMediaQuery } from "usehooks-ts";

import TopNavbar from "./top-navbar";
import SideNavbar from "./side-navbar";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { MEDIUM } from "@/constants/media";
import { cn } from "@/lib/utils";
import { SidebarType } from "@/types/sidebar";

interface DashboardLayoutWrapperProps {
  children: ReactNode;
  initialSidebar: SidebarType;
}

export default function DashboardLayoutWrapper({
  children,
  initialSidebar
}: DashboardLayoutWrapperProps) {
  const isClient = useIsClient();
  const isAboveMedium = useMediaQuery(`(min-width: ${MEDIUM})`, {
    initializeWithValue: false
  });
  const { sidebar, setSidebar } = useSidebarStore();

  useEffect(() => {
    setSidebar(initialSidebar);
  }, [initialSidebar, setSidebar]);

  // render as server component
  if (!isClient) {
    const isInitialSidebarOpen = initialSidebar === "open";

    return (
      <>
        <SideNavbar initialSidebar={initialSidebar} />
        <TopNavbar />
        <main className={cn(
          "mt-12 md:mt-0 ml-0",
          isInitialSidebarOpen ? "md:ml-40" : "md:ml-14",
        )}>
          {children}
        </main>
      </>
    );
  }
  
  // render as client component
  return (
    <>
      {isAboveMedium ? (
        <SideNavbar />
      ) : (
        <TopNavbar />
      )}
      <main
        className={cn(
          // "relative",
          isAboveMedium ? "mt-0 ml-40" : "mt-12 ml-0",
          (sidebar === "open") ? "ml-40" : "ml-14",
          !isAboveMedium && "ml-0"
        )}
      >
        {children}
      </main>
    </>
  );
}