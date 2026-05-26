import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import VisitorCounter from '@/components/VisitorCounter';

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
  title: {
    default: 'レアル・マドリード ファンサイト | ultrasrei.com',
    template: '%s | ultrasrei.com',
  },
  description: 'Hala Madrid y nada más. レアル・マドリードとモウリーニョを愛するファンが作る考察サイト。CL15回優勝クラブの歴史・選手・戦術を深掘り。モウリーニョ名言集・ベストイレブンメーカーも無料公開中。',
  keywords: ['欧州サッカー', 'ベストイレブン', 'レアルマドリード', 'チャンピオンズリーグ', 'サッカー歴代選手', 'フォーメーション', 'タクティカルボード'],
  authors: [{ name: 'Hara Tech' }],
  creator: 'Hara Tech',
  metadataBase: new URL('https://ultrasrei.com'),
  openGraph: {
    title: 'レアル・マドリード ファンサイト | ultrasrei.com',
    description: 'Hala Madrid y nada más. CL15回優勝クラブの歴史・選手・戦術をファン目線で深掘り。モウリーニョ名言集も。',
    type: 'website',
    url: 'https://ultrasrei.com',
    siteName: 'ultrasrei.com',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'レアル・マドリード ファンサイト | ultrasrei.com',
    description: 'Hala Madrid y nada más. CL15回優勝クラブの歴史・選手・戦術を深掘り。モウリーニョ名言集も。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '欧州サッカー歴代ベストイレブンメーカー',
  url: 'https://ultrasrei.com',
  description: '欧州サッカーの歴代名選手でベストイレブンを編成できる無料ツール。AIが選手の能力を査定し、タクティカルボードを自動生成。',
  applicationCategory: 'SportsApplication',
  operatingSystem: 'Web',
  inLanguage: 'ja',
  author: {
    '@type': 'Organization',
    name: 'Hara Tech',
    url: 'https://ultrasrei.com/about',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5901528172536391"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}

        {/* ── アクセス数 固定ウィジェット（右下） ── */}
        <div
          style={{
            position: 'fixed', bottom: '16px', right: '16px', zIndex: 50,
            backgroundColor: 'rgba(250,250,248,0.92)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '12px',
            padding: '8px 14px',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          <VisitorCounter />
        </div>

        <footer style={{ borderTop: '1px solid #E8E5DC', backgroundColor: '#F5F3EE', padding: '24px 16px', marginTop: '0', fontFamily: 'var(--font-inter)' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>
              © 2024 欧州サッカー歴代ベストイレブンメーカー — 非公式ファンサイト
            </p>
            <nav style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <a href="/guide" style={{ color: '#777', fontSize: '12px', textDecoration: 'none' }}>使い方ガイド</a>
              <a href="/vote" style={{ color: '#777', fontSize: '12px', textDecoration: 'none' }}>ベストイレブン投票</a>
              <a href="/blog" style={{ color: '#777', fontSize: '12px', textDecoration: 'none' }}>コラム</a>
              <a href="/mourinho" style={{ color: '#777', fontSize: '12px', textDecoration: 'none' }}>モウリーニョ名言集</a>
              <a href="/about" style={{ color: '#777', fontSize: '12px', textDecoration: 'none' }}>運営者情報</a>
              <a href="/contact" style={{ color: '#777', fontSize: '12px', textDecoration: 'none' }}>お問い合わせ</a>
              <a href="/privacy" style={{ color: '#777', fontSize: '12px', textDecoration: 'none' }}>プライバシーポリシー</a>
              <a href="/tokusho" style={{ color: '#777', fontSize: '12px', textDecoration: 'none' }}>特定商取引法に基づく表記</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
