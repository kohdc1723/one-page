"use client";

import { emailVerificationAction } from "@/actions/auth/email-verification-action";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import FormResult from "../form-result";

export default function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const verify = useCallback(async () => {
    if (success || message) return;

    if (!token) {
      setSuccess(false);
      setMessage("Missing token");
      
      return;
    }

    const {
      success: verificationSuccess,
      message: verificationMessage,
      error: verificationError
    } = await emailVerificationAction(token);

    if (verificationSuccess) {
      setSuccess(true);
      setMessage(verificationMessage);
    } else {
      setSuccess(false);
      setMessage(verificationError);
    }
  }, [token, success, message]);

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className="space-y-8 flex flex-col items-center">
      <div className="flex flex-col gap-8 items-center">
        <p className="font-medium text-emerald-900/75">Confirming your email...</p>
        {(!success && !message) && (
          <div className="flex flex-col items-center gap-2">
            <CgSpinner className="w-10 h-10 rounded-full animate-spin text-emerald-900" />
          </div>
        )}
        <FormResult success={success} message={message} />
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