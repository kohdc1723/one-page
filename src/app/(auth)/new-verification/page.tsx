import NewVerificationForm from "@/components/(auth)/new-verification/new-verification-form";

export default function NewVerificationPage() {
  return (
      <div className="flex flex-col gap-10 w-80 sm:w-96">
        <h2 className="text-3xl font-bold text-center">Email Verification</h2>
        <NewVerificationForm />
      </div>
    );
}