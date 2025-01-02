import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";
import authConfig from "@/auth.config";
import { getUserById } from "@/utils/user";
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
    }
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      const provider = account?.provider || "";
      const socialProviders = ["google", "github", "linkedin"];

      if (provider === "credentials") {
        const existingUser = await getUserById(user.id!);

        if (!existingUser?.emailVerified) return false;

        await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            image: null
          }
        });

        return true;
      } else if (socialProviders.includes(provider)) {
        let imageToUpdate;
        if (provider === "github") {
          imageToUpdate = profile?.avatar_url;
        } else {
          imageToUpdate = profile?.picture;
        }

        await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            image: imageToUpdate
          }
        });

        return true;
      } else {
        return false;
      }
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

      const existingUser = await getUserById(token.sub);

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