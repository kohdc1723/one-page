"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CgSpinner } from "react-icons/cg";

import { emailVerificationAction } from "@/actions/auth/email-verification-action";
import FormResult from "../form-result";
import { FormResult as FormResultType } from "@/types/form-result";
import useServerAction from "@/hooks/use-server-action";

export default function EmailVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formResult, setFormResult] = useState<FormResultType>({
    success: false,
    message: undefined
  });

  const { executeAction: executeEmailVerification } = useServerAction(emailVerificationAction, {
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

  const verify = useCallback(async () => {
    const { success, message } = formResult;

    if (success || message) return;

    await executeEmailVerification(token);
  }, [token, formResult]);

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className="space-y-8 flex flex-col items-center">
      <div className="flex flex-col gap-8 items-center">
        <p className="font-medium text-emerald-900/75">Confirming your email...</p>
        {(!formResult.success && !formResult.message) && (
          <div className="flex flex-col items-center gap-2">
            <CgSpinner className="w-10 h-10 rounded-full animate-spin text-emerald-900" />
          </div>
        )}
        <FormResult {...formResult} />
      </div>
      <div className="font-medium text-sm flex items-center justify-center gap-2">
        <Link
          href="/sign-in"
          className="underline text-emerald-900"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}