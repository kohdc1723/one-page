"use client";

import * as z from "zod";
import { MouseEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { signIn } from "next-auth/react";

import { LoginSchema } from "@/schemas/login-schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/actions/auth/login-action";
import FormResult from "@/components/(auth)/form-result";
import { SocialProvider } from "@/types/provider";
import useServerAction from "@/hooks/use-server-action";
import { FormResult as FormResultType } from "@/types/form-result";
import { defaultRedirectAfterLogin } from "@/routes";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
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

  const { executeAction: executeLogin } = useServerAction(loginAction, {
    onSuccess: ({ message }) => {
      setFormResult({
        success: true,
        message: message
      });
      router.push(defaultRedirectAfterLogin);
    },
    onError: ({ error }) => {
      setFormResult({
        success: false,
        message: error
      })
    }
  });

  const handleLogin = async (values: z.infer<typeof LoginSchema>) => {
    await executeLogin(values);
  };

  const handleSocialLogin = async (provider: SocialProvider) => {
    try {
      await signIn(provider);

      setFormResult({
        success: true,
        message: "Login success"
      });
    } catch {
      setFormResult({
        success: false,
        message: "Something went wrong"
      });
    }
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={handleSubmit(handleLogin)}
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
            Login
          </Button>
          <div className="font-medium text-sm flex items-center justify-center gap-2">
            <Link
              href="/reset-password"
              className="underline text-emerald-900"
            >
              Forgot password?
            </Link>
          </div>
          <p className="flex justify-center font-medium">or</p>
          <div className="flex flex-col gap-2 text-sm font-medium">
            <Button
              onClick={async (e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                await handleSocialLogin("google");
              }}
              className="flex justify-center items-center border rounded-full bg-white hover:bg-slate-50 text-black"
            >
              <div className="flex justify-center items-center gap-4 py-1">
                <FcGoogle className="w-4 h-4" /> Continue with Google
              </div>
            </Button>
            <Button
              onClick={async (e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                await handleSocialLogin("linkedin");
              }}
              className="flex justify-center items-center border rounded-full bg-[#0E76A8] hover:bg-[#0E76A8] text-white"
            >
              <div className="flex justify-center items-center gap-4 py-1">
                <SiLinkedin className="w-5 h-5" /> Continue with LinkedIn
              </div>
            </Button>
            <Button
              onClick={async (e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                await handleSocialLogin("github");
              }}
              className="flex justify-center items-center border rounded-full bg-[#24292E] hover:bg-[#24292E] text-white"
            >
              <div className="flex justify-center items-center gap-4 py-1">
                <SiGithub className="w-4 h-4" /> Continue with Github
              </div>
            </Button>
          </div>
          <div className="font-medium text-sm flex items-center justify-center gap-2">
            <p>You don&apos;t have an account?</p>
            <Link
              href="/sign-up"
              className="underline text-emerald-900"
            >
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}