"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/login-schema";
import { defaultRedirectAfterLogin } from "@/routes";
import { getUserByEmail } from "@/utils/user";
import { generateVerificationToken } from "@/utils/token";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid credentials"
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  
  if (!existingUser || !existingUser.email) {
    return {
      success: false,
      message: "Email doesn't exist"
    }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    return {
      success: true,
      message: "Confirmation email sent"
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: defaultRedirectAfterLogin
    });

    return { 
      success: true,
      message: "Login success"
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Invalid credentials"
          }
        default:
          return {
            success: false,
            message: "Something went wrong"
          }
      }
    }

    throw error;
    // return {
    //   success: false,
    //   message: "Something went wrong"
    // }
  }
};