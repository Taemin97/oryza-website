import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
    localeDetection: false
});

export const config = {
    // 정적 파일 및 _next 내부 파일을 제외한 모든 요청에 미들웨어 적용
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};