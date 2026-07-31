// app/layout.tsx — 루트 pass-through 레이아웃
//
// ⚠️ next-intl + [locale] 라우팅 구조에서는 이 파일이
//    html / body 를 렌더링하면 안 됩니다.
//    실제 <html lang={locale}>, <body>, 폰트, CSS, NextIntlClientProvider는
//    모두 app/[locale]/layout.tsx 에서 처리합니다.
//
// Next.js App Router는 루트 layout 파일이 반드시 존재해야 하므로
// 이 파일은 children을 그대로 통과시키는 최소 래퍼 역할만 합니다.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
