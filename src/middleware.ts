import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isHomeRoute = createRouteMatcher(["/"]);

export default clerkMiddleware((auth , req) => {
    const {userId} = auth();

    // If there is user and home route is accessed, then redirected to dashboard or any protected page
    if(userId && isHomeRoute(req)) {
        return NextResponse.rewrite(new URL("/", req.url));
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};