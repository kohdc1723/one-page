import NextAuth, { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import authConfig from "./auth.config";
import {
  defaultRedirectAfterLogin,
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
  apiPrefix
} from "@/routes";

interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

const AUTH_SECRET = process.env.AUTH_SECRET;

const { auth } = NextAuth(authConfig);

export default auth(async (req: NextAuthRequest) => {
  const { nextUrl } = req;
  const isApiRoutes = nextUrl.pathname.startsWith(apiPrefix);

  if (isApiRoutes) {
    // api routes (/api/~)
    const token = await getToken({ req, secret: AUTH_SECRET });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { sub: currentUserId } = token;

    const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);

    if (isApiAuthRoutes) {
      return NextResponse.next();
    }

    const parts = nextUrl.pathname.split("/").slice(2);
    const base = parts[0];
    switch (base) {
      case "user":
        const userId = parts[1];
        if (currentUserId !== userId) {
          return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        break;
      default:
        break;
    }

    return NextResponse.next();
  } else {
    // page routes (/~)
    const isLoggedIn = !!req.auth;

    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

    if (isAuthRoutes) {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL(defaultRedirectAfterLogin, nextUrl));
      }
  
      return NextResponse.next();
    }
  
    if (!isLoggedIn && !isPublicRoutes) {
      return NextResponse.redirect(new URL("/sign-in", nextUrl));
    }
  
    return NextResponse.next();
  }
});

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)']
};