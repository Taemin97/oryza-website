import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

// next-intl이 언어 감지, 리다이렉트, 리라이트를 자동으로 처리합니다.
// Next.js 16에서는 파일명이 middleware.ts → proxy.ts로,
// 함수명도 middleware → proxy로 변경되었습니다.
export const proxy = createMiddleware(routing);

export const config = {
  // 매처: _next 정적 파일, 이미지 최적화, public 폴더 자산 제외
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
