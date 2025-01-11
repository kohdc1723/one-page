import RegisterForm from "@/components/(auth)/sign-up/register-form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-10 w-80 sm:w-96">
      <h2 className="text-4xl font-bold text-center">Sign Up</h2>
      <RegisterForm />
    </div>
  );
}