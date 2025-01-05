import { auth } from "@/auth";
import { fetcher } from "@/lib/fetcher";
import { User } from "@prisma/client";

import AccountInfoSection from "@/components/dashboard/my-account/account-info-section";
import PasswordSection from "@/components/dashboard/my-account/password-section";

export default async function MyAccountPage() {
  const session = await auth();
  const userId = session?.user.id;

  const response = await fetcher<User>(`/api/user/${userId}`);

  if (response.success) {
    const user = response.data as User;

    return (
      <div className="px-8 py-4 flex flex-col gap-8">
        <div className="w-full max-w-2xl">
          <AccountInfoSection user={user} />
          <PasswordSection userId={userId!} />
        </div>
      </div>
    );
  }

  throw new Error(response.error);
}