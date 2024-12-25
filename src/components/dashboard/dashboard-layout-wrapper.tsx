"use client";

import { ReactNode } from "react";
import { useIsClient, useMediaQuery } from "usehooks-ts";

import TopNavbar from "./top-navbar";
import SideNavbar from "./side-navbar";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { MEDIUM } from "@/constants/media";
import { cn } from "@/lib/utils";

interface DashboardLayoutWrapperProps {
  children: ReactNode;
}

export default function DashboardLayoutWrapper({ children }: DashboardLayoutWrapperProps) {
  const isClient = useIsClient();

  const isAboveMedium = useMediaQuery(`(min-width: ${MEDIUM})`, {
    initializeWithValue: false
  });

  const { sidebar } = useSidebarStore();
  const isSidebarOpen = sidebar === "open";

  // render as server component
  if (!isClient) {
    return (
      <>
        <SideNavbar />
        <TopNavbar />
        <main className="mt-12 md:mt-0 ml-0 md:ml-14">
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
          "mt-12 md:mt-0 ml-0",
          isSidebarOpen ? "md:ml-40" : "md:ml-14"
        )}
      >
        {children}
      </main>
    </>
  );
}