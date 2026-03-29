import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const TITLES = [
  { min: 10, title: '永遠のレジェンド', emoji: '👑' },
  { min: 9,  title: 'ベルナベウの英雄',  emoji: '🏆' },
  { min: 7,  title: '銀河系の住人',      emoji: '⭐' },
  { min: 5,  title: 'ガラクティコス候補', emoji: '🌟' },
  { min: 3,  title: 'カスティーリャの戦士', emoji: '⚔️' },
  { min: 1,  title: 'ベルナベウ初訪問者', emoji: '🎫' },
  { min: 0,  title: '見習いマドリディスタ', emoji: '📚' },
];

function getTitle(score: number) {
  return TITLES.find(t => score >= t.min) ?? TITLES[TITLES.length - 1];
}

function gaugeColor(h: number) {
  if (h >= 80) return '#D4AF37';
  if (h >= 65) return '#FBBF24';
  if (h >= 50) return '#93C5FD';
  return '#F87171';
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const h  = Math.min(100, Math.max(0, parseInt(sp.get('h') ?? '50')));
  const lv = sp.get('lv') ?? '1';
  const s  = parseInt(sp.get('s') ?? '0');
  const t  = parseInt(sp.get('t') ?? '10');

  const title = getTitle(s);
  const color = gaugeColor(h);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
          backgroundColor: '#0B1628', padding: '48px 64px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', width: 40, height: 40, borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.15)', border: '2px solid rgba(212,175,55,0.5)', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#D4AF37', fontSize: 18, fontWeight: 900 }}>R</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 15, color: '#D4AF37', letterSpacing: '0.15em', fontWeight: 700 }}>REAL MADRID CF</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>経歴クイズ — LV.{lv}</span>
            </div>
          </div>
          <span style={{ fontSize: 13, color: 'rgba(212,175,55,0.4)', letterSpacing: '0.08em' }}>ultrasrei.com/quiz</span>
        </div>

        {/* Main row */}
        <div style={{ display: 'flex', flex: 1, gap: 64, alignItems: 'center' }}>

          {/* Left: Gauge */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.2em', marginBottom: 10 }}>
              マドリディスタ偏差値
            </span>

            {/* Big number */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 28 }}>
              <span style={{ fontSize: 128, fontWeight: 900, color, lineHeight: 1 }}>{h}</span>
              <span style={{ fontSize: 28, color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>/100</span>
            </div>

            {/* Gauge bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', width: '100%', height: 18, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 9, overflow: 'hidden' }}>
                <div style={{
                  width: `${h}%`, height: '100%',
                  background: 'linear-gradient(90deg,#F87171 0%,#FBBF24 40%,#D4AF37 68%,#F0D060 100%)',
                  borderRadius: 9,
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {['初心者', '普通', '上級', '銀河系', '伝説'].map(l => (
                  <span key={l} style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>{l}</span>
                ))}
              </div>
            </div>

            {/* Subtitle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
              <span style={{ fontSize: 22 }}>{title.emoji}</span>
              <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.75)', fontWeight: 700 }}>{title.title}</span>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)' }}>{s}/{t}問正解</span>
            </div>
          </div>

          {/* Right: Challenge card */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(212,175,55,0.08)',
            border: '2px solid rgba(212,175,55,0.35)',
            borderRadius: 24, padding: '36px 32px', minWidth: 260,
            gap: 8,
          }}>
            <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>俺の偏差値は</span>
            <span style={{ fontSize: 80, fontWeight: 900, color, lineHeight: 1 }}>{h}</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: 8 }}>
              <span style={{ fontSize: 24, color: '#fff', fontWeight: 700 }}>これを超えられる</span>
              <span style={{ fontSize: 24, color: '#fff', fontWeight: 700 }}>奴いる？ 💪</span>
            </div>
            <span style={{ fontSize: 12, color: 'rgba(212,175,55,0.5)', marginTop: 12, letterSpacing: '0.05em' }}>#HalaMadrid</span>
          </div>

        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
