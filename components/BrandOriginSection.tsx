'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function BrandOriginSection() {
  const t = useTranslations('origin');
  const videoRef = useRef<HTMLVideoElement>(null);

  // 영상 재생 속도를 0.5배속으로 낮춰 차분한 텍스처 느낌 연출
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    // 최상단은 w-full로 화면 전체를 채움
    <section className="w-full relative isolate overflow-hidden py-40 border-b border-neutral-800/50">
      {/* 1. 배경 영상 (화면 전체 확장) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale contrast-125 pointer-events-none z-0"
        src="/videos/paddy-field.mp4"
      />

      {/* 2. 상하단 페이드 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-neutral-950 pointer-events-none z-0" />

      {/* 3. 과학적 엔지니어링 격자 패턴 (화면 전체 확장) */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none z-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" 
      />

      {/* 4. 본문 컨테이너 (아래 섹션들과 동일한 max-w-7xl 정렬 축 적용) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* 상단 라벨 */}
        <div className="font-mono text-xs tracking-[0.25em] text-[#C5A880] uppercase mb-16 text-left">
          {t('tag')}
        </div>

        {/* 2컬럼 스플릿 레이아웃 (세로 구분선 적용) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Step 1 */}
          <div className="border-l border-neutral-700/60 pl-6 md:pl-8">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#C5A880]/80 uppercase block mb-3">
              01 / PROBLEM
            </span>
            <h3 className="font-serif text-xl font-medium text-neutral-100 mb-4 tracking-tight">
              {t('step1.title')}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-300 break-keep font-sans">
              {t('step1.desc1')}
            </p>
          </div>

          {/* Step 2 */}
          <div className="border-l border-neutral-700/60 pl-6 md:pl-8">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#C5A880]/80 uppercase block mb-3">
              02 / SOLUTION
            </span>
            <h3 className="font-serif text-xl font-medium text-neutral-100 mb-4 tracking-tight">
              {t('step2.title')}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-300 break-keep font-sans">
              {t('step2.desc1')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
