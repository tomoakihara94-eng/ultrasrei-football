'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Trophy, Crown, Share2, RotateCcw, ChevronRight,
  Medal, Flame, BookOpen, BarChart2, Lock, CheckCircle,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────
// 型
// ─────────────────────────────────────────────────────────────────
interface QuizQuestion {
  question_text: string;
  choices: string[];
  correct_answer: string;
  level: 1 | 2 | 3;
  genre: 'winners' | 'legends';
  context?: string;
  emoji?: string;
  hint?: string;
}
interface RankingEntry {
  id: string; nickname: string; score: number; total: number; created_at: string;
}
type Phase = 'start' | 'quiz' | 'result' | 'ranking';

// ─────────────────────────────────────────────────────────────────
// 合格基準
// ─────────────────────────────────────────────────────────────────
const PASS_THRESHOLD: Record<1 | 2 | 3, number> = { 1: 8, 2: 9, 3: 10 };

// ─────────────────────────────────────────────────────────────────
// 称号
// ─────────────────────────────────────────────────────────────────
const TITLES = [
  { min: 10, title: 'CL完全制覇マスター',    emoji: '🌟' },
  { min: 9,  title: 'ビッグイヤー常連',       emoji: '🏆' },
  { min: 7,  title: '欧州の強豪',             emoji: '⭐' },
  { min: 5,  title: 'CL出場常連クラブ級',     emoji: '🎯' },
  { min: 3,  title: 'グループ突破レベル',      emoji: '⚽' },
  { min: 1,  title: 'CL初出場',               emoji: '🎫' },
  { min: 0,  title: 'CL予備知識なし',          emoji: '📺' },
] as const;
function getTitle(score: number) { return TITLES.find(t => score >= t.min) ?? TITLES[TITLES.length - 1]; }

function getRankLabel(i: number) {
  if (i === 0) return { label: '🥇', color: '#F59E0B' };
  if (i === 1) return { label: '🥈', color: '#9CA3AF' };
  if (i === 2) return { label: '🥉', color: '#D97706' };
  return { label: `${i + 1}位`, color: 'rgba(255,255,255,0.3)' };
}

function calcHensachi(score: number, total: number, level: 1 | 2 | 3): number {
  const base  = { 1: 35, 2: 45, 3: 55 }[level];
  const range = { 1: 30, 2: 35, 3: 45 }[level];
  return Math.round(base + (score / total) * range);
}

function hensachiColor(h: number): string {
  if (h >= 80) return '#D4AF37';
  if (h >= 65) return '#FBBF24';
  if (h >= 50) return '#93C5FD';
  return '#F87171';
}

// ─────────────────────────────────────────────────────────────────
// カラートークン
// ─────────────────────────────────────────────────────────────────
const C = {
  navy: '#0B1628', navyCard: '#0F1E35', navyLight: '#1A3356', navyBorder: '#1E3A5F',
  gold: '#D4AF37', goldLight: '#F0D060',
  white: '#FFFFFF', dim: 'rgba(255,255,255,0.55)', dimmer: 'rgba(255,255,255,0.30)',
  dimmest: 'rgba(255,255,255,0.10)',
  green: '#22C55E', red: '#EF4444', purple: '#7C3AED', purpleLight: '#A78BFA',
  cyan: '#06B6D4', cyanLight: '#67E8F9',
};

const GENRE_CONFIG = {
  winners: { label: '優勝クラブ・スター', Icon: Trophy,    color: C.gold,      bg: 'rgba(212,175,55,0.12)', border: 'rgba(212,175,55,0.35)',   cardBg: 'linear-gradient(160deg,#122040 0%,#0F1E35 60%)', cardBorder: '#1E3A5F' },
  legends: { label: '伝説の名場面',       Icon: BookOpen,  color: C.cyanLight, bg: 'rgba(6,182,212,0.12)',  border: 'rgba(6,182,212,0.35)',    cardBg: 'linear-gradient(160deg,#0a2030 0%,#0F1E35 60%)', cardBorder: 'rgba(6,182,212,0.25)' },
};

const LV_CONFIG = {
  1: { label: 'LV.1 初級', color: C.gold,        bg: 'rgba(212,175,55,0.15)', border: 'rgba(212,175,55,0.4)' },
  2: { label: 'LV.2 中級', color: '#93C5FD',     bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)' },
  3: { label: 'LV.3 上級', color: C.purpleLight, bg: 'rgba(124,58,237,0.20)', border: 'rgba(167,139,250,0.5)' },
};

// localStorage キー
const LS_KEY = 'rm_quiz_cleared';

// ─────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────
export default function QuizPage() {
  const [phase,         setPhase]         = useState<Phase>('start');
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);
  const [clearedLevels, setClearedLevels] = useState<Set<1 | 2 | 3>>(new Set());
  const [questions,     setQuestions]     = useState<QuizQuestion[]>([]);
  const [currentIdx,    setCurrentIdx]    = useState(0);
  const [selected,      setSelected]      = useState<string | null>(null);
  const [answers,       setAnswers]       = useState<boolean[]>([]);
  const [score,         setScore]         = useState(0);
  const [nickname,      setNickname]      = useState('');
  const [submitted,     setSubmitted]     = useState(false);
  const [rankings,      setRankings]      = useState<RankingEntry[]>([]);
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState('');

  // localStorage から解放済みレベルを読み込む
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const saved: number[] = raw ? JSON.parse(raw) : [];
      setClearedLevels(new Set(saved as (1 | 2 | 3)[]));
    } catch { /* ignore */ }
  }, []);

  function isUnlocked(lv: 1 | 2 | 3): boolean {
    if (lv === 1) return true;
    if (lv === 2) return clearedLevels.has(1);
    return clearedLevels.has(2);
  }

  function unlockLevel(lv: 1 | 2 | 3) {
    setClearedLevels(prev => {
      const next = new Set(prev);
      next.add(lv);
      try { localStorage.setItem(LS_KEY, JSON.stringify(Array.from(next))); } catch { /* ignore */ }
      return next;
    });
  }

  const fetchQuestions = useCallback(async (lv: 1 | 2 | 3) => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`/api/quiz/questions?level=${lv}`);
      if (!res.ok) throw new Error('問題の取得に失敗しました');
      const data = await res.json();
      if (!data.length) throw new Error('問題データがありません');
      setQuestions(data);
      setCurrentIdx(0); setAnswers([]); setScore(0);
      setSelected(null); setSubmitted(false);
      setPhase('quiz');
    } catch (e) {
      setError(e instanceof Error ? e.message : '不明なエラー');
    } finally { setLoading(false); }
  }, []);

  const fetchRankings = useCallback(async () => {
    const res = await fetch('/api/quiz/ranking');
    if (res.ok) setRankings(await res.json());
  }, []);

  useEffect(() => { if (phase === 'ranking') fetchRankings(); }, [phase, fetchRankings]);

  function handleSelect(choice: string) {
    if (selected !== null) return;
    const correct = choice === questions[currentIdx].correct_answer;
    setSelected(choice);
    setAnswers(prev => [...prev, correct]);
    if (correct) setScore(s => s + 1);
  }

  function handleNext() {
    if (currentIdx + 1 < questions.length) { setCurrentIdx(i => i + 1); setSelected(null); }
    else {
      // 合否判定 & レベル解放
      const finalScore = answers.filter(Boolean).length + (selected === questions[currentIdx]?.correct_answer ? 1 : 0);
      if (finalScore >= PASS_THRESHOLD[selectedLevel]) unlockLevel(selectedLevel);
      setPhase('result');
    }
  }

  async function handleSubmitRanking() {
    if (!nickname.trim() || submitted) return;
    setLoading(true);
    try {
      const res = await fetch('/api/quiz/ranking', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: nickname.trim(), score, total: questions.length }),
      });
      if (!res.ok) throw new Error('保存に失敗しました');
      setSubmitted(true); setPhase('ranking');
    } catch (e) { setError(e instanceof Error ? e.message : '保存エラー'); }
    finally { setLoading(false); }
  }

  function handleShareX() {
    const h    = calcHensachi(score, questions.length, selectedLevel);
    const t    = getTitle(score);
    const text = `俺のCL偏差値は${h}！これを超えられる奴いる？💪\n称号：${t.emoji} ${t.title}\n${score}/${questions.length}問正解 LV.${selectedLevel}\n#ChampionsLeague #UEFA #CL好きと繋がりたい`;
    const shareUrl = `https://ultrasrei.com/quiz/share?h=${h}&lv=${selectedLevel}&s=${score}&t=${questions.length}`;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  }

  function handleRestart() {
    setPhase('start'); setQuestions([]); setNickname(''); setSubmitted(false); setError('');
  }

  const q        = questions[currentIdx];
  const progress = questions.length > 0 ? ((currentIdx + (selected !== null ? 1 : 0)) / questions.length) * 100 : 0;
  const passed   = score >= PASS_THRESHOLD[selectedLevel];
  const bg       = { backgroundColor: C.navy, minHeight: '100vh' };

  // ═══════════════════════════════════════════════════════════
  // START — レベル選択画面
  // ═══════════════════════════════════════════════════════════
  if (phase === 'start') {
    const LEVEL_INFO = [
      {
        lv: 1 as const,
        title: '初級',
        sub: '近年の優勝クラブ＆スター選手',
        pass: '10問中8問正解で合格',
        unlock: 'LV.2が解放されます',
        tip: '2000年代以降の優勝クラブ・ロナウド・メッシ・ベンゼマなど',
      },
      {
        lv: 2 as const,
        title: '中級',
        sub: '伝説の逆転劇＆名勝負',
        pass: '10問中9問正解で合格',
        unlock: 'LV.3が解放されます',
        tip: 'イスタンブールの奇跡・ジダンのボレー・モウリーニョのポルトなど',
      },
      {
        lv: 3 as const,
        title: '上級',
        sub: '詳細な記録・スタッツ・歴史的データ',
        pass: '10問全問正解のみ合格',
        unlock: '🌟 CL完全制覇マスター 称号を授与',
        tip: '得点記録・決勝スコア・対戦カードまで細部を問う超マニアック問題',
      },
    ];

    return (
      <div style={{ ...bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div style={{ maxWidth: 460, width: '100%' }}>

          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 72, height: 72, borderRadius: '50%',
              background: `linear-gradient(135deg, ${C.navyLight}, ${C.navyCard})`,
              border: `2px solid ${C.gold}`, marginBottom: 14,
              boxShadow: `0 0 32px rgba(212,175,55,0.22)`,
            }}>
              <span style={{ fontSize: 32 }}>⭐</span>
            </div>
            <div style={{ fontSize: 10, color: C.gold, letterSpacing: '0.2em', fontWeight: 700, marginBottom: 6 }}>UEFA CHAMPIONS LEAGUE</div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 4 }}>
              21世紀 CLマスタークイズ
            </h1>
            <p style={{ fontSize: 12, color: C.dim }}>全10問・4択形式　2000-01〜現在</p>
          </div>

          {/* Level selector */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, color: C.dimmer, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
              レベルを選択
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LEVEL_INFO.map(({ lv, title, sub, pass, unlock, tip }) => {
                const lc      = LV_CONFIG[lv];
                const unlocked = isUnlocked(lv);
                const cleared  = clearedLevels.has(lv);
                const active   = selectedLevel === lv;

                return (
                  <button
                    key={lv}
                    onClick={() => unlocked && setSelectedLevel(lv)}
                    disabled={!unlocked}
                    style={{
                      width: '100%', textAlign: 'left', cursor: unlocked ? 'pointer' : 'not-allowed',
                      backgroundColor: active ? lc.bg : C.navyCard,
                      border: `2px solid ${active ? lc.border : unlocked ? C.navyBorder : 'rgba(255,255,255,0.05)'}`,
                      borderRadius: 14, padding: '14px 16px',
                      opacity: unlocked ? 1 : 0.45,
                      transition: 'all 0.15s ease',
                      boxShadow: active ? `0 0 18px ${lc.color}20` : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>

                      {/* Left icon */}
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: lc.bg, border: `1px solid ${lc.border}`,
                      }}>
                        {!unlocked
                          ? <Lock size={14} color={lc.color} />
                          : cleared
                          ? <CheckCircle size={16} color={C.green} />
                          : lv === 3
                          ? <Flame size={16} color={lc.color} />
                          : <Trophy size={14} color={lc.color} />
                        }
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: unlocked ? lc.color : C.dimmer }}>
                            {lv === 3 && '🔥 '}{title}
                          </span>
                          {cleared && (
                            <span style={{ fontSize: 9, color: C.green, fontWeight: 700, backgroundColor: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 10, padding: '1px 6px' }}>
                              ✓ クリア済み
                            </span>
                          )}
                          {!unlocked && (
                            <span style={{ fontSize: 9, color: C.dimmer, backgroundColor: C.dimmest, borderRadius: 10, padding: '1px 6px' }}>
                              🔒 ロック中
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: unlocked ? C.dim : C.dimmer, marginBottom: 4 }}>{sub}</div>
                        <div style={{ fontSize: 10, color: unlocked ? lc.color : C.dimmer, fontWeight: 700, marginBottom: 2 }}>
                          📋 {pass}
                        </div>
                        <div style={{ fontSize: 10, color: unlocked ? C.dimmer : 'rgba(255,255,255,0.15)' }}>
                          → {unlock}
                        </div>
                        {unlocked && active && (
                          <div style={{ fontSize: 9, color: C.dimmer, marginTop: 6, borderTop: `1px solid ${C.dimmest}`, paddingTop: 6 }}>
                            💡 {tip}
                          </div>
                        )}
                      </div>

                      {/* Active check */}
                      {active && unlocked && (
                        <div style={{
                          width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                          backgroundColor: lc.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ fontSize: 10, color: '#000', fontWeight: 900 }}>✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div style={{ backgroundColor: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 11, color: '#FCA5A5' }}>
              {error}
            </div>
          )}

          <button
            onClick={() => fetchQuestions(selectedLevel)}
            disabled={loading || !isUnlocked(selectedLevel)}
            style={{
              width: '100%', padding: '14px 0', borderRadius: 12, border: 'none',
              background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 50%, #A07D10 100%)`,
              color: '#000', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: loading ? 0.6 : 1,
              boxShadow: loading ? 'none' : `0 0 28px rgba(212,175,55,0.35)`,
            }}
          >
            <Trophy size={16} />
            {loading ? '読み込み中...' : `LV.${selectedLevel} を始める`}
          </button>

          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <a href="/" style={{ fontSize: 11, color: C.dimmer, textDecoration: 'none' }}>← ベストイレブンメーカーに戻る</a>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // QUIZ
  // ═══════════════════════════════════════════════════════════
  if (phase === 'quiz' && q) {
    const genre = GENRE_CONFIG[q.genre];
    const lv    = LV_CONFIG[q.level];
    const isLv3 = q.level === 3;
    const threshold = PASS_THRESHOLD[selectedLevel];
    const remaining = threshold - score;

    return (
      <div style={{ ...bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div style={{ maxWidth: 480, width: '100%' }}>

          {/* Progress */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, color: C.dimmer }}>問題 {currentIdx + 1} / {questions.length}</span>
                <span style={{ fontSize: 9, color: LV_CONFIG[selectedLevel].color, fontWeight: 700,
                  backgroundColor: LV_CONFIG[selectedLevel].bg, border: `1px solid ${LV_CONFIG[selectedLevel].border}`,
                  borderRadius: 10, padding: '1px 6px',
                }}>
                  LV.{selectedLevel}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.gold }}>{score}問正解</span>
                <span style={{ fontSize: 9, color: C.dimmer, marginLeft: 6 }}>合格まで残り{Math.max(0, remaining - (currentIdx - answers.length))}問</span>
              </div>
            </div>
            <div style={{ width: '100%', backgroundColor: C.dimmest, borderRadius: 99, height: 4 }}>
              <div style={{
                width: `${progress}%`, height: 4, borderRadius: 99,
                background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`,
                transition: 'width 0.5s ease',
              }} />
            </div>
            {/* Pass threshold marker */}
            <div style={{ position: 'relative', height: 10 }}>
              <div style={{
                position: 'absolute', left: `${(threshold / questions.length) * 100}%`,
                top: 0, transform: 'translateX(-50%)',
                fontSize: 8, color: C.gold, fontWeight: 700,
              }}>▲ 合格ライン</div>
            </div>
            {/* Answer dots */}
            <div style={{ display: 'flex', gap: 4, marginTop: 4, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              {questions.map((qq, i) => (
                <div key={i} style={{
                  width: 7, height: 7, borderRadius: '50%',
                  backgroundColor: i < currentIdx
                    ? (answers[i] ? C.green : C.red)
                    : i === currentIdx ? GENRE_CONFIG[qq.genre].color : C.dimmest,
                  transition: 'background-color 0.3s',
                }} />
              ))}
            </div>
          </div>

          {/* Question card */}
          <div style={{
            background: isLv3 && q.genre === 'legends' ? 'linear-gradient(160deg,#130d2a 0%,#0f1e35 60%)' : genre.cardBg,
            border: `1px solid ${isLv3 && q.genre === 'legends' ? 'rgba(167,139,250,0.35)' : genre.cardBorder}`,
            borderRadius: 18, padding: '24px 20px 20px', marginBottom: 12,
            animation: 'slideUp 0.25s ease-out',
          }}>
            {/* Genre + Level badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, backgroundColor: genre.bg, border: `1px solid ${genre.border}`, borderRadius: 20, padding: '3px 10px' }}>
                <genre.Icon size={10} color={genre.color} />
                <span style={{ fontSize: 9, fontWeight: 700, color: genre.color, letterSpacing: '0.08em' }}>{genre.label}</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, backgroundColor: lv.bg, border: `1px solid ${lv.border}`, borderRadius: 20, padding: '3px 10px' }}>
                {isLv3 && <Flame size={9} color={lv.color} />}
                <span style={{ fontSize: 9, fontWeight: 700, color: lv.color, letterSpacing: '0.08em' }}>{lv.label}</span>
              </div>
            </div>

            {/* Context */}
            {q.context && (
              <div style={{ textAlign: 'center', marginBottom: 10 }}>
                {q.emoji && <div style={{ fontSize: 36, marginBottom: 6 }}>{q.emoji}</div>}
                <div style={{ fontSize: 10, color: C.dimmer, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>Real Madrid C.F.</div>
                <div style={{ fontFamily: 'Georgia,serif', fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 8 }}>{q.context}</div>
              </div>
            )}
            {!q.context && q.emoji && <div style={{ textAlign: 'center', fontSize: 38, marginBottom: 12 }}>{q.emoji}</div>}

            {/* Question text */}
            <div style={{ textAlign: 'center', marginBottom: 18, padding: '12px 14px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.white, lineHeight: 1.6, margin: 0 }}>{q.question_text}</p>
            </div>

            {/* Choices */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {q.choices.map(choice => {
                const isCorrect = choice === q.correct_answer;
                const isWrong   = selected !== null && choice === selected && !isCorrect;
                const isDimmed  = selected !== null && !isCorrect && choice !== selected;
                let bg2 = 'rgba(255,255,255,0.04)', border2 = 'rgba(255,255,255,0.08)', color2 = C.white, shadow = 'none';
                if (selected !== null) {
                  if (isCorrect)     { bg2 = 'rgba(34,197,94,0.18)'; border2 = 'rgba(34,197,94,0.55)'; color2 = C.green; shadow = '0 0 14px rgba(34,197,94,0.25)'; }
                  else if (isWrong)  { bg2 = 'rgba(239,68,68,0.18)'; border2 = 'rgba(239,68,68,0.55)'; color2 = C.red; }
                  else if (isDimmed) { bg2 = 'rgba(255,255,255,0.02)'; border2 = 'rgba(255,255,255,0.04)'; color2 = 'rgba(255,255,255,0.2)'; }
                }
                return (
                  <button key={choice} onClick={() => handleSelect(choice)} disabled={selected !== null} style={{
                    backgroundColor: bg2, border: `1px solid ${border2}`, borderRadius: 12,
                    padding: '14px 10px', color: color2,
                    fontFamily: /^\d/.test(choice) ? 'Georgia,serif' : 'inherit',
                    fontSize: choice.length > 10 ? 12 : choice.length > 6 ? 14 : 22,
                    fontWeight: 700, cursor: selected !== null ? 'default' : 'pointer',
                    transition: 'all 0.15s ease', boxShadow: shadow, lineHeight: 1.3,
                  }}>
                    {choice}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {selected !== null && (
              <div style={{ marginTop: 14, textAlign: 'center', animation: 'slideUp 0.2s ease-out' }}>
                {selected === q.correct_answer
                  ? <span style={{ fontSize: 13, color: C.green, fontWeight: 700 }}>✓ 正解！　{q.correct_answer}</span>
                  : <span style={{ fontSize: 13, color: C.red }}>✗ 不正解… 正解は <strong style={{ color: C.white }}>{q.correct_answer}</strong></span>
                }
                {q.hint && <p style={{ fontSize: 10, color: C.dimmer, marginTop: 6, lineHeight: 1.5 }}>💡 {q.hint}</p>}
              </div>
            )}
          </div>

          {selected !== null && (
            <button onClick={handleNext} style={{
              width: '100%', padding: '13px 0', borderRadius: 12, border: 'none',
              background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 50%, #A07D10 100%)`,
              color: '#000', fontWeight: 700, fontSize: 13, letterSpacing: '0.04em', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              boxShadow: `0 0 20px rgba(212,175,55,0.3)`, animation: 'slideUp 0.2s ease-out',
            }}>
              {currentIdx + 1 < questions.length
                ? <><span>次の問題</span><ChevronRight size={15} /></>
                : <><Trophy size={15} /><span>結果を見る</span></>}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // RESULT
  // ═══════════════════════════════════════════════════════════
  if (phase === 'result') {
    const t         = getTitle(score);
    const pct       = Math.round((score / questions.length) * 100);
    const threshold = PASS_THRESHOLD[selectedLevel];
    const isLv3Legend = selectedLevel === 3 && passed;
    const hensachi  = calcHensachi(score, questions.length, selectedLevel);
    const hColor    = hensachiColor(hensachi);

    return (
      <div style={{ ...bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div style={{ maxWidth: 440, width: '100%', animation: 'slideUp 0.3s ease-out' }}>

          {/* Pass / Fail banner */}
          <div style={{
            borderRadius: 14, padding: '12px 20px', marginBottom: 12, textAlign: 'center',
            backgroundColor: passed ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
            border: `1px solid ${passed ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.4)'}`,
          }}>
            {isLv3Legend ? (
              <>
                <div style={{ fontSize: 28, marginBottom: 4 }}>👑</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.gold, fontFamily: 'Georgia,serif' }}>
                  伝説のレジェンド 称号獲得！
                </div>
              </>
            ) : passed ? (
              <>
                <div style={{ fontSize: 22, marginBottom: 3 }}>🎉</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.green }}>LV.{selectedLevel} 合格！</div>
                {selectedLevel < 3 && (
                  <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
                    🔓 LV.{selectedLevel + 1} が解放されました！
                  </div>
                )}
              </>
            ) : (
              <>
                <div style={{ fontSize: 22, marginBottom: 3 }}>😤</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.red }}>LV.{selectedLevel} 不合格…</div>
                <div style={{ fontSize: 11, color: C.dim, marginTop: 4 }}>
                  合格ライン：{threshold}問正解　あと{threshold - score}問必要です
                </div>
              </>
            )}
          </div>

          {/* Score card */}
          <div style={{
            background: 'linear-gradient(160deg,#122040 0%,#0F1E35 100%)',
            border: '1px solid rgba(212,175,55,0.4)', borderRadius: 20,
            padding: '24px 22px', textAlign: 'center', marginBottom: 12,
            boxShadow: '0 0 40px rgba(212,175,55,0.1)',
          }}>
            <div style={{ fontSize: 38, marginBottom: 6 }}>{isLv3Legend ? '👑' : t.emoji}</div>
            <div style={{ fontSize: 10, color: C.dimmer, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 5 }}>あなたの称号</div>
            <div style={{ fontFamily: 'Georgia,serif', fontSize: 16, fontWeight: 700, color: C.gold, marginBottom: 16 }}>
              {isLv3Legend ? '永遠のレジェンド "Hala Madrid"' : t.title}
            </div>

            <div style={{ fontFamily: 'Georgia,serif', fontSize: 50, fontWeight: 900, color: C.gold, lineHeight: 1 }}>
              {score}<span style={{ fontSize: 20, color: C.dimmer, fontWeight: 400 }}>/{questions.length}</span>
            </div>
            <div style={{ fontSize: 12, color: C.dim, marginTop: 4, marginBottom: 16 }}>
              正解率 {pct}%　|　合格ライン {threshold}問
            </div>

            {/* Answer dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
              {answers.map((ok, i) => {
                const qq = questions[i];
                return (
                  <div key={i} style={{
                    width: 22, height: 22, borderRadius: '50%', fontSize: 9, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.15)',
                    border: `1px solid ${ok ? C.green + '80' : C.red + '80'}`,
                    color: ok ? C.green : C.red,
                    outline: qq?.genre === 'legends' ? `1px solid ${C.cyanLight}40` : 'none',
                    outlineOffset: 2,
                  }}>
                    {ok ? '○' : '✗'}
                  </div>
                );
              })}
            </div>

            {/* Genre breakdown */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {(['winners', 'legends'] as const).map(genre => {
                const g  = GENRE_CONFIG[genre];
                const qs = questions.filter(qq => qq.genre === genre);
                const ok = qs.reduce((acc, qq, i) => {
                  const idx = questions.indexOf(qq);
                  return acc + (answers[idx] ? 1 : 0);
                }, 0);
                return (
                  <div key={genre} style={{ textAlign: 'center' }}>
                    <g.Icon size={11} color={g.color} style={{ margin: '0 auto 2px' }} />
                    <div style={{ fontSize: 10, color: g.color, fontWeight: 700 }}>{g.label}</div>
                    <div style={{ fontSize: 13, color: C.white, fontWeight: 700 }}>{ok}/{qs.length}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 偏差値ゲージ */}
          <div style={{
            background: 'linear-gradient(160deg,#0d1a30 0%,#0F1E35 100%)',
            border: `2px solid ${hColor}40`,
            borderRadius: 20, padding: '20px 22px', marginBottom: 12,
            boxShadow: `0 0 24px ${hColor}18`,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}>CL偏差値</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: 'Georgia,serif', fontSize: 52, fontWeight: 900, color: hColor, lineHeight: 1 }}>{hensachi}</span>
                <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.2)' }}>/100</span>
              </div>
            </div>

            {/* Gauge bar */}
            <div style={{ width: '100%', height: 14, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 7, overflow: 'hidden', marginBottom: 6 }}>
              <div style={{
                width: `${hensachi}%`, height: '100%',
                background: 'linear-gradient(90deg,#F87171 0%,#FBBF24 40%,#D4AF37 68%,#F0D060 100%)',
                borderRadius: 7,
                transition: 'width 1s ease-out',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {['初心者', '普通', '上級', '銀河系', '伝説'].map(l => (
                <span key={l} style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{l}</span>
              ))}
            </div>

            {/* Share prompt */}
            <div style={{
              marginTop: 14, padding: '10px 14px', borderRadius: 10,
              backgroundColor: `${hColor}14`, border: `1px solid ${hColor}35`,
              textAlign: 'center',
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: hColor }}>
                俺のCL偏差値は{hensachi}。これを超えられる奴いる？💪
              </span>
            </div>
          </div>

          {/* Ranking submit */}
          <div style={{ backgroundColor: C.navyCard, border: `1px solid ${C.navyBorder}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <Medal size={13} color={C.gold} />
              <span style={{ fontSize: 10, fontWeight: 700, color: C.dimmer, letterSpacing: '0.12em', textTransform: 'uppercase' }}>ランキングに登録</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" value={nickname} onChange={e => setNickname(e.target.value)}
                placeholder="ニックネーム（最大20文字）" maxLength={20}
                style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 12, outline: 'none' }}
              />
              <button onClick={handleSubmitRanking} disabled={!nickname.trim() || submitted || loading}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg, ${C.gold}, #A07D10)`, color: '#000', fontWeight: 700, fontSize: 11, opacity: (!nickname.trim() || submitted || loading) ? 0.4 : 1, whiteSpace: 'nowrap' }}
              >
                {loading ? '...' : submitted ? '登録済み' : '登録'}
              </button>
            </div>
            {error && <p style={{ color: C.red, fontSize: 10, marginTop: 6 }}>{error}</p>}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <button onClick={handleShareX} style={{ flex: 1, padding: '12px 0', borderRadius: 12, border: '1px solid rgba(255,255,255,0.18)', backgroundColor: '#000', color: C.white, fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Share2 size={14} />Xにシェア
            </button>
            <button onClick={() => setPhase('ranking')} style={{ flex: 1, padding: '12px 0', borderRadius: 12, border: 'rgba(212,175,55,0.4) solid 1px', backgroundColor: 'rgba(212,175,55,0.08)', color: C.gold, fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Trophy size={14} />ランキング
            </button>
          </div>
          <button onClick={handleRestart} style={{ width: '100%', padding: '11px 0', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'transparent', color: C.dimmer, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <RotateCcw size={12} />レベル選択に戻る
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // RANKING
  // ═══════════════════════════════════════════════════════════
  if (phase === 'ranking') return (
    <div style={{ ...bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ maxWidth: 440, width: '100%', animation: 'slideUp 0.3s ease-out' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Trophy size={26} color={C.gold} style={{ margin: '0 auto 8px' }} />
          <h2 style={{ fontFamily: 'Georgia,serif', fontSize: 17, fontWeight: 700, color: C.white, marginBottom: 4 }}>ランキング</h2>
          <p style={{ fontSize: 10, color: C.dimmer }}>レアル・マドリード 経歴クイズ</p>
        </div>

        <div style={{ backgroundColor: C.navyCard, border: `1px solid ${C.navyBorder}`, borderRadius: 16, overflow: 'hidden', marginBottom: 14 }}>
          {rankings.length === 0
            ? <div style={{ padding: '32px 16px', textAlign: 'center', color: C.dimmer, fontSize: 12 }}>まだ登録者がいません</div>
            : rankings.map((entry, i) => {
              const r   = getRankLabel(i);
              const t   = getTitle(entry.score);
              const pct = Math.round((entry.score / entry.total) * 100);
              return (
                <div key={entry.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                  borderBottom: i < rankings.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  backgroundColor: i === 0 ? 'rgba(212,175,55,0.07)' : 'transparent',
                }}>
                  <span style={{ fontSize: i < 3 ? 18 : 11, color: r.color, width: 30, textAlign: 'center', flexShrink: 0 }}>{r.label}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.white, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.nickname}</div>
                    <div style={{ fontSize: 9, color: C.dimmer, marginTop: 1 }}>{t.emoji} {t.title} · {entry.score}/{entry.total}問 ({pct}%)</div>
                  </div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: 22, fontWeight: 900, color: C.gold, flexShrink: 0 }}>{entry.score}</div>
                </div>
              );
            })
          }
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleShareX} style={{ flex: 1, padding: '12px 0', borderRadius: 12, border: '1px solid rgba(255,255,255,0.18)', backgroundColor: '#000', color: C.white, fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Share2 size={14} />Xにシェア
          </button>
          <button onClick={handleRestart} style={{ flex: 1, padding: '12px 0', borderRadius: 12, border: 'none', background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 50%, #A07D10 100%)`, color: '#000', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: '0 0 18px rgba(212,175,55,0.25)' }}>
            <RotateCcw size={12} />もう一度
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <a href="/" style={{ fontSize: 11, color: C.dimmer, textDecoration: 'none' }}>← ベストイレブンメーカーに戻る</a>
        </div>
      </div>
    </div>
  );

  return null;
}
