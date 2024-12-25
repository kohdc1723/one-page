import { logout } from "@/actions/logout";
import { auth } from "@/auth";

export default async function MyAccountPage() {
  const session = await auth();

  return (
    <div className="flex flex-col">
      <p>{JSON.stringify(session, null, 4)}</p>
      <form action={logout}>
        <button type="submit">
          Sign Out
        </button>
      </form>
    </div>
  );
}