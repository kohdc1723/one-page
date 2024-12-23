"use client";

export default function ResumePanel() {
  return (
    <div className="flex flex-col w-full">
      <div className="h-14 border-b border-slate-300">
        header {id}
      </div>
      <ResumeEditor resume={resume} />
    </div>
  );
}