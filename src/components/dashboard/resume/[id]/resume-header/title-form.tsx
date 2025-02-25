"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { updateTitleAction } from "@/actions/resume/update-title-action";
import useServerAction from "@/hooks/use-server-action";
import { ResumeTitleSchema } from "@/schemas/resume-title-schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ResumeWithRelations } from "@/types/resume";

interface TitleFormProps {
  resume: ResumeWithRelations;
}

export default function TitleForm({ resume }: TitleFormProps) {
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

  const { executeAction: executeUpdateTitle } = useServerAction(updateTitleAction, {
    onError: () => {
      toast.error("Failed to update resume title");
    }
  });

  const handleSubmitTitle = async (values: z.infer<typeof ResumeTitleSchema>) => {
    await executeUpdateTitle(values);
  }

  const handleBlurTitle = () => {
    handleSubmit(handleSubmitTitle, (err) => toast.error(err.title?.message))();
  }

  return (
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
  );
}