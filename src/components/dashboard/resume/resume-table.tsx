"use client";

import { GoTrash, GoPencil, GoDuplicate } from "react-icons/go";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Resume } from "@prisma/client";
import Link from "next/link";

interface ResumeTableProps {
  resumes: Resume[];
  query: string;
}

export default function ResumeTable({
  resumes,
  query
}: ResumeTableProps) {
  const filteredResumes = query
    ? resumes.filter(resume => resume.title.toLowerCase().includes(query))
    : resumes;

  return (
    <Table>
      <TableCaption>A list of your resumes.</TableCaption>
      <TableHeader className="bg-orange-900/10">
        <TableRow className="hover:bg-transparent">
          <TableHead className="border border-slate-300 text-black font-semibold w-1/2">Resume</TableHead>
          <TableHead className="border border-slate-300 text-black font-semibold w-1/6">Created</TableHead>
          <TableHead className="border border-slate-300 text-black font-semibold w-1/6">Updated</TableHead>
          <TableHead className="border border-slate-300 text-black font-semibold w-1/6">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredResumes.map(resume => (
          <TableRow key={resume.id} className="hover:bg-transparent">
            <TableCell className="font-medium text-emerald-900 hover:bg-emerald-900/5 border">
              <Link href={`/dashboard/resume/${resume.id}`}>{resume.title}</Link>
            </TableCell>
            <TableCell className="border">{new Date(resume.created_at).toLocaleDateString("en-CA")}</TableCell>
            <TableCell className="border">{new Date(resume.updated_at).toLocaleDateString("en-CA")}</TableCell>
            <TableCell className="border">
              <div className="flex items-center gap-4 text-emerald-900">
                <Link href={`/dashboard/resume/${resume.id}`}>
                  <GoPencil className="w-5 h-5" />
                </Link>
                <GoDuplicate className="w-5 h-5" />
                <GoTrash className="w-5 h-5" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}