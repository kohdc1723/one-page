"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { AccountInfoSchema } from "@/schemas/account-info-schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/actions/auth/logout-action";
import updateAccountInfoAction from "@/actions/user/update-account-info-action";
import { useSession } from "next-auth/react";

interface AccountInfoSectionProps {
  user: User;
}

export default function AccountInfoSection({ user }: AccountInfoSectionProps) {
  const { id, name, initial } = user;
  const { update } = useSession();

  const form = useForm<z.infer<typeof AccountInfoSchema>>({
    resolver: zodResolver(AccountInfoSchema),
    defaultValues: {
      name: name || "",
      initial: initial || ""
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const handleSaveUser = async (values: z.infer<typeof AccountInfoSchema>) => {
    await updateAccountInfoAction({ id, values });
    update();
  };

  return (
    <div className="flex flex-col gap-8 py-4 border-b">
      <h2 className="text-emerald-900 text-xl font-semibold">
        Account Information
      </h2>
      <Form {...form}>
        <form
          noValidate
          onSubmit={handleSubmit(handleSaveUser)}
          className="flex flex-col gap-4"
        >
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-slate-700">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
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
          {/* initial */}
          <FormField
            control={form.control}
            name="initial"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-slate-700">
                  Initial
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Initial"
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
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              onClick={logoutAction}
              disabled={isSubmitting}
              className="bg-orange-100/10 hover:bg-red-600/10 text-red-600 border border-red-600 rounded w-24"
            >
              Sign Out
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