import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { GrDrag } from "react-icons/gr";

import { HeaderSchema } from "@/schemas/header-schema";
import { Header } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useServerAction from "@/hooks/use-server-action";
import { updateHeaderAction } from "@/actions/resume/update-header-action";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { ResumeWithRelations } from "@/types/resume";
import { Separator } from "@/components/ui/separator";

interface HeaderFormProps {
  header: Header;
  setResume: Dispatch<SetStateAction<ResumeWithRelations>>;
}

export default function HeaderForm({ header, setResume }: HeaderFormProps) {
  const form = useForm<z.infer<typeof HeaderSchema>>({
    resolver: zodResolver(HeaderSchema),
    defaultValues: {
      id: header.id,
      resumeId: header.resumeId,
      location: header.location,
      email: header.email,
      firstName: header.firstName,
      lastName: header.lastName,
      phone: header.phone,
      position: header.position,
      links: header.links || []
    }
  });

  const {
    fields: linksFields,
    append: appendLinks,
    remove: removeLinks
  } = useFieldArray({
    control: form.control,
    name: "links" as never
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const { executeAction: executeUpdateHeader } = useServerAction(updateHeaderAction, {
    onSuccess: ({ data }) => {
      console.log({data});
      setResume(prev => ({
        ...prev,
        header: {
          ...data,
          links: Array.isArray(data.links) ? data.links : []
        }
      }));
    }
  });

  const handleSaveHeader = async (values: z.infer<typeof HeaderSchema>) => {
    await executeUpdateHeader({
      ...values,
      links: values.links.filter(link => link.trim() !== "") || []
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          noValidate
          onSubmit={handleSubmit(handleSaveHeader)}
          className="flex flex-col gap-4"
        >
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      type="text"
                      disabled={isSubmitting}
                      {...field}
                      className="rounded-none focus:border-orange-300 focus-visible:ring-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      type="text"
                      disabled={isSubmitting}
                      {...field}
                      className="rounded-none focus:border-orange-300 focus-visible:ring-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Position"
                      type="text"
                      disabled={isSubmitting}
                      {...field}
                      className="rounded-none focus:border-orange-300 focus-visible:ring-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Location"
                      type="text"
                      disabled={isSubmitting}
                      {...field}
                      className="rounded-none focus:border-orange-300 focus-visible:ring-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="text"
                      disabled={isSubmitting}
                      {...field}
                      className="rounded-none focus:border-orange-300 focus-visible:ring-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone"
                      type="text"
                      disabled={isSubmitting}
                      {...field}
                      className="rounded-none focus:border-orange-300 focus-visible:ring-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="links"
              render={() => (
                <FormItem className="flex-1">
                  <FormLabel>Links</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      {linksFields.map((linkField, index) => (
                        <div
                          key={linkField.id}
                          className="flex items-center gap-2"
                        >
                          <div className="w-full p-1 border flex items-center gap-1 bg-emerald-900/5">
                            <div className="w-8 h-10 flex justify-center items-center">
                              <GrDrag size={20} />
                            </div>
                            <Input
                              {...form.register(`links.${index}`)}
                              placeholder="Link"
                              type="url"
                              disabled={isSubmitting}
                              className="px-3 ring-offset-transparent rounded-none focus:border-orange-300 focus-visible:ring-transparent"
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              onClick={() => removeLinks(index)}
                              className="rounded-full h-10 w-10 flex justify-center items-center p-0 hover:bg-emerald-900/10"
                            >
                              <span><AiOutlineDelete size={20} /></span>
                            </Button>
                          </div>
                        </div>
                      ))}                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => appendLinks("")}
                        className="bg-transparent text-emerald-900 hover:bg-emerald-900/5 h-10 w-40 rounded"
                      >
                        Add Link
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm font-normal" />
                </FormItem>
              )}
            />
          </div>

          <Separator />
          
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-900 hover:bg-emerald-800 rounded w-24"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}