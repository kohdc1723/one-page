"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { GrDrag } from "react-icons/gr";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { HeaderSchema } from "@/schemas/header-schema";
import { Header } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useServerAction from "@/hooks/use-server-action";
import { updateHeaderAction } from "@/actions/resume/update-header-action";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface HeaderEditFormProps {
  header: Header;
}

export default function HeaderEditForm({ header }: HeaderEditFormProps) {
  const form = useForm<z.infer<typeof HeaderSchema>>({
    resolver: zodResolver(HeaderSchema),
    defaultValues: {
      id: header.id,
      resumeId: header.resumeId,
      location: header.location,
      email: header.email,
      fullName: header.fullName,
      phone: header.phone,
      links: header.links
    }
  });

  const {
    fields: linksFields,
    append: appendLink,
    remove: removeLink,
    move: moveLink
  } = useFieldArray({
    control: form.control,
    name: "links" as never
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = form;

  const { executeAction: executeUpdateHeader } = useServerAction(updateHeaderAction, {
    onSuccess: () => {
      toast.success("Header has been updated.");
    },
    onError: () => {
      toast.error("Failed to update header.");
    }
  });

  const handleSaveHeader = async (values: z.infer<typeof HeaderSchema>) => {
    await executeUpdateHeader(values);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    moveLink(result.source.index, result.destination.index);
  }

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
              name="fullName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
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
                    <div className="flex flex-col gap-2 p-2 rounded bg-emerald-900/5">
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="links">
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="flex flex-col gap-2"
                            >
                              {linksFields.map((linkField, index) => (
                                <Draggable
                                  key={linkField.id}
                                  draggableId={`link-${index}`}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className="h-10 w-full p-1 border flex items-center gap-1 bg-emerald-900/10 rounded"
                                    >
                                      <div
                                        className="w-8 h-8 flex justify-center items-center hover:cursor-grab"
                                        {...provided.dragHandleProps}
                                      >
                                        <GrDrag size={16} />
                                      </div>
                                      <Input
                                        {...form.register(`links.${index}`)}
                                        placeholder="Link"
                                        type="url"
                                        disabled={isSubmitting}
                                        className="flex-1 h-8 md:text-xs text-xs px-3 ring-offset-transparent rounded-none focus:border-orange-300 focus-visible:ring-transparent"
                                      />
                                      <span
                                        onClick={() => removeLink(index)}
                                        className="rounded-full h-8 w-8 flex justify-center items-center p-0 hover:bg-emerald-900/10 hover:cursor-pointer"
                                      >
                                        <AiOutlineDelete size={18} />
                                      </span>
                                    </div>
                                    )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => appendLink("")}
                        className="text-xs bg-transparent border text-emerald-900 hover:bg-emerald-900/5 h-8 w-40 rounded"
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
          
          <div className="w-full flex items-center justify-end gap-2">
            <Button
              onClick={() => reset(header)}
              type="button"
              variant="outline"
              className="bg-transparent border text-emerald-900 hover:bg-emerald-900/5 rounded w-24"
            >
              Cancel
            </Button>
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