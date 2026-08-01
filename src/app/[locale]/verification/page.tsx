import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = 'https://oryzaandco.com';
  
  const canonicalPath = locale === 'ko' ? '/verification' : `/${locale}/verification`;
  
  // 동적 파싱 로직 (쿼리 파라미터 제거 및 절대 경로 보장)
  const canonicalUrl = new URL(canonicalPath, siteUrl).href.split('?')[0];
  
  return {
    metadataBase: new URL(siteUrl),
    title: '기술 검증 및 데이터 체계 | Oryza & Co.',
    description: '단일 국산 원료 선별, 전문가 그룹의 독립 검증, 화학적 성분 분석 및 관능 평가 데이터 아카이빙을 통해 전통주의 객관적 품질 보증 표준을 제공합니다.',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ko': `${siteUrl}/verification`,
        'en': `${siteUrl}/en/verification`,
        'fr': `${siteUrl}/fr/verification`,
        'x-default': `${siteUrl}/verification`,
      },
    },
    openGraph: {
      type: 'article',
      title: '기술 검증 및 데이터 체계 | Oryza & Co.',
      description: '단일 국산 원료 선별, 독립 검증, 성분 분석 데이터 아카이빙을 통한 객관적 품질 보증 표준.',
      url: canonicalUrl,
      images: [
        {
          url: 'https://oryzaandco.com/images/russik-there-3049662_1920.jpg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: '기술 검증 및 데이터 체계 | Oryza & Co.',
      description: '단일 국산 원료 선별, 독립 검증, 성분 분석 데이터 아카이빙을 통한 객관적 품질 보증 표준.',
      images: ['https://oryzaandco.com/images/russik-there-3049662_1920.jpg'],
    },
    other: {
      'twitter:domain': 'oryzaandco.com',
    },
  };
}

export default function VerificationPage() {
  return (
    <main className="min-h-screen pt-40 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl text-[#F4EFE4] font-serif">기술 검증 및 데이터 체계 (Verification)</h1>
      <p className="mt-4 text-[#F4EFE4]/80">This page is under construction.</p>
    </main>
  );
}
