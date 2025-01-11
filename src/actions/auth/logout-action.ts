"use server";

import { signOut } from "@/auth";
import { SafeServerAction } from "@/types/actions";

export const logoutAction: SafeServerAction<void, undefined> = async () => {
  try {
    await signOut({ redirect: false });

    return {
      isSuccess: true,
      data: undefined
    };
  } catch (err) {
    console.error("Failed to sign out:", err);

    return {
      isSuccess: false,
      error: "Something went wrong"
    };
  }
}