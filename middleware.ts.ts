import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ko', 'en', 'fr'],
  defaultLocale: 'ko',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/', '/(ko|en|fr)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};