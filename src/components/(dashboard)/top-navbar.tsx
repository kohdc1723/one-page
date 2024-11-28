"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";

import { navItems } from "@/constants/nav-items";

export default function TopNavbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(prev => !prev);

  return (
    <aside className="fixed top-0 text-white text-base bg-emerald-800 h-12 w-full flex items-center">
      <div
        onClick={toggleMenu}
        className="relative flex items-center gap-2"
      >
        <IoMenuSharp className="text-3xl ml-4" />
      </div>
      {open && (
        <nav className="absolute top-12 px-4 bg-emerald-800 w-full h-[calc(100dvh-48px)]">
          <ul className="flex flex-col border-t border-white md:flex-row gap-2">
            {navItems.map((item, i) => (
              <li key={`${item.title}-${i}`}>
                <Link
                  href={item.href}
                  onClick={toggleMenu}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
}