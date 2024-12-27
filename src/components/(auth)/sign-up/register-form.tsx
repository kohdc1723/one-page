"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { SiLinkedin, SiGithub } from "react-icons/si";

import { RegisterSchema } from "@/schemas/register-schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { register } from "@/actions/register";
import FormResult from "@/components/(auth)/form-result";
import Link from "next/link";

export default function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    }
  });
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form;


  const [formResult, setFormResult] = useState({
    success: true,
    message: ""
  });

  const handleSubmitRegister = async (values: z.infer<typeof RegisterSchema>) => {
    const { success, message } = await register(values);
    setFormResult({ success, message });
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={handleSubmit(handleSubmitRegister)}
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
            {/* name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
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
            Sign Up
          </Button>
          <p className="flex justify-center font-medium">or</p>
          <div className="flex flex-col gap-2 text-sm font-medium">
            <Button className="flex justify-center items-center border rounded-full bg-white hover:bg-slate-50 text-black">
              <div className="flex justify-center items-center gap-4 py-1">
                <FcGoogle className="w-4 h-4" /> Continue with Google
              </div>
            </Button>
            <Button className="flex justify-center items-center border rounded-full bg-[#0E76A8] hover:bg-[#0E76A8] text-white">
              <div className="flex justify-center items-center gap-4 py-1">
                <SiLinkedin className="w-5 h-5" /> Continue with LinkedIn
              </div>
            </Button>
            <Button className="flex justify-center items-center border rounded-full bg-[#24292E] hover:bg-[#24292E] text-white">
              <div className="flex justify-center items-center gap-4 py-1">
                <SiGithub className="w-4 h-4" /> Continue with Github
              </div>
            </Button>
          </div>
          <div className="font-medium text-sm flex items-center justify-center gap-2">
            <p>Already have an account?</p>
            <Link
              href="/sign-in"
              className="underline text-emerald-900"
            >
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}