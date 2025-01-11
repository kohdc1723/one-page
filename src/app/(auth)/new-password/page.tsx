import NewPasswordForm from "@/components/(auth)/new-password/new-password-form";

export default function NewPasswordPage() {
  return (
    <div className="flex flex-col gap-10 w-80 sm:w-96">
      <h2 className="text-4xl font-bold text-center">New Password</h2>
      <NewPasswordForm />
    </div>
  );
}