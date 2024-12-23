"use client";

import Link from "next/link";
import Image from "next/image";
import { CgPushChevronLeftO } from "react-icons/cg";

import { cn } from "@/lib/utils";
import { navItems } from "@/constants/nav-items";
import { useSidebarStore } from "@/store/use-sidebar-store";
import LogoWhite from "@/images/folio-logo-white.png";
import useBasePathname from "@/hooks/use-base-pathname";

export default function SideNavbar() {
  const basePathname = useBasePathname();
  
  const { sidebar, setSidebar } = useSidebarStore();
  const isSidebarOpen = sidebar === "open";

  const handleOpenSidebar = () => setSidebar("open");
  const handleCloseSidebar = () => setSidebar("close");

  return (
    <aside className={cn(
      "hidden md:flex flex-col justify-between fixed top-0 text-white text-base bg-emerald-900 h-dvh py-4 px-2 z-10",
      isSidebarOpen ? "w-40" : "w-14"
    )}>
      <nav className="w-full flex flex-col justify-start items-start gap-8">
        {isSidebarOpen ? (
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Image
                src={LogoWhite}
                alt="full-logo-white"
                className="w-10 h-10"
              />
              <h1 className="font-bold text-3xl">folio</h1>
            </div>
            <CgPushChevronLeftO
              className="w-6 h-6 cursor-pointer"
              onClick={handleCloseSidebar}
            />
          </div>
        ) : (
          <div
            className="cursor-pointer"
            onClick={handleOpenSidebar}
          >
            <Image
              src={LogoWhite}
              alt="logo-white"
              className="w-10 h-10"
            />
          </div>
        )}
        <ul className={cn(
          "flex flex-col gap-2 w-full",
        )}>
          {navItems.map((item, i) => (
            <li
              key={`${item.title}-${i}`}
              className="relative"
            >
              <Link
                href={item.href}
                className="flex items-center gap-2 text-sm w-fit"
              >
                <span className={cn(
                  "p-2 rounded-full hover:bg-emerald-800",
                  (item.href === basePathname) && "bg-white hover:bg-white text-emerald-900"
                )}>
                  <item.icon className="w-6 h-6" />
                </span>
                {isSidebarOpen && (item.title)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}