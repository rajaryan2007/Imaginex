// middleware.ts (or proxy.ts in Next.js 16+)
import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoginPage = nextUrl.pathname.startsWith("/login");
  const isAuthUser = !!req.auth;

  
  if (isLoginPage && isAuthUser) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  
  if (isLoginPage) {
    return null;
  }

  
  if (!isAuthUser) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  
  return null;
});

export const config = {
  matcher: ["/", "/editor/:path*", "/login"],
};