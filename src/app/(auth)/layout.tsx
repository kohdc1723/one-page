import { ReactNode } from "react";

import Logo from "@/images/folio-logo-emerald.png";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-dvh bg-white">
      <header className="flex items-center gap-1 px-4 h-16">
        <Image src={Logo} alt="logo" className="w-12 h-12" />
        <h1 className="text-emerald-900 font-bold text-4xl">folio</h1>
      </header>
      <main className="h-[calc(100dvh-64px)] flex flex-col justify-center items-center">
        {children}
      </main>
    </div>
  );
}