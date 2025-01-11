import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";
import authConfig from "@/auth.config";
import { getUserByIdOrNull } from "@/utils/user";
import { UserRole } from "@prisma/client";

type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER",
  initial?: string,
  image?: string
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  events: {
    linkAccount: async ({ user }) => {
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      });
    },
    signIn: async ({ user, account, profile }) => {
      const provider = account?.provider || "";

      let imageToUpdate;

      switch (provider) {
        case "credentials":
          imageToUpdate = null;
          break;
        case "google":
        case "linkedin":
          imageToUpdate = profile?.picture;
          break;
        case "github":
          imageToUpdate = profile?.avatar_url;
          break;
        default:
          break;
      }

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          image: imageToUpdate
        }
      });
    }
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;
      
      const existingUser = await getUserByIdOrNull(user.id);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    session: async ({ token, session }) => {
      if (session.user) {
        session.user.image = token.image as string;
        session.user.initial = token.initial as string;

        if (token.sub) session.user.id = token.sub;
        if (token.role) session.user.role = token.role as UserRole;
      }

      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      const existingUser = await getUserByIdOrNull(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.image = existingUser.image;
      token.initial = existingUser.initial;

      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig
});