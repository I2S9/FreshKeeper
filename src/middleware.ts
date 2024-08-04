import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isHomeRoute = createRouteMatcher(["/"]);

export default clerkMiddleware((auth , req) => {
    const {userId} = auth();
    if(userId && isHomeRoute(req)) {
        return NextResponse.rewrite(new URL("/", req.url));
    }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};