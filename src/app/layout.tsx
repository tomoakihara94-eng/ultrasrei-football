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
  title: '欧州サッカー歴代ベストイレブンメーカー',
  description: '欧州サッカーの歴史的名手でベストイレブンを編成。AI能力査定＆タクティカルボード生成。非公式ファンアプリ。',
  openGraph: {
    title: '欧州サッカー歴代ベストイレブンメーカー',
    description: '歴史的名手でベストイレブンを作成してXにシェア',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5901528172536391"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <footer style={{ borderTop: '1px solid #1e1e1e', backgroundColor: '#0d0d0d', padding: '24px 16px', marginTop: '0', fontFamily: 'var(--font-inter)' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <p style={{ color: '#444', fontSize: '12px', margin: 0 }}>
              © 2024 欧州サッカー歴代ベストイレブンメーカー — 非公式ファンサイト
            </p>
            <nav style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <a href="/guide" style={{ color: '#666', fontSize: '12px', textDecoration: 'none' }}>使い方ガイド</a>
              <a href="/vote" style={{ color: '#666', fontSize: '12px', textDecoration: 'none' }}>ベストイレブン投票</a>
              <a href="/blog" style={{ color: '#666', fontSize: '12px', textDecoration: 'none' }}>コラム</a>
              <a href="/mourinho" style={{ color: '#666', fontSize: '12px', textDecoration: 'none' }}>モウリーニョ名言集</a>
              <a href="/about" style={{ color: '#666', fontSize: '12px', textDecoration: 'none' }}>運営者情報</a>
              <a href="/privacy" style={{ color: '#666', fontSize: '12px', textDecoration: 'none' }}>プライバシーポリシー</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
