import { auth } from "@/auth";
import { headers } from "next/headers";

import AccountInfoSection from "@/components/dashboard/my-account/account-info-section";
import PasswordSection from "@/components/dashboard/my-account/password-section";

export default async function MyAccountPage() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return (
      <div>no userId</div>
    );
  }

  try {
    const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
      headers: await headers()
    })

    if (!response.ok) {
      return (
        <div>{response.statusText}</div>
      );
    }

    const user = await response.json();

    return (
      <div className="px-8 py-4 flex flex-col gap-8">
        <div className="w-full max-w-2xl">
          <AccountInfoSection user={user} />
          <PasswordSection userId={userId} />
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div>err</div>
    );
  }
}