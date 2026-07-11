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
  id: string; nickname: string; score: number; total: number; level: number; points: number; created_at: string;
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

// 画面ラッパー共通クラス
const SCREEN_WRAP = 'min-h-screen flex flex-col items-center justify-center p-[1.5rem]';

// localStorage キー
const LS_KEY = 'rm_quiz_cleared';
const LS_SEEN_PREFIX = 'rm_quiz_seen_lv';

function getSeenIds(level: 1 | 2 | 3): string[] {
  try {
    const raw = localStorage.getItem(`${LS_SEEN_PREFIX}${level}`);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function addSeenIds(level: 1 | 2 | 3, ids: string[]) {
  try {
    const current = getSeenIds(level);
    const merged = Array.from(new Set([...current, ...ids]));
    localStorage.setItem(`${LS_SEEN_PREFIX}${level}`, JSON.stringify(merged));
  } catch { /* ignore */ }
}

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
      const seen = getSeenIds(lv);
      const excludeParam = seen.length ? `&exclude=${seen.join(',')}` : '';
      const res = await fetch(`/api/quiz/questions?level=${lv}${excludeParam}`);
      if (!res.ok) throw new Error('問題の取得に失敗しました');
      const data: (QuizQuestion & { id: string })[] = await res.json();
      if (!data.length) throw new Error('問題データがありません');
      // 表示した問題IDを記録
      addSeenIds(lv, data.map(q => q.id).filter(Boolean));
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

  // 画面切り替え（レベル選択→問題、結果→次のレベルなど）のたびに先頭にスクロール
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [phase, currentIdx]);

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
        body: JSON.stringify({ nickname: nickname.trim(), score, total: questions.length, level: selectedLevel }),
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
      <div className={SCREEN_WRAP} style={{ backgroundColor: C.navy }}>
        <div className="max-w-[460px] w-full">

          {/* Hero */}
          <div className="text-center mb-[24px]">
            <div className="inline-flex items-center justify-center w-[72px] h-[72px] rounded-full mb-[14px]" style={{
              background: `linear-gradient(135deg, ${C.navyLight}, ${C.navyCard})`,
              border: `2px solid ${C.gold}`,
              boxShadow: `0 0 32px rgba(212,175,55,0.22)`,
            }}>
              <span style={{ fontSize: 32 }}>⭐</span>
            </div>
            <div className="tracking-[0.2em] font-bold mb-[6px]" style={{ fontSize: 10, color: C.gold }}>UEFA CHAMPIONS LEAGUE</div>
            <h1 className="font-bold mb-[4px]" style={{ fontFamily: 'Georgia,serif', fontSize: 20, color: C.white }}>
              21世紀 CLマスタークイズ
            </h1>
            <p style={{ fontSize: 12, color: C.dim }}>全10問・4択形式　2000-01〜現在</p>
          </div>

          {/* Level selector */}
          <div className="mb-[16px]">
            <div className="font-bold tracking-[0.12em] uppercase mb-[10px]" style={{ fontSize: 10, color: C.dimmer }}>
              レベルを選択
            </div>

            <div className="flex flex-col gap-[10px]">
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
                    className="w-full text-left rounded-[14px] px-[16px] py-[14px]"
                    style={{
                      cursor: unlocked ? 'pointer' : 'not-allowed',
                      backgroundColor: active ? lc.bg : C.navyCard,
                      border: `2px solid ${active ? lc.border : unlocked ? C.navyBorder : 'rgba(255,255,255,0.05)'}`,
                      opacity: unlocked ? 1 : 0.45,
                      transition: 'all 0.15s ease',
                      boxShadow: active ? `0 0 18px ${lc.color}20` : 'none',
                    }}
                  >
                    <div className="flex items-start gap-[12px]">

                      {/* Left icon */}
                      <div className="w-[36px] h-[36px] rounded-full shrink-0 flex items-center justify-center" style={{
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
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-[8px] mb-[3px]">
                          <span className="font-bold" style={{ fontSize: 13, color: unlocked ? lc.color : C.dimmer }}>
                            {lv === 3 && '🔥 '}{title}
                          </span>
                          {cleared && (
                            <span className="font-bold rounded-[10px] px-[6px] py-[1px]" style={{ fontSize: 9, color: C.green, backgroundColor: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)' }}>
                              ✓ クリア済み
                            </span>
                          )}
                          {!unlocked && (
                            <span className="rounded-[10px] px-[6px] py-[1px]" style={{ fontSize: 9, color: C.dimmer, backgroundColor: C.dimmest }}>
                              🔒 ロック中
                            </span>
                          )}
                        </div>
                        <div className="mb-[4px]" style={{ fontSize: 11, color: unlocked ? C.dim : C.dimmer }}>{sub}</div>
                        <div className="font-bold mb-[2px]" style={{ fontSize: 10, color: unlocked ? lc.color : C.dimmer }}>
                          📋 {pass}
                        </div>
                        <div style={{ fontSize: 10, color: unlocked ? C.dimmer : 'rgba(255,255,255,0.15)' }}>
                          → {unlock}
                        </div>
                        {unlocked && active && (
                          <div className="mt-[6px] pt-[6px]" style={{ fontSize: 9, color: C.dimmer, borderTop: `1px solid ${C.dimmest}` }}>
                            💡 {tip}
                          </div>
                        )}
                      </div>

                      {/* Active check */}
                      {active && unlocked && (
                        <div className="w-[18px] h-[18px] rounded-full shrink-0 flex items-center justify-center" style={{
                          backgroundColor: lc.color,
                        }}>
                          <span className="font-black" style={{ fontSize: 10, color: '#000' }}>✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="rounded-[10px] px-[14px] py-[10px] mb-[12px]" style={{ backgroundColor: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', fontSize: 11, color: '#FCA5A5' }}>
              {error}
            </div>
          )}

          <button
            onClick={() => fetchQuestions(selectedLevel)}
            disabled={loading || !isUnlocked(selectedLevel)}
            className="w-full py-[14px] px-0 rounded-[12px] font-bold tracking-[0.05em] flex items-center justify-center gap-[8px]"
            style={{
              border: 'none',
              background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 50%, #A07D10 100%)`,
              color: '#000', fontSize: 14,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              boxShadow: loading ? 'none' : `0 0 28px rgba(212,175,55,0.35)`,
            }}
          >
            <Trophy size={16} />
            {loading ? '読み込み中...' : `LV.${selectedLevel} を始める`}
          </button>

          <div className="text-center mt-[12px]">
            <a href="/tool" className="no-underline" style={{ fontSize: 11, color: C.dimmer }}>← ベストイレブンメーカーに戻る</a>
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
      <div className={SCREEN_WRAP} style={{ backgroundColor: C.navy }}>
        <div className="max-w-[480px] w-full">

          {/* Progress */}
          <div className="mb-[18px]">
            <div className="flex justify-between items-center mb-[6px]">
              <div className="flex items-center gap-[6px]">
                <span style={{ fontSize: 11, color: C.dimmer }}>問題 {currentIdx + 1} / {questions.length}</span>
                <span className="font-bold rounded-[10px] px-[6px] py-[1px]" style={{ fontSize: 9, color: LV_CONFIG[selectedLevel].color,
                  backgroundColor: LV_CONFIG[selectedLevel].bg, border: `1px solid ${LV_CONFIG[selectedLevel].border}`,
                }}>
                  LV.{selectedLevel}
                </span>
              </div>
              <div className="text-right">
                <span className="font-bold" style={{ fontSize: 11, color: C.gold }}>{score}問正解</span>
                <span className="ml-[6px]" style={{ fontSize: 9, color: C.dimmer }}>合格まで残り{Math.max(0, remaining - (currentIdx - answers.length))}問</span>
              </div>
            </div>
            <div className="w-full rounded-[99px] h-[4px]" style={{ backgroundColor: C.dimmest }}>
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
            <div className="flex gap-[4px] mt-[4px] justify-end flex-wrap">
              {questions.map((qq, i) => (
                <div key={i} className="w-[7px] h-[7px] rounded-full" style={{
                  backgroundColor: i < currentIdx
                    ? (answers[i] ? C.green : C.red)
                    : i === currentIdx ? GENRE_CONFIG[qq.genre].color : C.dimmest,
                  transition: 'background-color 0.3s',
                }} />
              ))}
            </div>
          </div>

          {/* Question card */}
          <div className="rounded-[18px] pt-[24px] px-[20px] pb-[20px] mb-[12px]" style={{
            background: isLv3 && q.genre === 'legends' ? 'linear-gradient(160deg,#130d2a 0%,#0f1e35 60%)' : genre.cardBg,
            border: `1px solid ${isLv3 && q.genre === 'legends' ? 'rgba(167,139,250,0.35)' : genre.cardBorder}`,
            animation: 'slideUp 0.25s ease-out',
          }}>
            {/* Genre + Level badges */}
            <div className="flex items-center justify-center gap-[8px] mb-[16px]">
              <div className="inline-flex items-center gap-[5px] rounded-[20px] px-[10px] py-[3px]" style={{ backgroundColor: genre.bg, border: `1px solid ${genre.border}` }}>
                <genre.Icon size={10} color={genre.color} />
                <span className="font-bold tracking-[0.08em]" style={{ fontSize: 9, color: genre.color }}>{genre.label}</span>
              </div>
              <div className="inline-flex items-center gap-[4px] rounded-[20px] px-[10px] py-[3px]" style={{ backgroundColor: lv.bg, border: `1px solid ${lv.border}` }}>
                {isLv3 && <Flame size={9} color={lv.color} />}
                <span className="font-bold tracking-[0.08em]" style={{ fontSize: 9, color: lv.color }}>{lv.label}</span>
              </div>
            </div>

            {/* Context */}
            {q.context && (
              <div className="text-center mb-[10px]">
                {q.emoji && <div className="mb-[6px]" style={{ fontSize: 36 }}>{q.emoji}</div>}
                <div className="tracking-[0.15em] uppercase mb-[4px]" style={{ fontSize: 10, color: C.dimmer }}>Real Madrid C.F.</div>
                <div className="font-bold mb-[8px]" style={{ fontFamily: 'Georgia,serif', fontSize: 14, color: C.white }}>{q.context}</div>
              </div>
            )}
            {!q.context && q.emoji && <div className="text-center mb-[12px]" style={{ fontSize: 38 }}>{q.emoji}</div>}

            {/* Question text */}
            <div className="text-center mb-[18px] px-[14px] py-[12px] rounded-[10px]" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-bold leading-[1.6] m-0" style={{ fontSize: 14, color: C.white }}>{q.question_text}</p>
            </div>

            {/* Choices */}
            <div className="grid grid-cols-2 gap-[10px]">
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
                  <button key={choice} onClick={() => handleSelect(choice)} disabled={selected !== null}
                    className="rounded-[12px] p-[10px] font-bold min-h-[60px] break-words whitespace-normal"
                    style={{
                      backgroundColor: bg2, border: `1px solid ${border2}`,
                      color: color2,
                      fontFamily: /^\d/.test(choice) ? 'Georgia,serif' : 'inherit',
                      fontSize: 15,
                      cursor: selected !== null ? 'default' : 'pointer',
                      transition: 'all 0.15s ease', boxShadow: shadow, lineHeight: 1.4,
                    }}>
                    {choice}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {selected !== null && (
              <div className="mt-[14px] text-center" style={{ animation: 'slideUp 0.2s ease-out' }}>
                {selected === q.correct_answer
                  ? <span className="font-bold" style={{ fontSize: 13, color: C.green }}>✓ 正解！　{q.correct_answer}</span>
                  : <span style={{ fontSize: 13, color: C.red }}>✗ 不正解… 正解は <strong style={{ color: C.white }}>{q.correct_answer}</strong></span>
                }
                {q.hint && <p className="mt-[6px] leading-[1.5]" style={{ fontSize: 10, color: C.dimmer }}>💡 {q.hint}</p>}
              </div>
            )}
          </div>

          {selected !== null && (
            <button onClick={handleNext}
              className="w-full py-[13px] px-0 rounded-[12px] font-bold tracking-[0.04em] cursor-pointer flex items-center justify-center gap-[6px]"
              style={{
                border: 'none',
                background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 50%, #A07D10 100%)`,
                color: '#000', fontSize: 13,
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
      <div className={SCREEN_WRAP} style={{ backgroundColor: C.navy }}>
        <div className="max-w-[440px] w-full" style={{ animation: 'slideUp 0.3s ease-out' }}>

          {/* Pass / Fail banner */}
          <div className="rounded-[14px] px-[20px] py-[12px] mb-[12px] text-center" style={{
            backgroundColor: passed ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
            border: `1px solid ${passed ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.4)'}`,
          }}>
            {isLv3Legend ? (
              <>
                <div className="mb-[4px]" style={{ fontSize: 28 }}>👑</div>
                <div className="font-bold" style={{ fontSize: 16, color: C.gold, fontFamily: 'Georgia,serif' }}>
                  伝説のレジェンド 称号獲得！
                </div>
              </>
            ) : passed ? (
              <>
                <div className="mb-[3px]" style={{ fontSize: 22 }}>🎉</div>
                <div className="font-bold" style={{ fontSize: 15, color: C.green }}>LV.{selectedLevel} 合格！</div>
                {selectedLevel < 3 && (
                  <div className="mt-[4px]" style={{ fontSize: 11, color: C.dim }}>
                    🔓 LV.{selectedLevel + 1} が解放されました！
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="mb-[3px]" style={{ fontSize: 22 }}>😤</div>
                <div className="font-bold" style={{ fontSize: 15, color: C.red }}>LV.{selectedLevel} 不合格…</div>
                <div className="mt-[4px]" style={{ fontSize: 11, color: C.dim }}>
                  合格ライン：{threshold}問正解　あと{threshold - score}問必要です
                </div>
              </>
            )}
          </div>

          {/* Next level CTA */}
          {passed && selectedLevel < 3 && (
            <button
              onClick={() => {
                const next = (selectedLevel + 1) as 1 | 2 | 3;
                setSelectedLevel(next);
                fetchQuestions(next);
              }}
              disabled={loading}
              className="w-full py-[14px] px-0 rounded-[12px] cursor-pointer font-bold mb-[12px] flex items-center justify-center gap-[6px]"
              style={{
                border: 'none',
                background: `linear-gradient(135deg, ${C.gold}, #A07D10)`, color: '#000',
                fontSize: 14,
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? '読み込み中...' : `LV.${selectedLevel + 1} へ進む`}<ChevronRight size={16} />
            </button>
          )}

          {/* Score card */}
          <div className="rounded-[20px] px-[22px] py-[24px] text-center mb-[12px]" style={{
            background: 'linear-gradient(160deg,#122040 0%,#0F1E35 100%)',
            border: '1px solid rgba(212,175,55,0.4)',
            boxShadow: '0 0 40px rgba(212,175,55,0.1)',
          }}>
            <div className="mb-[6px]" style={{ fontSize: 38 }}>{isLv3Legend ? '👑' : t.emoji}</div>
            <div className="tracking-[0.2em] uppercase mb-[5px]" style={{ fontSize: 10, color: C.dimmer }}>あなたの称号</div>
            <div className="font-bold mb-[16px]" style={{ fontFamily: 'Georgia,serif', fontSize: 16, color: C.gold }}>
              {isLv3Legend ? '永遠のレジェンド "Hala Madrid"' : t.title}
            </div>

            <div className="font-black leading-none" style={{ fontFamily: 'Georgia,serif', fontSize: 50, color: C.gold }}>
              {score}<span className="font-normal" style={{ fontSize: 20, color: C.dimmer }}>/{questions.length}</span>
            </div>
            <div className="mt-[4px] mb-[16px]" style={{ fontSize: 12, color: C.dim }}>
              正解率 {pct}%　|　合格ライン {threshold}問
            </div>

            {/* Answer dots */}
            <div className="flex justify-center gap-[4px] flex-wrap">
              {answers.map((ok, i) => {
                const qq = questions[i];
                return (
                  <div key={i} className="w-[22px] h-[22px] rounded-full font-bold flex items-center justify-center" style={{
                    fontSize: 9,
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
            <div className="flex justify-center gap-[20px] mt-[14px] pt-[12px]" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {(['winners', 'legends'] as const).map(genre => {
                const g  = GENRE_CONFIG[genre];
                const qs = questions.filter(qq => qq.genre === genre);
                const ok = qs.reduce((acc, qq, i) => {
                  const idx = questions.indexOf(qq);
                  return acc + (answers[idx] ? 1 : 0);
                }, 0);
                return (
                  <div key={genre} className="text-center">
                    <g.Icon size={11} color={g.color} className="mt-0 mx-auto mb-[2px]" />
                    <div className="font-bold" style={{ fontSize: 10, color: g.color }}>{g.label}</div>
                    <div className="font-bold" style={{ fontSize: 13, color: C.white }}>{ok}/{qs.length}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 偏差値ゲージ */}
          <div className="rounded-[20px] px-[22px] py-[20px] mb-[12px]" style={{
            background: 'linear-gradient(160deg,#0d1a30 0%,#0F1E35 100%)',
            border: `2px solid ${hColor}40`,
            boxShadow: `0 0 24px ${hColor}18`,
          }}>
            <div className="flex items-baseline justify-between mb-[12px]">
              <span className="tracking-[0.15em]" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>CL偏差値</span>
              <div className="flex items-baseline gap-[4px]">
                <span className="font-black leading-none" style={{ fontFamily: 'Georgia,serif', fontSize: 52, color: hColor }}>{hensachi}</span>
                <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.2)' }}>/100</span>
              </div>
            </div>

            {/* Gauge bar */}
            <div className="w-full h-[14px] rounded-[7px] overflow-hidden mb-[6px]" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}>
              <div className="h-full rounded-[7px]" style={{
                width: `${hensachi}%`,
                background: 'linear-gradient(90deg,#F87171 0%,#FBBF24 40%,#D4AF37 68%,#F0D060 100%)',
                transition: 'width 1s ease-out',
              }} />
            </div>
            <div className="flex justify-between">
              {['初心者', '普通', '上級', '銀河系', '伝説'].map(l => (
                <span key={l} style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{l}</span>
              ))}
            </div>

            {/* Share prompt */}
            <div className="mt-[14px] px-[14px] py-[10px] rounded-[10px] text-center" style={{
              backgroundColor: `${hColor}14`, border: `1px solid ${hColor}35`,
            }}>
              <span className="font-bold" style={{ fontSize: 13, color: hColor }}>
                俺のCL偏差値は{hensachi}。これを超えられる奴いる？💪
              </span>
            </div>
          </div>

          {/* Ranking submit */}
          <div className="rounded-[14px] px-[16px] py-[14px] mb-[12px]" style={{ backgroundColor: C.navyCard, border: `1px solid ${C.navyBorder}` }}>
            <div className="flex items-center gap-[6px] mb-[10px]">
              <Medal size={13} color={C.gold} />
              <span className="font-bold tracking-[0.12em] uppercase" style={{ fontSize: 10, color: C.dimmer }}>ランキングに登録</span>
            </div>
            <div className="flex gap-[8px]">
              <input type="text" value={nickname} onChange={e => setNickname(e.target.value)}
                placeholder="ニックネーム（最大20文字）" maxLength={20}
                className="flex-1 rounded-[8px] px-[12px] py-[8px]"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: C.white, fontSize: 12, outline: 'none' }}
              />
              <button onClick={handleSubmitRanking} disabled={!nickname.trim() || submitted || loading}
                className="px-[16px] py-[8px] rounded-[8px] cursor-pointer font-bold whitespace-nowrap"
                style={{ border: 'none', background: `linear-gradient(135deg, ${C.gold}, #A07D10)`, color: '#000', fontSize: 11, opacity: (!nickname.trim() || submitted || loading) ? 0.4 : 1 }}
              >
                {loading ? '...' : submitted ? '登録済み' : '登録'}
              </button>
            </div>
            {error && <p className="mt-[6px]" style={{ color: C.red, fontSize: 10 }}>{error}</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-[10px] mb-[10px]">
            <button onClick={handleShareX} className="flex-1 py-[12px] px-0 rounded-[12px] font-bold cursor-pointer flex items-center justify-center gap-[6px]" style={{ border: '1px solid rgba(255,255,255,0.18)', backgroundColor: '#000', color: C.white, fontSize: 12 }}>
              <Share2 size={14} />Xにシェア
            </button>
            <button onClick={() => setPhase('ranking')} className="flex-1 py-[12px] px-0 rounded-[12px] font-bold cursor-pointer flex items-center justify-center gap-[6px]" style={{ border: 'rgba(212,175,55,0.4) solid 1px', backgroundColor: 'rgba(212,175,55,0.08)', color: C.gold, fontSize: 12 }}>
              <Trophy size={14} />ランキング
            </button>
          </div>
          <button onClick={handleRestart} className="w-full py-[11px] px-0 rounded-[12px] cursor-pointer flex items-center justify-center gap-[6px]" style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'transparent', color: C.dimmer, fontSize: 12 }}>
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
    <div className={SCREEN_WRAP} style={{ backgroundColor: C.navy }}>
      <div className="max-w-[440px] w-full" style={{ animation: 'slideUp 0.3s ease-out' }}>
        <div className="text-center mb-[20px]">
          <Trophy size={26} color={C.gold} className="mt-0 mx-auto mb-[8px]" />
          <h2 className="font-bold mb-[4px]" style={{ fontFamily: 'Georgia,serif', fontSize: 17, color: C.white }}>ランキング</h2>
          <p style={{ fontSize: 10, color: C.dimmer }}>マドリー 経歴クイズ</p>
        </div>

        <div className="rounded-[16px] overflow-hidden mb-[14px]" style={{ backgroundColor: C.navyCard, border: `1px solid ${C.navyBorder}` }}>
          {rankings.length === 0
            ? <div className="px-[16px] py-[32px] text-center" style={{ color: C.dimmer, fontSize: 12 }}>まだ登録者がいません</div>
            : rankings.map((entry, i) => {
              const r   = getRankLabel(i);
              const t   = getTitle(entry.score);
              const pct = Math.round((entry.score / entry.total) * 100);
              const lv  = LV_CONFIG[(entry.level ?? 1) as 1 | 2 | 3] ?? LV_CONFIG[1];
              return (
                <div key={entry.id} className="flex items-center gap-[12px] px-[16px] py-[12px]" style={{
                  borderBottom: i < rankings.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  backgroundColor: i === 0 ? 'rgba(212,175,55,0.07)' : 'transparent',
                }}>
                  <span className="w-[30px] text-center shrink-0" style={{ fontSize: i < 3 ? 18 : 11, color: r.color }}>{r.label}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-[6px]">
                      <span className="font-bold overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: 12, color: C.white }}>{entry.nickname}</span>
                      <span className="font-bold rounded-[5px] px-[5px] py-[1px] shrink-0" style={{ fontSize: 8, color: lv.color, backgroundColor: lv.bg, border: `1px solid ${lv.border}` }}>
                        LV.{entry.level ?? 1}
                      </span>
                    </div>
                    <div className="mt-[1px]" style={{ fontSize: 9, color: C.dimmer }}>{t.emoji} {t.title} · {entry.score}/{entry.total}問 ({pct}%)</div>
                  </div>
                  <div className="font-black shrink-0" style={{ fontFamily: 'Georgia,serif', fontSize: 22, color: C.gold }}>{entry.points ?? entry.score}</div>
                </div>
              );
            })
          }
        </div>

        <div className="flex gap-[10px]">
          <button onClick={handleShareX} className="flex-1 py-[12px] px-0 rounded-[12px] font-bold cursor-pointer flex items-center justify-center gap-[6px]" style={{ border: '1px solid rgba(255,255,255,0.18)', backgroundColor: '#000', color: C.white, fontSize: 12 }}>
            <Share2 size={14} />Xにシェア
          </button>
          <button onClick={handleRestart} className="flex-1 py-[12px] px-0 rounded-[12px] font-bold cursor-pointer flex items-center justify-center gap-[6px]" style={{ border: 'none', background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 50%, #A07D10 100%)`, color: '#000', fontSize: 12, boxShadow: '0 0 18px rgba(212,175,55,0.25)' }}>
            <RotateCcw size={12} />もう一度
          </button>
        </div>

        <div className="text-center mt-[14px]">
          <a href="/tool" className="no-underline" style={{ fontSize: 11, color: C.dimmer }}>← ベストイレブンメーカーに戻る</a>
        </div>
      </div>
    </div>
  );

  return null;
}
