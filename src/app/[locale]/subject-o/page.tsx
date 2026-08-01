import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = 'https://oryzaandco.com';
  
  const canonicalPath = locale === 'ko' ? '/subject-o' : `/${locale}/subject-o`;
  
  // 동적 파싱 로직 (쿼리 파라미터 제거 및 절대 경로 보장)
  const canonicalUrl = new URL(canonicalPath, siteUrl).href.split('?')[0];
  
  return {
    metadataBase: new URL(siteUrl),
    title: 'Subject O — Distillata N°01 | Oryza & Co.',
    description: '국산 쌀(Oryza Sativa)을 단일 원료로 전통 옹기에서 숙성한 증류식 소주로, 정밀 성분 분석과 관능 데이터 구축을 완료한 정량적 기준의 제품입니다.',
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ko': `${siteUrl}/subject-o`,
        'en': `${siteUrl}/en/subject-o`,
        'fr': `${siteUrl}/fr/subject-o`,
        'x-default': `${siteUrl}/subject-o`,
      },
    },
    openGraph: {
      type: 'product' as any,
      title: 'Subject O — Distillata N°01 | Oryza & Co.',
      description: '국산 쌀(Oryza Sativa) 기반 단일 원료 증류식 소주. 정밀 관능 데이터 구축 완료.',
      url: canonicalUrl,
      images: [
        {
          url: 'https://oryzaandco.com/images/subject-o-teaser.jpg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Subject O — Distillata N°01 | Oryza & Co.',
      description: '국산 쌀(Oryza Sativa) 기반 단일 원료 증류식 소주. 정밀 관능 데이터 구축 완료.',
      images: ['https://oryzaandco.com/images/subject-o-teaser.jpg'],
    },
    other: {
      'twitter:domain': 'oryzaandco.com',
    },
  };
}

export default function SubjectOPage() {
  return (
    <main className="min-h-screen pt-40 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl text-[#F4EFE4] font-serif">Subject O — Distillata N°01</h1>
      <p className="mt-4 text-[#F4EFE4]/80">This page is under construction.</p>
    </main>
  );
}
