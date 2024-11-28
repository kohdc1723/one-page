"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";

import { navItems } from "@/constants/nav-items";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClickMenu = () => setOpen(prev => !prev);

  return (
    <aside className="fixed top-0 left-0 text-white text-base bg-emerald-800 h-12 w-full flex items-center">
      <span
        onClick={handleClickMenu}
        className="relative flex items-center gap-2"
      >
        <IoMenuSharp className="text-2xl" />
        Menu
      </span>
      {open && (
        <nav className="absolute top-12 border-t border-white bg-emerald-800 w-full h-[calc(100dvh-48px)]">
          <ul className="flex flex-col md:flex-row gap-2">
            {navItems.map((item, i) => (
              <li key={`${item.title}-${i}`}>
                <Link href={item.href}>
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