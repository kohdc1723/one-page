import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import authConfig from "@/auth.config";
import { User } from "@prisma/client";
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    // signIn: async ({ user }) => {
    //   if (!user.emailVerified) {
    //     return false;
    //   }

    //   return true;
    // },
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    jwt: async ({ token }) => {
      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig
});