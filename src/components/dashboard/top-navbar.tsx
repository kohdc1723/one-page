"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getNameInitials } from "@/utils/get-name-initials";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { IoMenuSharp } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

import { cn } from "@/lib/utils";
import { navItems } from "@/constants/nav-items";
import Logo from "@/images/one-page-logo.png";

export default function TopNavbar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const { data, status } = useSession();
  const initial = getNameInitials(data?.user.name);

  const toggleMenu = () => setOpen(prev => !prev);

  return (
    <aside className="z-10 fixed top-0 text-white text-base bg-emerald-900 h-12 w-full flex md:hidden items-center">
      <div className="relative w-full h-full px-4 flex items-center">
        <span
          onClick={toggleMenu}
          className="flex items-center gap-2 w-fit cursor-pointer"
        >
          <IoMenuSharp className="text-3xl" />
        </span>
        {open && (
          <nav className="absolute flex flex-col justify-between gap-4 top-12 left-0 px-4 pb-4 bg-emerald-900 w-full h-[calc(100dvh-48px)]">
            <ul className="h-full flex flex-col border-y border-white md:flex-row py-4 gap-2">
              {navItems.map((item, i) => (
                <li key={`${item.title}-${i}`}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-sm w-fit"
                    onClick={toggleMenu}
                  >
                    <span className="p-2 rounded-full hover:bg-emerald-800">
                      <item.icon className="w-6 h-6" />
                    </span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={Logo}
                  alt="full-logo-white"
                  className="w-10 h-10"
                />
              </div>
              {(status !== "unauthenticated") && (
                <Link
                  href="/dashboard/my-account"
                  onClick={toggleMenu}
                  className="flex items-center text-sm w-fit"
                >
                  {(status === "loading") ? (
                    <CgSpinner className="w-10 h-10 rounded-full animate-spin" />
                  ) : (
                    data?.user.image ? (
                      <Image
                        src={data.user.image}
                        alt="user-profile"
                        width={40}
                        height={40}
                        className="rounded-full hover:brightness-110"
                      />
                    ) : (
                      <span className={cn(
                        "rounded-full w-10 h-10 border flex items-center justify-center text-base font-normal",
                        (pathname.startsWith("/dashboard/my-account")) ? "bg-white text-emerald-900" : "bg-emerald-900 hover:bg-emerald-800 text-white"
                      )}>
                        {initial}
                      </span>
                    )
                  )}
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </aside>
  );
}