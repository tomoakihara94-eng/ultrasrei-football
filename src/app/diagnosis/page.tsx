'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { QUESTIONS, type Param } from '@/lib/diagnosis/questions';
import { PLAYERS, type DiagnosisPlayer } from '@/lib/diagnosis/players';

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

function findMatches(score: Score, top = 3): DiagnosisPlayer[] {
  return [...PLAYERS]
    .map(p => ({ p, dist: euclidean(score, p.params) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, top)
    .map(x => x.p);
}

// ── コンポーネント ──
type Phase = 'intro' | 'quiz' | 'result';

export default function DiagnosisPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  // answers: [[questionIndex, choiceIndex], ...]
  const [answers, setAnswers] = useState<number[][]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const total = QUESTIONS.length; // 20問

  const matches = useMemo(() => {
    if (phase !== 'result') return [];
    const score = calcScore(answers);
    return findMatches(score, 3);
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
        minHeight: '100vh', backgroundColor: '#0B1628',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px', fontFamily: 'Georgia, serif',
      }}>
        <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>⚽</div>
          <p style={{ fontSize: 12, color: '#D4AF37', letterSpacing: '0.2em', marginBottom: 8 }}>
            UEFA CHAMPIONS LEAGUE
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>
            欧州CL選手診断
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
            300名の選手データベースから
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 32 }}>
            あなたに最も近いCL選手を診断！
          </p>

          <div style={{
            backgroundColor: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)',
            borderRadius: 16, padding: '24px 28px', marginBottom: 32, textAlign: 'left',
          }}>
            {[
              ['📋', '20問の診断', '性格・プレースタイルを問う4択'],
              ['⏱', '所要時間', '約2〜3分'],
              ['🏆', '300名', 'CL史を彩る名選手データベース'],
            ].map(([icon, label, desc]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 20, minWidth: 28 }}>{icon}</span>
                <div>
                  <span style={{ fontSize: 14, color: '#D4AF37', fontWeight: 700 }}>{label}　</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{desc}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPhase('quiz')}
            style={{
              width: '100%', padding: '16px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
              color: '#0B1628', fontSize: 18, fontWeight: 900, letterSpacing: '0.05em',
            }}
          >
            診断スタート ▶
          </button>

          <div style={{ marginTop: 20 }}>
            <a
              href="/diagnosis/world-cup-2026"
              style={{
                display: 'block', padding: '12px 16px', borderRadius: 10, textDecoration: 'none',
                marginBottom: 12, textAlign: 'center',
                background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)',
                color: '#D4AF37', fontSize: 14, fontWeight: 700,
              }}
            >
              🌎 W杯2026出場国のスターで診断する →
            </a>
            <a
              href="/diagnosis/real-madrid"
              style={{
                display: 'block', padding: '12px 16px', borderRadius: 10, textDecoration: 'none',
                marginBottom: 12, textAlign: 'center',
                background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)',
                color: '#D4AF37', fontSize: 14, fontWeight: 700,
              }}
            >
              👑 マドリー選手のみで診断する →
            </a>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
                ← トップへ戻る
              </Link>
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ── クイズ ──
  if (phase === 'quiz') {
    return (
      <main style={{
        minHeight: '100vh', backgroundColor: '#0B1628',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '24px 16px', fontFamily: 'Georgia, serif',
      }}>
        <div style={{ maxWidth: 560, width: '100%' }}>
          {/* ヘッダー */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
              欧州CL選手診断
            </span>
            <span style={{ fontSize: 13, color: '#D4AF37', fontWeight: 700 }}>
              {current + 1} / {total}
            </span>
          </div>

          {/* プログレスバー */}
          <div style={{ width: '100%', height: 6, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 3, marginBottom: 32, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${progress}%`,
              background: 'linear-gradient(90deg, #D4AF37, #F0D060)',
              borderRadius: 3, transition: 'width 0.3s ease',
            }} />
          </div>

          {/* 質問タイプバッジ */}
          {q.type === 'ultimate' && (
            <div style={{
              display: 'inline-block', backgroundColor: 'rgba(212,175,55,0.15)',
              border: '1px solid rgba(212,175,55,0.4)', borderRadius: 20,
              padding: '4px 14px', marginBottom: 16, fontSize: 11,
              color: '#D4AF37', letterSpacing: '0.1em', fontWeight: 700,
            }}>
              ⚡ 究極の選択
            </div>
          )}

          {/* 質問文 */}
          <h2 style={{
            fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1.5,
            marginBottom: 28,
          }}>
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
                    borderColor: isSelected ? '#D4AF37' : 'rgba(255,255,255,0.15)',
                    backgroundColor: isSelected ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)',
                    color: isSelected ? '#D4AF37' : 'rgba(255,255,255,0.85)',
                    fontSize: 15, fontWeight: isSelected ? 700 : 400,
                    textAlign: 'left', cursor: selected !== null ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    wordBreak: 'break-all',
                  }}
                >
                  <span style={{ color: isSelected ? '#D4AF37' : 'rgba(255,255,255,0.3)', marginRight: 10, fontSize: 13 }}>
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
    const p = first;
    return `🏆 欧州CL選手診断\n\n私は「${p.nickname}」${p.flag} ${p.name} でした！\n\n${p.description}\n\n#ChampionsLeague #CL選手診断\nhttps://ultrasrei.com/diagnosis`;
  }

  return (
    <main style={{
      minHeight: '100vh', backgroundColor: '#0B1628',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '32px 16px 80px', fontFamily: 'Georgia, serif',
    }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        {/* 結果ヘッダー */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontSize: 12, color: '#D4AF37', letterSpacing: '0.2em', marginBottom: 8 }}>
            診断結果
          </p>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 4 }}>
            あなたに最も近い選手は
          </h1>
        </div>

        {/* 1位カード */}
        {first && (
          <div style={{
            backgroundColor: 'rgba(212,175,55,0.08)',
            border: '2px solid rgba(212,175,55,0.5)',
            borderRadius: 20, padding: '28px 24px', marginBottom: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>
              <span style={{ fontSize: 20 }}>👑</span>
              <span style={{ fontSize: 13, color: '#D4AF37', fontWeight: 700, letterSpacing: '0.1em' }}>
                あなたはこの選手！
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                backgroundColor: 'rgba(212,175,55,0.15)',
                border: '2px solid rgba(212,175,55,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, flexShrink: 0,
              }}>
                {first.flag}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, color: '#D4AF37', marginBottom: 4, letterSpacing: '0.1em' }}>
                  {first.club}
                </p>
                <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 4 }}>
                  {first.name}
                </h2>
                <p style={{ fontSize: 14, color: 'rgba(212,175,55,0.8)', fontWeight: 700, marginBottom: 8 }}>
                  「{first.nickname}」
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  {first.description}
                </p>
              </div>
            </div>

            {/* パラメータバー */}
            <div style={{ marginTop: 20 }}>
              {(Object.entries(first.params) as [Param, number][]).map(([key, val]) => {
                const labels: Record<Param, string> = {
                  attack: '攻撃', defense: '守備', technique: '技術',
                  mentality: 'メンタル', intelligence: '知性',
                };
                const pct = (val / 10) * 100;
                return (
                  <div key={key} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{labels[key]}</span>
                      <span style={{ fontSize: 12, color: '#D4AF37', fontWeight: 700 }}>{val}</span>
                    </div>
                    <div style={{ height: 6, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${pct}%`,
                        background: 'linear-gradient(90deg, #D4AF37, #F0D060)',
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
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: 12 }}>
              他にも近い選手
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {rest.map((p, i) => (
                <div key={p.id} style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 14, padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', minWidth: 20 }}>
                    {i + 2}位
                  </span>
                  <span style={{ fontSize: 24 }}>{p.flag}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{p.name}</p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>「{p.nickname}」</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* シェア・もう一度ボタン */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText())}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'block', textAlign: 'center', padding: '14px',
              borderRadius: 12, textDecoration: 'none',
              backgroundColor: '#000', color: '#fff',
              fontSize: 15, fontWeight: 700,
            }}
          >
            𝕏 でシェアする
          </a>
          <button
            onClick={restart}
            style={{
              padding: '14px', borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.2)',
              backgroundColor: 'transparent', color: 'rgba(255,255,255,0.7)',
              fontSize: 15, cursor: 'pointer',
            }}
          >
            もう一度診断する
          </button>
          <Link
            href="/"
            style={{
              display: 'block', textAlign: 'center', padding: '12px',
              color: 'rgba(255,255,255,0.35)', fontSize: 13, textDecoration: 'none',
            }}
          >
            ← トップへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
