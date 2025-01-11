"use client";

import * as z from "zod";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormResult from "@/components/(auth)/form-result";
import { NewPasswordSchema } from "@/schemas/new-password-schema";
import { newPasswordAction } from "@/actions/auth/new-password-action";
import { FormResult as FormResultType } from "@/types/form-result";
import useServerAction from "@/hooks/use-server-action";

export default function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      token: null
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

  const { executeAction: executeNewPassword } = useServerAction(newPasswordAction, {
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

  const handleNewPassword = async (values: z.infer<typeof NewPasswordSchema>) => {    
    await executeNewPassword({ ...values, token });
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={handleSubmit(handleNewPassword)}
      >
        <div className="space-y-8">
          <div className="space-y-2">
            {/* email field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
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
          </div>
          <FormResult {...formResult} />
          {/* login button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-emerald-900 hover:bg-emerald-800"
          >
            Reset Password
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