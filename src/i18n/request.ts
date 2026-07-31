import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale는 Next.js가 [locale] 세그먼트에서 추출한 값
  const requested = await requestLocale;

  // 유효한 locale인지 검증하고, 아닐 경우 defaultLocale로 폴백
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
