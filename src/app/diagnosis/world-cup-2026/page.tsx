'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { QUESTIONS, type Param } from '@/lib/diagnosis/questions';
import { WORLD_CUP_2026_PLAYERS } from '@/lib/diagnosis/worldCup2026Players';
import type { DiagnosisPlayer } from '@/lib/diagnosis/players';

// ── スタイル定数 ──
const C = {
  bg:       '#050b1a',
  card:     '#0d1526',
  border:   '#1e2c3e',
  gold:     '#D4AF37',
  goldDim:  'rgba(212,175,55,0.6)',
  white:    '#ffffff',
  dim:      'rgba(255,255,255,0.6)',
  dimmer:   'rgba(255,255,255,0.35)',
  ghost:    'rgba(255,255,255,0.08)',
} as const;

// ── マッチングアルゴリズム ──
type Score = Record<Param, number>;

function calcScore(answers: number[][]): Score {
  const base: Score = { attack: 0, defense: 0, technique: 0, mentality: 0, intelligence: 0 };
  for (const delta of answers) {
    const q = QUESTIONS[delta[0]];
    const c = q.choices[delta[1]];
    for (const [k, v] of Object.entries(c.delta) as [Param, number][]) {
      base[k] += v;
    }
  }
  return base;
}

const PARAM_KEYS: Param[] = ['attack', 'defense', 'technique', 'mentality', 'intelligence'];

// ユーザーの累積スコアは20問分の生の合計（選手パラメータの0-10とスケールが異なる）ため、
// 単位ベクトルに正規化してから比較する（＝プロフィールの「形」の近さで判定する）
function normalize(v: Record<Param, number>): Record<Param, number> {
  const mag = Math.sqrt(PARAM_KEYS.reduce((s, k) => s + v[k] ** 2, 0)) || 1;
  return PARAM_KEYS.reduce((out, k) => ({ ...out, [k]: v[k] / mag }), {} as Record<Param, number>);
}

function euclidean(a: Score, b: Record<Param, number>): number {
  const na = normalize(a);
  const nb = normalize(b);
  return Math.sqrt(PARAM_KEYS.reduce((sum, k) => sum + (na[k] - nb[k]) ** 2, 0));
}

function findMatches(score: Score, pool: DiagnosisPlayer[], top = 3): DiagnosisPlayer[] {
  return [...pool]
    .map(p => ({ p, dist: euclidean(score, p.params) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, top)
    .map(x => x.p);
}

// ── コンポーネント ──
type Phase = 'intro' | 'quiz' | 'result';

const paramLabels: Record<Param, string> = {
  attack: '攻撃', defense: '守備', technique: '技術', mentality: 'メンタル', intelligence: '知性',
};

export default function WorldCup2026DiagnosisPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[][]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const total = QUESTIONS.length;

  const matches = useMemo(() => {
    if (phase !== 'result') return [];
    const score = calcScore(answers);
    return findMatches(score, WORLD_CUP_2026_PLAYERS, 3);
  }, [phase, answers]);

  function handleChoice(choiceIdx: number) {
    if (animating) return;
    setSelected(choiceIdx);
    setAnimating(true);
    setTimeout(() => {
      const next = [...answers, [current, choiceIdx]];
      setAnswers(next);
      if (current + 1 >= total) {
        setPhase('result');
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
      }
      setAnimating(false);
    }, 350);
  }

  function restart() {
    setPhase('intro');
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setAnimating(false);
  }

  const q = QUESTIONS[current];
  const progress = Math.round((current / total) * 100);

  // ── イントロ ──
  if (phase === 'intro') {
    return (
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #061024 0%, #050b1a 60%, #050b1a 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px', fontFamily: 'Georgia, serif',
      }}>
        <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>
          {/* badge */}
          <div style={{
            display: 'inline-block', marginBottom: 20,
            padding: '6px 18px', borderRadius: 99,
            border: `1px solid ${C.gold}50`,
            background: `${C.gold}10`,
            fontSize: 11, letterSpacing: '0.3em', color: C.gold, fontWeight: 700,
          }}>
            ⸻ FIFA WORLD CUP 2026 ⸻
          </div>

          <div style={{ fontSize: 52, marginBottom: 12 }}>🌎</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: C.white, marginBottom: 6, lineHeight: 1.3, fontFamily: 'Georgia, serif' }}>
            W杯2026<br />選手タイプ診断
          </h1>
          <p style={{ fontSize: 14, color: C.dimmer, marginBottom: 4 }}>
            {WORLD_CUP_2026_PLAYERS.length}名の出場国代表スターから
          </p>
          <p style={{ fontSize: 14, color: C.dimmer, marginBottom: 32 }}>
            あなたに最も近い選手を診断！
          </p>

          <div style={{
            background: `${C.gold}08`, border: `1px solid ${C.gold}25`,
            borderRadius: 16, padding: '24px 28px', marginBottom: 32, textAlign: 'left',
          }}>
            {[
              ['🌎', 'W杯2026出場国のスターのみ', 'エムバペ・メッシ・久保建英ら総勢' + WORLD_CUP_2026_PLAYERS.length + '名'],
              ['📋', '20問の診断', '性格・プレースタイルを問う4択'],
              ['⏱', '所要時間', '約2〜3分'],
            ].map(([icon, label, desc]) => (
              <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 20, minWidth: 28 }}>{icon}</span>
                <div>
                  <span style={{ fontSize: 14, color: C.gold, fontWeight: 700 }}>{label}　</span>
                  <span style={{ fontSize: 13, color: C.dimmer }}>{desc}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPhase('quiz')}
            style={{
              width: '100%', padding: '16px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: `linear-gradient(135deg, ${C.gold}, #F0D060)`,
              color: '#050b1a', fontSize: 18, fontWeight: 900, letterSpacing: '0.05em',
              fontFamily: 'Georgia, serif',
            }}
          >
            診断スタート ▶
          </button>

          <p style={{ marginTop: 20, fontSize: 12, color: C.dimmer }}>
            <Link href="/diagnosis" style={{ color: C.dimmer, textDecoration: 'none', marginRight: 16 }}>
              ← 全選手診断へ
            </Link>
            <Link href="/" style={{ color: C.dimmer, textDecoration: 'none' }}>
              トップへ
            </Link>
          </p>
        </div>
      </main>
    );
  }

  // ── クイズ ──
  if (phase === 'quiz') {
    return (
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #061024 0%, #050b1a 60%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '24px 16px', fontFamily: 'Georgia, serif',
      }}>
        <div style={{ maxWidth: 560, width: '100%' }}>
          {/* ヘッダー */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 11, color: C.dimmer, letterSpacing: '0.2em' }}>
              WORLD CUP 2026 選手診断
            </span>
            <span style={{ fontSize: 13, color: C.gold, fontWeight: 700 }}>
              {current + 1} / {total}
            </span>
          </div>

          {/* プログレスバー */}
          <div style={{ width: '100%', height: 4, backgroundColor: C.ghost, borderRadius: 2, marginBottom: 32, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${progress}%`,
              background: `linear-gradient(90deg, ${C.gold}, #F0D060)`,
              borderRadius: 2, transition: 'width 0.3s ease',
            }} />
          </div>

          {/* 質問タイプバッジ */}
          {q.type === 'ultimate' && (
            <div style={{
              display: 'inline-block', background: `${C.gold}18`,
              border: `1px solid ${C.gold}40`, borderRadius: 20,
              padding: '4px 14px', marginBottom: 16, fontSize: 11,
              color: C.gold, letterSpacing: '0.1em', fontWeight: 700,
            }}>
              ⚡ 究極の選択
            </div>
          )}

          {/* 質問文 */}
          <h2 style={{ fontSize: 20, fontWeight: 700, color: C.white, lineHeight: 1.5, marginBottom: 28 }}>
            {q.text}
          </h2>

          {/* 選択肢 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {q.choices.map((choice, idx) => {
              const isSelected = selected === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleChoice(idx)}
                  disabled={selected !== null}
                  style={{
                    padding: '16px 20px', borderRadius: 12, border: '1.5px solid',
                    borderColor: isSelected ? C.gold : 'rgba(255,255,255,0.12)',
                    backgroundColor: isSelected ? `${C.gold}18` : C.ghost,
                    color: isSelected ? C.gold : C.dim,
                    fontSize: 15, fontWeight: isSelected ? 700 : 400,
                    textAlign: 'left', cursor: selected !== null ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    wordBreak: 'break-all', fontFamily: 'Georgia, serif',
                  }}
                >
                  <span style={{ color: isSelected ? C.gold : 'rgba(255,255,255,0.25)', marginRight: 10, fontSize: 13 }}>
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  {choice.label}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  // ── 結果 ──
  const [first, ...rest] = matches;

  function shareText() {
    return `🌎 W杯2026選手診断\n\n私は「${first.nickname}」${first.flag} ${first.name} でした！\n\n${first.description}\n\n#WorldCup2026 #FIFAワールドカップ #W杯2026選手診断\nhttps://ultrasrei.com/diagnosis/world-cup-2026`;
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #061024 0%, #050b1a 60%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '32px 16px 80px', fontFamily: 'Georgia, serif',
    }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        {/* 結果ヘッダー */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-block', marginBottom: 12,
            padding: '6px 18px', borderRadius: 99,
            border: `1px solid ${C.gold}50`, background: `${C.gold}10`,
            fontSize: 11, letterSpacing: '0.3em', color: C.gold, fontWeight: 700,
          }}>
            ⸻ FIFA WORLD CUP 2026 ⸻
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: C.white, marginBottom: 4 }}>
            あなたに最も近いW杯スターは
          </h1>
        </div>

        {/* 1位カード */}
        {first && (
          <div style={{
            background: `linear-gradient(135deg, ${C.gold}10 0%, ${C.gold}05 100%)`,
            border: `2px solid ${C.gold}50`,
            borderRadius: 20, padding: '28px 24px', marginBottom: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
              <span style={{ fontSize: 18 }}>🌎</span>
              <span style={{ fontSize: 13, color: C.gold, fontWeight: 700, letterSpacing: '0.1em' }}>
                あなたはこの選手！
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: `${C.gold}18`, border: `2px solid ${C.gold}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, flexShrink: 0,
              }}>
                {first.flag}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, color: C.goldDim, marginBottom: 3, letterSpacing: '0.1em' }}>
                  {first.club}
                </p>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: C.white, marginBottom: 4 }}>
                  {first.name}
                </h2>
                <p style={{ fontSize: 14, color: C.gold, fontWeight: 700, marginBottom: 8 }}>
                  「{first.nickname}」
                </p>
                <p style={{ fontSize: 14, color: C.dim, lineHeight: 1.6 }}>
                  {first.description}
                </p>
              </div>
            </div>

            {/* パラメータバー */}
            <div style={{ marginTop: 20 }}>
              {(Object.entries(first.params) as [Param, number][]).map(([key, val]) => {
                const pct = (val / 10) * 100;
                return (
                  <div key={key} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: C.dimmer }}>{paramLabels[key]}</span>
                      <span style={{ fontSize: 12, color: C.gold, fontWeight: 700 }}>{val}</span>
                    </div>
                    <div style={{ height: 5, backgroundColor: C.ghost, borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${pct}%`,
                        background: `linear-gradient(90deg, ${C.gold}, #F0D060)`,
                        borderRadius: 3,
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2・3位 */}
        {rest.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 12, color: C.dimmer, letterSpacing: '0.1em', marginBottom: 12 }}>
              他にも近いW杯スター
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {rest.map((p, i) => (
                <div key={p.id} style={{
                  background: C.ghost, border: `1px solid rgba(255,255,255,0.08)`,
                  borderRadius: 14, padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <span style={{ fontSize: 14, color: C.dimmer, minWidth: 28 }}>{i + 2}位</span>
                  <span style={{ fontSize: 24 }}>{p.flag}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: C.white }}>{p.name}</p>
                    <p style={{ fontSize: 11, color: C.goldDim }}>「{p.nickname}」</p>
                    <p style={{ fontSize: 10, color: C.dimmer, marginTop: 2 }}>{p.club}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* シェア・アクション */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText())}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'block', textAlign: 'center', padding: '14px',
              borderRadius: 12, textDecoration: 'none',
              backgroundColor: '#000', color: C.white,
              fontSize: 15, fontWeight: 700, fontFamily: 'Georgia, serif',
            }}
          >
            𝕏 でシェアする
          </a>
          <button
            onClick={restart}
            style={{
              padding: '14px', borderRadius: 12, border: `1.5px solid rgba(255,255,255,0.15)`,
              backgroundColor: 'transparent', color: C.dim,
              fontSize: 15, cursor: 'pointer', fontFamily: 'Georgia, serif',
            }}
          >
            もう一度診断する
          </button>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 4 }}>
            <Link
              href="/diagnosis"
              style={{ fontSize: 13, color: C.dimmer, textDecoration: 'none' }}
            >
              ← 全選手診断へ
            </Link>
            <Link
              href="/diagnosis/real-madrid"
              style={{ fontSize: 13, color: C.gold, textDecoration: 'none' }}
            >
              マドリー選手診断も見る →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
