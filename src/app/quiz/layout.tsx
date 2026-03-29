import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'レアル・マドリード 経歴クイズ | ウルトラスレイ',
  description: '全10問・4択形式。スタッツ＆ヒストリーで腕試し！あなたのマドリディスタ偏差値は？',
  openGraph: {
    title: 'レアル・マドリード 経歴クイズ',
    description: '全10問・4択形式。あなたのマドリディスタ偏差値は？ #HalaMadrid',
    url: 'https://ultrasrei.com/quiz',
    siteName: 'ウルトラスレイ',
    images: [
      {
        url: 'https://ultrasrei.com/api/og?h=75&lv=2&s=9&t=10',
        width: 1200,
        height: 630,
        alt: 'レアル・マドリード 経歴クイズ',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'レアル・マドリード 経歴クイズ',
    description: '全10問・4択形式。あなたのマドリディスタ偏差値は？ #HalaMadrid',
    images: ['https://ultrasrei.com/api/og?h=75&lv=2&s=9&t=10'],
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
