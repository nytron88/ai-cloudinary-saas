import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/signin", "signup", "/", "/home"]);

const isPublicAPIRoute = createRouteMatcher(["/api/video"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = new URL(req.url);
  const pathname = url.pathname;

  const isDashboard = pathname === "/home";
  const isApi = pathname.startsWith("/api");
  const isPublicPage = isPublicRoute(req);
  const isPublicApi = isPublicAPIRoute(req);

  if (userId && isPublicPage && !isDashboard) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!userId) {
    if (!isPublicPage || (isApi && !isPublicApi)) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
