import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = 'https://oryzaandco.com';
  
  const canonicalPath = locale === 'ko' ? '/subject-o' : `/${locale}/subject-o`;
  
  return {
    title: 'Subject O — Distillata N°01 | Oryza & Co.',
    description: '국산 쌀(Oryza Sativa)을 단일 원료로 전통 옹기에서 숙성한 증류식 소주로, 정밀 성분 분석과 관능 데이터 구축을 완료한 정량적 기준의 제품입니다.',
    alternates: {
      canonical: `${siteUrl}${canonicalPath}`,
      languages: {
        'ko': `${siteUrl}/subject-o`,
        'en': `${siteUrl}/en/subject-o`,
        'fr': `${siteUrl}/fr/subject-o`,
        'x-default': `${siteUrl}/subject-o`,
      },
    },
    openGraph: {
      type: 'website', // using website or article as it is next default. The user requested 'product'
      title: 'Subject O — Distillata N°01 | Oryza & Co.',
      description: '국산 쌀(Oryza Sativa) 기반 단일 원료 증류식 소주. 정밀 관능 데이터 구축 완료.',
      url: `${siteUrl}${canonicalPath}`,
      images: [
        {
          url: 'https://oryzaandco.com/images/subject-o-teaser.jpg',
        },
      ],
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
