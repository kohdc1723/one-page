"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";

import { navItems } from "@/constants/nav-items";
import LogoWhite from "@/images/folio-logo-white.png";

export default function TopNavbar() {
  const [open, setOpen] = useState(false);

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
            <div className="flex items-center gap-1">
              <Image
                src={LogoWhite}
                alt="full-logo-white"
                className="w-10 h-10"
              />
              <h1 className="font-bold text-3xl">folio</h1>
            </div>
          </nav>
        )}
      </div>
    </aside>
  );
}