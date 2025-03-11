import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/about",
    "/blog",
    "/news",
    "/auth/login",
    "/auth/signup"
  ],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    "/api/webhook"
  ],
  afterAuth(auth, req) {
    const url = new URL(req.url);
    
    // Handle Clerk's hosted domain redirects
    if (url.host.includes('accounts.dev')) {
      const redirectTo = url.pathname === '/sign-in' ? '/auth/login' : '/auth/signup';
      return NextResponse.redirect(new URL(redirectTo, process.env.NEXT_PUBLIC_APP_URL || req.url));
    }

    // Redirect authenticated users away from auth pages
    if (auth.userId && (
      url.pathname.startsWith('/auth/') || 
      url.pathname.includes('sign-in') || 
      url.pathname.includes('sign-up')
    )) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Redirect unauthenticated users to login
    if (!auth.userId && !auth.isPublicRoute) {
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }
});

// Simple in-memory store for rate limiting
const rateLimit = new Map<string, number[]>();

export function middleware(request: NextRequest) {
  // Only apply to chat API endpoint
  if (request.nextUrl.pathname === '/api/chat') {
    const ip = request.ip ?? 'anonymous'
    const now = Date.now()
    const timeframe = 60 * 1000 // 1 minute
    const maxRequests = 20 // requests per minute

    // Get existing requests for this IP
    const requests = rateLimit.get(ip) ?? []
    const recentRequests = requests.filter((time: number) => now - time < timeframe)

    if (recentRequests.length >= maxRequests) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests, please try again later.' }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      )
    }

    // Update requests
    recentRequests.push(now)
    rateLimit.set(ip, recentRequests)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};