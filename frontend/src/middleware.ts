import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BLOCKED_AGENTS = ['bot', 'crawler', 'spider', 'scrap', 'python', 'curl', 'wget'];

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent')?.toLowerCase() || '';
  
  // 1. Bloqueio por User-Agent suspeito
  if (BLOCKED_AGENTS.some(bot => ua.includes(bot))) {
    return new NextResponse('Bot detectado', { status: 403 });
  }

  // 2. Proteção básica para API de contato
  if (request.nextUrl.pathname.startsWith('/api/contact')) {
    if (request.method === 'POST' && !request.headers.get('referer')) {
      return new NextResponse('Acesso direto negado', { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/contact/:path*'],
};
