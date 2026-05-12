import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type Props = { params: Promise<{ id: string }> };

function getImageUrl(id: string): string {
  const { data: { publicUrl } } = supabase.storage
    .from('share-images')
    .getPublicUrl(`${id}.png`);
  return publicUrl;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const imageUrl = getImageUrl(id);
  const title = '歴代ベストイレブン | ultrasrei.com';

  return {
    title,
    description: '欧州サッカー 歴代ベストイレブンメーカーで作られたベストイレブン。あなたも作ってみよう！',
    openGraph: {
      title,
      description: '欧州サッカー 歴代ベストイレブンメーカーで作られたベストイレブン。あなたも作ってみよう！',
      url: `https://ultrasrei.com/share/${id}`,
      images: [{ url: imageUrl, width: 1200, height: 675, alt: '歴代ベストイレブン' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: '欧州サッカー 歴代ベストイレブンメーカーで作られたベストイレブン。あなたも作ってみよう！',
      images: [imageUrl],
    },
  };
}

export default async function SharePage({ params }: Props) {
  const { id } = await params;
  const imageUrl = getImageUrl(id);

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a', color: '#fff',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '24px', fontFamily: 'Georgia, serif',
    }}>
      <p style={{ fontSize: 11, letterSpacing: '0.3em', color: '#D4AF37', marginBottom: 16, textTransform: 'uppercase' }}>
        Best Eleven
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt="ベストイレブン"
        style={{ maxWidth: '100%', width: 560, borderRadius: 16, border: '1px solid rgba(212,175,55,0.3)' }}
      />
      <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/tool"
          style={{
            padding: '12px 28px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 14,
            background: 'linear-gradient(135deg, #D4AF37, #F0D060)', color: '#0a0a0a',
          }}
        >
          自分も作ってみる →
        </Link>
        <Link
          href="/"
          style={{
            padding: '12px 28px', borderRadius: 10, textDecoration: 'none', fontSize: 14,
            border: '1px solid rgba(212,175,55,0.4)', color: '#D4AF37',
          }}
        >
          サイトトップへ
        </Link>
      </div>
    </div>
  );
}
