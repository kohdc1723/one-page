"use client";

import { ChangeEvent, useState } from "react";
import SearchInput from "./search-input";
import { Button } from "@/components/ui/button";
import Resume from "@/types/resume";
import ResumeTable from "./resume-table";

interface ResumeSectionProps {
  resumes: Resume[];
}

export default function ResumeSection({ resumes }: ResumeSectionProps) {
  const [query, setQuery] = useState("");

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-emerald-900 font-bold text-2xl">
          Resumes
        </h1>
        <div className="w-full md:w-fit flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <SearchInput
            placeholder="Search Resumes"
            value={query}
            onChange={handleChangeQuery}
            className="focus:border-orange-300 focus-visible:ring-0 placeholder:text-slate-400 rounded-none w-full md:w-60"
          />
          <Button
            className="bg-emerald-900 hover:bg-emerald-800 rounded-none w-full md:w-fit"
          >
            + Create New Resume
          </Button>
        </div>
      </div>
      <ResumeTable resumes={resumes} query={query} />
    </div>
  );
}