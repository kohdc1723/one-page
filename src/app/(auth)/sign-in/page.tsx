import LoginForm from "@/components/(auth)/sign-in/login-form";

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-10 w-80 sm:w-96">
      <h2 className="text-4xl font-bold text-center">Login</h2>
      <LoginForm />
    </div>
  );
}
