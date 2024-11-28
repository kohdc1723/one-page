import Link from "next/link";

import { navItems } from "@/constants/nav-items";

export default function SideNavbar() {
  console.log("side")

  return (
    <aside className="fixed top-0 text-white text-base bg-emerald-800 h-dvh w-40 flex">
      <nav className="">
        <ul className="flex flex-col gap-2">
          {navItems.map((item, i) => (
            <li key={`${item.title}-${i}`}>
              <Link href={item.href}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}