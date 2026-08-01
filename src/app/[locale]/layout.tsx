import type { Metadata } from 'next';
import { Gowun_Batang } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

const gowunBatang = Gowun_Batang({
  weight: ['400', '700'],
  variable: '--font-gowun-batang',
  subsets: ['latin'],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  let title = 'Oryza & Co. | Global Korean Spirits Platform';
  if (locale === 'ko') {
    title = 'Oryza & Co. | 한국 전통주 글로벌 플랫폼';
  } else if (locale === 'fr') {
    title = 'Oryza & Co. | Plateforme Globale de Spiritueux Coréens';
  }

  return {
    title,
    description: 'Global Curation & Branding Platform for Premium Korean Spirits & Fermented Rice Wines',
  };
}

// 정적 생성: 지원하는 모든 로케일에 대해 경로를 미리 생성
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 유효하지 않은 locale이면 404
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // 정적 렌더링을 위해 locale 설정
  setRequestLocale(locale);

  // 클라이언트 컴포넌트에 전달할 메시지 로드
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${gowunBatang.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-primary-dark text-primary-light font-serif">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
