import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory rate limit cache
// Note: In serverless environments, this is per-instance.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT = 5; // Max requests
const WINDOW_MS = 1000; // 1 second window

const FORBIDDEN_PATHS = [
  '.env',
  '.git',
  'wp-admin',
  'wp-login.php',
  'xmlrpc.php',
  '.well-known',
  'cgi-bin',
];

/**
 * Middleware to handle rate limiting and bot protection.
 * @param request 
 * @returns 
 */
export function middleware(request: NextRequest) {
  // Accessing IP through headers to avoid TS error on request.ip
  // and ensure compatibility across different deployment platforms.
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
  const url = request.nextUrl.pathname;

  // 1. Bot Scanning Protection (Blocking common paths)
  if (FORBIDDEN_PATHS.some(path => url.includes(path))) {
    console.warn(`[SECURITY] Blocked bot scan attempt: ${url} from IP: ${ip}`);
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 2. Rate Limiting for API routes
  if (url.startsWith('/api')) {
    const now = Date.now();
    const rateInfo = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - rateInfo.lastReset > WINDOW_MS) {
      rateInfo.count = 1;
      rateInfo.lastReset = now;
    } else {
      rateInfo.count++;
    }

    rateLimitMap.set(ip, rateInfo);

    if (rateInfo.count > RATE_LIMIT) {
      console.warn(`[SECURITY] Rate limit exceeded by IP: ${ip} on path: ${url}`);
      return new NextResponse('Too Many Requests', { 
        status: 429,
        headers: {
          'Retry-After': '1',
          'Content-Type': 'application/json',
        }
      });
    }
  }

  return NextResponse.next();
}

// Config to run on API and potentially sensitive paths
export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
