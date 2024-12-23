import { ReactNode } from "react";

interface ResumeLayoutProps {
  children: ReactNode;
}

export default function ResumeLayout({ children }: ResumeLayoutProps) {
  return (
    <div className="py-4 px-4 md:px-8">
      {children}
    </div>
  );
}