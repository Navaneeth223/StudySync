import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/register'];
  const isPublicPath = publicPaths.includes(pathname);

  // Get token from cookie or localStorage (we'll use a custom header for demo)
  const token = request.cookies.get('studysync_token')?.value;

  // Check if user is trying to access protected route
  if (!isPublicPath && !token) {
    // Check if it's a main app route
    if (pathname.startsWith('/dashboard') || 
        pathname.startsWith('/rooms') || 
        pathname.startsWith('/my-rooms') ||
        pathname.startsWith('/leaderboard') ||
        pathname.startsWith('/stats') ||
        pathname.startsWith('/profile') ||
        pathname.startsWith('/settings')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If user is logged in and tries to access auth pages, redirect to dashboard
  if (isPublicPath && token && pathname !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
