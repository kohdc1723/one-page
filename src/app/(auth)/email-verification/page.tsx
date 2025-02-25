import EmailVerificationForm from "@/components/(auth)/email-verification/email-verification-form";

interface EmailVerificationPageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function EmailVerificationPage({ searchParams }: EmailVerificationPageProps) {
  const token = (await searchParams).token;

  return (
    <div className="flex flex-col gap-10 w-80 sm:w-96">
      <h2 className="text-4xl font-bold text-center">Email Verification</h2>
      <EmailVerificationForm token={token} />
    </div>
  );
}