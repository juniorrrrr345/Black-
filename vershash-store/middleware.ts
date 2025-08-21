import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  // Check if the path starts with /admin/dashboard
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token || !verifyToken(token)) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/dashboard/:path*',
};