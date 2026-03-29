import type { Metadata } from 'next';

interface Props {
  searchParams: Promise<{ h?: string; lv?: string; s?: string; t?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const h  = Math.min(100, Math.max(0, parseInt(sp.h ?? '50')));
  const lv = sp.lv ?? '1';
  const s  = sp.s ?? '0';
  const t  = sp.t ?? '10';

  const ogUrl = `https://ultrasrei.com/api/og?h=${h}&lv=${lv}&s=${s}&t=${t}`;
  const title = `マドリディスタ偏差値 ${h} | レアル・マドリード 経歴クイズ`;
  const desc  = `俺のマドリディスタ偏差値は${h}！これを超えられる奴いる？💪 LV.${lv} / ${s}/${t}問正解 #HalaMadrid`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `https://ultrasrei.com/quiz/share?h=${h}&lv=${lv}&s=${s}&t=${t}`,
      siteName: 'ウルトラスレイ',
      images: [{ url: ogUrl, width: 1200, height: 630, alt: title }],
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [ogUrl],
    },
  };
}

const TITLES = [
  { min: 10, title: '永遠のレジェンド', emoji: '👑' },
  { min: 9,  title: 'ベルナベウの英雄',  emoji: '🏆' },
  { min: 7,  title: '銀河系の住人',      emoji: '⭐' },
  { min: 5,  title: 'ガラクティコス候補', emoji: '🌟' },
  { min: 3,  title: 'カスティーリャの戦士', emoji: '⚔️' },
  { min: 1,  title: 'ベルナベウ初訪問者', emoji: '🎫' },
  { min: 0,  title: '見習いマドリディスタ', emoji: '📚' },
];

function gaugeColor(h: number) {
  if (h >= 80) return '#D4AF37';
  if (h >= 65) return '#FBBF24';
  if (h >= 50) return '#93C5FD';
  return '#F87171';
}

export default async function QuizSharePage({ searchParams }: Props) {
  const sp = await searchParams;
  const h  = Math.min(100, Math.max(0, parseInt(sp.h ?? '50')));
  const lv = sp.lv ?? '1';
  const s  = parseInt(sp.s ?? '0');
  const t  = parseInt(sp.t ?? '10');

  const titleEntry = TITLES.find(x => s >= x.min) ?? TITLES[TITLES.length - 1];
  const color = gaugeColor(h);

  return (
    <div style={{ backgroundColor: '#0B1628', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: 480, width: '100%' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: '#D4AF37', letterSpacing: '0.2em', fontWeight: 700, marginBottom: 6 }}>REAL MADRID C.F.</div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>レアル・マドリード 経歴クイズ</h1>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>LV.{lv} · {s}/{t}問正解</p>
        </div>

        {/* Score card */}
        <div style={{
          background: 'linear-gradient(160deg,#122040 0%,#0F1E35 100%)',
          border: '2px solid rgba(212,175,55,0.5)',
          borderRadius: 24, padding: '32px 28px', textAlign: 'center', marginBottom: 20,
          boxShadow: '0 0 60px rgba(212,175,55,0.15)',
        }}>
          {/* 偏差値 */}
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: 4 }}>マドリディスタ偏差値</div>
          <div style={{ fontSize: 96, fontWeight: 900, color, lineHeight: 1, marginBottom: 4 }}>{h}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>/100</div>

          {/* Gauge */}
          <div style={{ width: '100%', height: 12, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 6, overflow: 'hidden', marginBottom: 20 }}>
            <div style={{
              width: `${h}%`, height: '100%',
              background: 'linear-gradient(90deg,#F87171 0%,#FBBF24 40%,#D4AF37 68%,#F0D060 100%)',
              borderRadius: 6,
            }} />
          </div>

          {/* Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>{titleEntry.emoji}</span>
            <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>{titleEntry.title}</span>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{s}/{t}問正解</div>
        </div>

        {/* CTA */}
        <a
          href="/quiz"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            width: '100%', padding: '14px 0', borderRadius: 14,
            background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #A07D10 100%)',
            color: '#000', fontWeight: 700, fontSize: 14, textDecoration: 'none',
            letterSpacing: '0.04em', boxShadow: '0 0 28px rgba(212,175,55,0.4)',
          }}
        >
          🏆 あなたも挑戦する
        </a>

        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <span style={{ fontSize: 11, color: 'rgba(212,175,55,0.4)', letterSpacing: '0.1em' }}>#HalaMadrid · ultrasrei.com</span>
        </div>
      </div>
    </div>
  );
}
