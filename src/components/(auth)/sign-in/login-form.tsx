"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas/login-schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleSubmitLogin = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubmitLogin)}
      >
        <div className="space-y-8">
          <div className="space-y-4">
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
                      {...field}
                      className="rounded-none focus:border-orange-300 focus-visible:ring-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal" />
                </FormItem>
              )}
            />
            {/* password field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      {...field}
                      className="rounded-none focus:border-orange-300 focus-visible:ring-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal" />
                </FormItem>
              )}
            />
          </div>
          {/* login button */}
          <Button
            type="submit"
            className="w-full rounded-full bg-emerald-900 hover:bg-emerald-800"
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}