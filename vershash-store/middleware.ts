import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the path starts with /admin/dashboard
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      // Redirect to login page if no token
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    
    // For Edge Runtime, we can't verify JWT here
    // The verification will be done in the API routes
    // This is just a basic check for token presence
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/dashboard/:path*',
};