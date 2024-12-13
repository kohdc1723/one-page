import { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="py-4 px-4 md:px-8">
      {children}
    </div>
  );
}