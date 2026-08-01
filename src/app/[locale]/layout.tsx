import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const siteUrl = 'https://oryzaandco.com';
  
  // Default (English)
  let title = 'Oryza & Co. | Korean Wine & Spirits Sensory Data';
  let description = 'Oryza & Co. quantifies terroir and sensory metrics of Korean wine and spirits to establish objective quality standards for global fine dining.';
  let ogDescription = 'Quantifying terroir and sensory metrics of Korean wine and spirits for global fine dining.';
  let canonicalPath = '/en/';
  
  if (locale === 'ko') {
    title = 'Oryza & Co. | 한국 전통주 관능 데이터 & 큐레이션';
    description = 'Oryza & Co.는 한국 전통주의 떼루아와 관능 평가 지표를 정량화하여 객관적인 미식 품질 표준을 구축하고, 정밀 큐레이션을 통해 세계 시장에 선보입니다.';
    ogDescription = '한국 전통주의 떼루아와 관능 평가 지표를 정량화하여 객관적인 미식 품질 표준을 구축합니다.';
    canonicalPath = '/';
  } else if (locale === 'fr') {
    title = 'Oryza & Co. | Données Sensorielles Vins & Spiritueux Coréens';
    description = 'Oryza & Co. quantifie le terroir et les données sensorielles des vins et spiritueux coréens pour établir des standards de qualité gastronomiques.';
    ogDescription = 'Quantification du terroir et des données sensorielles des vins et spiritueux coréens pour la haute gastronomie.';
    canonicalPath = '/fr/';
  }

  // 동적 파싱 로직 (쿼리 파라미터 제거 및 절대 경로 보장)
  // generateMetadata in layout does not receive searchParams, naturally isolating it from queries.
  // We use URL constructor to ensure it's a completely valid absolute URL without any search string.
  const canonicalUrl = new URL(canonicalPath, siteUrl).href.split('?')[0];

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ko': `${siteUrl}/`,
        'en': `${siteUrl}/en/`,
        'fr': `${siteUrl}/fr/`,
        'x-default': `${siteUrl}/`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Oryza & Co.',
      title,
      description: ogDescription,
      url: canonicalUrl,
      images: [
        {
          url: 'https://oryzaandco.com/images/hero-grain-object.jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: ogDescription,
      images: ['https://oryzaandco.com/images/hero-grain-object.jpeg'],
    },
    other: {
      'twitter:domain': 'oryzaandco.com',
    },
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
