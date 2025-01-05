import { ReactNode } from "react";

import LogoWhite from "@/images/one-page-logo-white.png";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-dvh bg-white">
      <header className="flex items-center px-4 h-16">
        <Image src={LogoWhite} alt="one-page-logo-white" className="w-12 h-12" />
      </header>
      <main className="h-[calc(100dvh-64px)] flex flex-col justify-center items-center">
        {children}
      </main>
    </div>
  );
}