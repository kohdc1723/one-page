import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Linkedin from "next-auth/providers/linkedin"; 
import bcrypt from "bcryptjs";

import { LoginSchema } from "@/schemas/login-schema";
import { getUserByEmailOrNull } from "./utils/user";
 
export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    Linkedin({
      clientId: process.env.AUTH_LINKEDIN_CLIENT_ID,
      clientSecret: process.env.AUTH_LINKEDIN_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmailOrNull(email);
          if (!user || !user.password) {
            return null;
          }

          const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (isPasswordMatch) {
            return user;
          }
        }

        return null;
      }
    })
  ]
} satisfies NextAuthConfig;