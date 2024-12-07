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
  const isAboveMedium = useMediaQuery(`(min-width: ${MEDIUM})`, { initializeWithValue: false });
  const { isExtended } = useSidebarStore();

  // render as server component
  if (!isClient) {
    return (
      <>
        <SideNavbar />
        <TopNavbar />
        <main className="mt-12 ml-0 md:mt-0 md:ml-40 p-4 md:p-8">
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
          "p-4 md:p-8",
          isAboveMedium ? "mt-0 ml-40" : "mt-12 ml-0",
          isExtended ? "ml-40" : "ml-14",
          !isAboveMedium && "ml-0"
        )}
      >
        {children}
      </main>
    </>
  );
}