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
import Resume from "@/types/resume";
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
      <TableHeader className="bg-orange-100/50">
        <TableRow className="hover:bg-transparent">
          <TableHead className="border text-black font-semibold w-1/2">Resume</TableHead>
          <TableHead className="border text-black font-semibold w-1/6">Created</TableHead>
          <TableHead className="border text-black font-semibold w-1/6">Updated</TableHead>
          <TableHead className="border text-black font-semibold w-1/6">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredResumes.map(resume => (
          <TableRow key={resume.id} className="hover:bg-transparent">
            <TableCell className="font-medium text-emerald-900 hover:bg-emerald-900/5 border">
              <Link href={`/resume/${resume.id}`}>{resume.title}</Link>
            </TableCell>
            <TableCell className="border">{resume.createdAt}</TableCell>
            <TableCell className="border">{resume.updatedAt}</TableCell>
            <TableCell className="border">
              <div className="flex items-center gap-4 text-emerald-900">
                <Link href={`/resume/${resume.id}`}>
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