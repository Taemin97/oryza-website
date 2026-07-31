import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// next-intl 플러그인 초기화 (request.ts 경로 명시)
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
