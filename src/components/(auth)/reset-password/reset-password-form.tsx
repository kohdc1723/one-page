"use client";

import * as z from "zod";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetPasswordSchema } from "@/schemas/reset-password-schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormResult from "@/components/(auth)/form-result";
import { resetPasswordAction } from "@/actions/auth/reset-password-action";
import { FormResult as FormResultType } from "@/types/form-result";
import useServerAction from "@/hooks/use-server-action";

export default function ResetPasswordForm() {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: ""
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const [formResult, setFormResult] = useState<FormResultType>({
    success: true,
    message: undefined
  });

  const { executeAction: executeResetPassword } = useServerAction(resetPasswordAction, {
    onSuccess: ({ message }) => {
      setFormResult({
        success: true,
        message: message
      });
    },
    onError: ({ error }) => {
      setFormResult({
        success: false,
        message: error
      });
    }
  });

  const handleResetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
    await executeResetPassword(values);
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <div className="space-y-8">
          <div className="space-y-2">
            {/* email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
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
          <FormResult {...formResult} />
          {/* login button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-emerald-900 hover:bg-emerald-800"
          >
            Send reset email
          </Button>
          <div className="font-medium text-sm flex items-center justify-center gap-2">
            <Link
              href="/sign-in"
              className="underline text-emerald-900"
            >
              Back to login
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}