"use client";

import * as z from "zod";
import { PasswordSchema } from "@/schemas/password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updatePasswordAction } from "@/actions/user/update-password-action";
import useServerAction from "@/hooks/use-server-action";

interface PasswordSectionProps {
  userId: string;
}

export default function PasswordSection({ userId }: PasswordSectionProps) {
  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      id: userId,
      password: "",
      confirmPassword: ""
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const { executeAction } = useServerAction(updatePasswordAction, {
    onSuccess: () => {
      toast.success("Password has been updated.");
    },
    onError: () => {
      toast.error("Failed to update password.");
    }
  });

  const handleSavePassword = async (values: z.infer<typeof PasswordSchema>) => {
    await executeAction(values);
  };

  return (
    <div className="flex flex-col gap-8 py-4 border-b">
      <h2 className="text-emerald-900 text-xl font-semibold">
        Change Password
      </h2>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleSavePassword)}
          noValidate
          className="flex flex-col gap-4"
        >
          {/* name */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-slate-700">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    disabled={isSubmitting}
                    {...field}
                    className="rounded-none focus:border-orange-300 focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormMessage className="text-sm font-normal" />
              </FormItem>
            )}
          />
          {/* initial */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-slate-700">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    disabled={isSubmitting}
                    {...field}
                    className="rounded-none focus:border-orange-300 focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormMessage className="text-sm font-normal" />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4 pt-4">
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