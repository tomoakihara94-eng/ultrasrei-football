import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '21世紀 CLマスタークイズ | ウルトラスレイ',
  description: '全10問・4択形式。2000-01シーズンから現在までのCLを3段階で徹底検証！あなたのCL偏差値は？',
  openGraph: {
    title: '21世紀 CLマスタークイズ',
    description: '全10問・4択形式。優勝クラブ・伝説の名場面・記録データを問う本格CL検定！',
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
    title: '21世紀 CLマスタークイズ',
    description: '全10問・4択形式。あなたのCL偏差値は？ #ChampionsLeague',
    images: ['https://ultrasrei.com/api/og?h=75&lv=2&s=9&t=10'],
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
