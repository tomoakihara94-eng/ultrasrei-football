import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '欧州サッカー歴史的ベストイレブンメーカー',
  description: '欧州サッカーの歴史的名手でベストイレブンを編成。AI能力査定＆タクティカルボード生成。非公式ファンアプリ。',
  openGraph: {
    title: '欧州サッカー歴史的ベストイレブンメーカー',
    description: '歴史的名手でベストイレブンを作成してXにシェア',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
