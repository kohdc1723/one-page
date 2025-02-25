import NewPasswordForm from "@/components/(auth)/new-password/new-password-form";

interface NewPasswordPageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function NewPasswordPage({ searchParams }: NewPasswordPageProps) {
  const token = (await searchParams).token;

  return (
    <div className="flex flex-col gap-10 w-80 sm:w-96">
      <h2 className="text-4xl font-bold text-center">New Password</h2>
      <NewPasswordForm token={token} />
    </div>
  );
}