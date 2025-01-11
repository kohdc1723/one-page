import ResetPasswordForm from "@/components/(auth)/reset-password/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-10 w-80 sm:w-96">
      <h2 className="text-4xl font-bold text-center">Reset Password</h2>
      <ResetPasswordForm />
    </div>
  );
}