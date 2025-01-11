"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/login-schema";
import { getUserByEmailOrNull } from "@/utils/user";
import { generateVerificationToken } from "@/utils/token";
import { sendVerificationEmail } from "@/lib/mail";
import { SafeServerAction } from "@/types/actions";

export const loginAction: SafeServerAction<z.infer<typeof LoginSchema>, undefined> = async (values) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: "Invalid input"
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmailOrNull(email);
  
  if (!existingUser || !existingUser.email) {
    return {
      isSuccess: false,
      error: "Email doesn't exist"
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {
      isSuccess: true,
      data: undefined,
      message: "Confirmation email sent"
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    return { 
      isSuccess: true,
      data: undefined,
      message: "Login success"
    };
  } catch (err) {
    console.error("Failed to login:", err);

    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return {
            isSuccess: false,
            error: "Invalid credentials"
          };
        default:
          return {
            isSuccess: false,
            error: "Something went wrong"
          };
      }
    }

    // throw error;
    return {
      isSuccess: false,
      error: "Something went wrong"
    };
  }
};