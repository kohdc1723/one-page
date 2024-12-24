interface ResumeBuilderHeaderProps {
  title: string;
}

export default function ResumeBuilderHeader({ title }: ResumeBuilderHeaderProps) {
  return (
    <header className="h-14 flex items-center justify-between border-b border-slate-300">
      {title}
    </header>
  );
}