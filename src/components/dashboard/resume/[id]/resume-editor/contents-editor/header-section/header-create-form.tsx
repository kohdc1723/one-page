"use client";

import { createHeaderAction } from "@/actions/resume/create-header-action";
import { Button } from "@/components/ui/button";
import useServerAction from "@/hooks/use-server-action";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function HeaderCreateForm() {
  const { id: resumeId } = useParams<{ id: string }>();

  const { executeAction: executeCreateHeader } = useServerAction(createHeaderAction, {
    onSuccess: () => {
      toast.success("Header has been added.");
    },
    onError: () => {
      toast.error("Failed to add header.");
    }
  });

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <p className="text-sm text-emerald-900">
        No header added yet
      </p>
      <Button
        onClick={() => executeCreateHeader(resumeId)}
        variant="default"
        className="bg-emerald-900 hover:bg-emerald-800 rounded w-40"
      >
        + Add header
      </Button>
    </div>
  );
}