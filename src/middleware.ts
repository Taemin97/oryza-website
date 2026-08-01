import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // 1. 도메인 및 서버 차원 리다이렉트 지침 (HTTP 301 Redirect)
  const host = request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto') ?? 'http';

  if (host === 'www.oryzaandco.com' || (host === 'oryzaandco.com' && proto === 'http')) {
    const newUrl = request.nextUrl.clone();
    newUrl.protocol = 'https:';
    newUrl.host = 'oryzaandco.com';
    newUrl.port = '';
    return NextResponse.redirect(newUrl, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
