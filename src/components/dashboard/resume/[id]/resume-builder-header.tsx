"use client";

import { useIsClient } from "usehooks-ts";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CgExport, CgMenu } from "react-icons/cg";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeWithRelations } from "@/types/resume";
import { updateResumeAction } from "@/actions/resume/update-resume-action";
import useServerAction from "@/hooks/use-server-action";
import { ResumeTitleSchema } from "@/schemas/resume-title-schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import PdfExportButton from "./pdf-export-button";

interface ResumeBuilderHeaderProps {
  resume: ResumeWithRelations;
}

export default function ResumeBuilderHeader({ resume }: ResumeBuilderHeaderProps) {
  const isClient = useIsClient();

  const form = useForm<z.infer<typeof ResumeTitleSchema>>({
    resolver: zodResolver(ResumeTitleSchema),
    defaultValues: {
      id: resume.id,
      title: resume.title
    }
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = form;

  const { executeAction: executeUpdateResume } = useServerAction(updateResumeAction, {
    onError: () => {
      toast.error("Failed to update resume title");
    }
  });

  const handleSubmitTitle = async (values: z.infer<typeof ResumeTitleSchema>) => {
    await executeUpdateResume(values);
  }

  const handleBlurTitle = () => handleSubmit(handleSubmitTitle, (err) => toast.error(err.title?.message))();

  return (
    <header className="h-14 px-4 flex items-center justify-between gap-4 border-b border-slate-300">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleSubmitTitle, (err) => toast.error(err.title?.message))}
          noValidate
          className="flex-1"
        >
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Title"
                    type="text"
                    disabled={isSubmitting}
                    onBlur={handleBlurTitle}
                    className="focus-visible:ring-transparent focus:border-orange-300/50 rounded-none font-medium text-emerald-900 text-xl md:text-xl"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex items-center gap-4">
        {isClient ? (
          <PdfExportButton resume={resume} />
        ) : (
          <Button
            variant="default"
            disabled
            className="w-12 md:w-24 flex items-center justify-center rounded bg-emerald-900"
          >
            <CgExport className="w-4 h-4" />
            <span className="hidden md:block">Export</span>
          </Button>
        )}
        <Button className="w-12 md:w-24 flex items-center justify-center rounded border border-emerald-900 text-emerald-900 bg-orange-100/10 hover:bg-emerald-900/5">
          <CgMenu className="w-4 h-4" />
          <span className="hidden md:block">Menu</span>
        </Button>
      </div>
    </header>
  );
}