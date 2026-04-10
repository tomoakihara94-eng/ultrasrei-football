'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

const POSITIONS = [
  { key: 'GK',  label: 'GK / ゴールキーパー' },
  { key: 'RB',  label: 'RB / 右サイドバック' },
  { key: 'CB',  label: 'CB / センターバック' },
  { key: 'LB',  label: 'LB / 左サイドバック' },
  { key: 'DM',  label: 'DM / ディフェンシブMF' },
  { key: 'CM',  label: 'CM / セントラルMF' },
  { key: 'CAM', label: 'CAM / 攻撃的MF' },
  { key: 'LW',  label: 'LW / 左ウイング' },
  { key: 'RW',  label: 'RW / 右ウイング' },
  { key: 'SS',  label: 'SS / セカンドトップ' },
  { key: 'ST',  label: 'ST / センターフォワード' },
];

type RankMap = { first: string; second: string; third: string };
type VoteState = Record<string, RankMap>;
type ResultEntry = { player: string; points: number; votes: number };
type ResultsMap = Record<string, ResultEntry[]>;

const RANK_LABELS = ['1位', '2位', '3位'] as const;
const RANK_COLORS = ['#D4AF37', '#A0A0A0', '#CD7F32'] as const;
const RANK_KEYS: (keyof RankMap)[] = ['first', 'second', 'third'];
const RANK_POINTS = [3, 2, 1];

function getVoterId(): string {
  const key = 'ube_voter_id';
  let id = localStorage.getItem(key);
  if (!id) { id = crypto.randomUUID(); localStorage.setItem(key, id); }
  return id;
}

function PlayerSearch({ posKey, vote, onSelect, onClear }: {
  posKey: string;
  vote: RankMap;
  onSelect: (posKey: string, rankKey: keyof RankMap, player: string) => void;
  onClear: (posKey: string, rankKey: keyof RankMap) => void;
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 1) { setSuggestions([]); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/vote/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      setSuggestions(data.players || []);
      setShowDropdown(true);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (val.trim().length === 0) { setSuggestions([]); setShowDropdown(false); return; }
    timerRef.current = setTimeout(() => search(val), 500);
  }

  function handleSelect(player: string) {
    // 既に選択済みの場合はスキップ
    if (Object.values(vote).includes(player)) return;
    // 空いている最初のランクに割り当て
    const emptyRank = RANK_KEYS.find(rk => !vote[rk]);
    if (emptyRank) onSelect(posKey, emptyRank, player);
    setQuery('');
    setSuggestions([]);
    setShowDropdown(false);
  }

  const selectedPlayers = Object.values(vote).filter(Boolean);
  const isFull = selectedPlayers.length >= 3;

  return (
    <div>
      {/* Rank slots */}
      <div className="flex gap-2 mb-4">
        {RANK_KEYS.map((rk, i) => (
          <div key={rk} className="flex-1 min-w-0">
            <p className="text-[10px] text-center mb-1" style={{ color: RANK_COLORS[i] }}>
              {RANK_LABELS[i]}（{RANK_POINTS[i]}pt）
            </p>
            <div
              className="h-9 rounded-lg border flex items-center justify-between px-2 text-xs transition-all"
              style={{
                borderColor: vote[rk] ? RANK_COLORS[i] + '80' : '#2a2a2a',
                background: vote[rk] ? RANK_COLORS[i] + '15' : '#151515',
              }}
            >
              <span className="truncate" style={{ color: vote[rk] ? '#fff' : '#444' }}>
                {vote[rk] || '未選択'}
              </span>
              {vote[rk] && (
                <button
                  onClick={() => onClear(posKey, rk)}
                  className="text-[#666] hover:text-white ml-1 shrink-0 text-base leading-none"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Search input */}
      {!isFull && (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInput}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            placeholder="選手名を入力して検索（例：カシージャス、Ronaldo）"
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
            style={{
              background: '#151515',
              border: '1px solid #2a2a2a',
              color: '#fff',
            }}
          />
          {loading && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#555]">検索中...</span>
          )}
          {showDropdown && suggestions.length > 0 && (
            <div
              className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-10"
              style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
            >
              {suggestions.map(player => {
                const alreadySelected = Object.values(vote).includes(player);
                return (
                  <button
                    key={player}
                    onMouseDown={() => handleSelect(player)}
                    disabled={alreadySelected}
                    className="w-full text-left px-4 py-2.5 text-sm transition-all hover:bg-[#2a2a2a] disabled:opacity-40"
                    style={{ color: alreadySelected ? '#555' : '#fff' }}
                  >
                    {player}
                    {alreadySelected && <span className="text-xs text-[#555] ml-2">選択済み</span>}
                  </button>
                );
              })}
            </div>
          )}
          {showDropdown && !loading && query.trim().length > 0 && suggestions.length === 0 && (
            <div
              className="absolute left-0 right-0 top-full mt-1 rounded-xl px-4 py-3 text-xs z-10"
              style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#555' }}
            >
              該当する選手が見つかりませんでした
            </div>
          )}
        </div>
      )}
      {isFull && (
        <p className="text-xs text-[#5CB85C] text-center py-1">3人選択完了 ✓</p>
      )}
    </div>
  );
}

export default function VotePage() {
  const [view, setView] = useState<'vote' | 'results'>('vote');
  const [votes, setVotes] = useState<VoteState>({});
  const [activePos, setActivePos] = useState(POSITIONS[0].key);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<ResultsMap | null>(null);
  const [totalVoters, setTotalVoters] = useState(0);
  const [loadingResults, setLoadingResults] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ube_votes');
    if (saved) setVotes(JSON.parse(saved));
    const done = localStorage.getItem('ube_submitted');
    if (done === 'true') setSubmitted(true);
  }, []);

  function selectPlayer(posKey: string, rankKey: keyof RankMap, player: string) {
    setVotes(prev => {
      const current = prev[posKey] || { first: '', second: '', third: '' };
      const cleared = { ...current };
      (Object.keys(cleared) as (keyof RankMap)[]).forEach(k => { if (cleared[k] === player) cleared[k] = ''; });
      cleared[rankKey] = player;
      const next = { ...prev, [posKey]: cleared };
      localStorage.setItem('ube_votes', JSON.stringify(next));
      return next;
    });
  }

  function clearRank(posKey: string, rankKey: keyof RankMap) {
    setVotes(prev => {
      const current = prev[posKey] || { first: '', second: '', third: '' };
      const next = { ...prev, [posKey]: { ...current, [rankKey]: '' } };
      localStorage.setItem('ube_votes', JSON.stringify(next));
      return next;
    });
  }

  const completedCount = POSITIONS.filter(p => {
    const v = votes[p.key];
    return v && v.first && v.second && v.third;
  }).length;

  const allComplete = completedCount === POSITIONS.length;

  async function handleSubmit() {
    if (!allComplete) return;
    setSubmitting(true);
    const voterId = getVoterId();
    try {
      await Promise.all(
        POSITIONS.map(p =>
          fetch('/api/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              voterId,
              position: p.key,
              firstPlace: votes[p.key].first,
              secondPlace: votes[p.key].second,
              thirdPlace: votes[p.key].third,
            }),
          })
        )
      );
      setSubmitted(true);
      localStorage.setItem('ube_submitted', 'true');
      await loadResults();
      setView('results');
    } catch {
      alert('送信に失敗しました。再度お試しください。');
    } finally {
      setSubmitting(false);
    }
  }

  async function loadResults() {
    setLoadingResults(true);
    try {
      const res = await fetch('/api/vote/results');
      const data = await res.json();
      setResults(data.results);
      setTotalVoters(data.totalVoters);
    } finally {
      setLoadingResults(false);
    }
  }

  useEffect(() => {
    if (view === 'results' && !results) loadResults();
  }, [view]);

  const currentVote = votes[activePos] || { first: '', second: '', third: '' };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            &larr; ツールに戻る
          </Link>
          <span className="text-xs text-[#555]">欧州サッカー歴代ベストイレブンメーカー</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-3">Community Vote</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
            歴代ベストイレブン投票
          </h1>
          <p className="text-[#888] text-sm max-w-xl mx-auto">
            各ポジションで好きな選手を検索して1〜3位にランク付け。投票がポイントに変換されてポジション別世界ランキングを決定します。
          </p>
        </div>

        <div className="flex gap-2 justify-center mb-8">
          <button
            onClick={() => setView('vote')}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all"
            style={{ background: view === 'vote' ? '#D4AF37' : '#1a1a1a', color: view === 'vote' ? '#000' : '#888' }}
          >
            投票する
          </button>
          <button
            onClick={() => { setView('results'); if (!results) loadResults(); }}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all"
            style={{ background: view === 'results' ? '#D4AF37' : '#1a1a1a', color: view === 'results' ? '#000' : '#888' }}
          >
            結果を見る
          </button>
        </div>

        {/* VOTE VIEW */}
        {view === 'vote' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Position list */}
            <div className="lg:w-56 shrink-0">
              <p className="text-xs text-[#555] mb-3 px-1">ポジション選択</p>
              <div className="flex lg:flex-col gap-1 flex-wrap lg:flex-nowrap">
                {POSITIONS.map(p => {
                  const v = votes[p.key];
                  const done = v && v.first && v.second && v.third;
                  return (
                    <button
                      key={p.key}
                      onClick={() => setActivePos(p.key)}
                      className="text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-2"
                      style={{
                        background: activePos === p.key ? '#1a1a1a' : 'transparent',
                        border: activePos === p.key ? '1px solid #D4AF37' : '1px solid #1e1e1e',
                        color: activePos === p.key ? '#fff' : '#666',
                      }}
                    >
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: done ? '#5CB85C' : '#333' }} />
                      {p.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 px-1">
                <div className="flex justify-between text-xs text-[#555] mb-1">
                  <span>完了</span>
                  <span>{completedCount} / {POSITIONS.length}</span>
                </div>
                <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(completedCount / POSITIONS.length) * 100}%`, background: '#D4AF37' }}
                  />
                </div>
              </div>
            </div>

            {/* Panel */}
            <div className="flex-1">
              <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-1">
                  {POSITIONS.find(p => p.key === activePos)?.label}
                </h2>
                <p className="text-xs text-[#555] mb-5">
                  このポジションの歴代最高選手を1位・2位・3位で選んでください
                </p>
                <PlayerSearch
                  posKey={activePos}
                  vote={currentVote}
                  onSelect={selectPlayer}
                  onClear={clearRank}
                />
                <div className="flex justify-between mt-6 pt-4 border-t border-[#1e1e1e]">
                  <button
                    onClick={() => {
                      const idx = POSITIONS.findIndex(p => p.key === activePos);
                      if (idx > 0) setActivePos(POSITIONS[idx - 1].key);
                    }}
                    disabled={POSITIONS[0].key === activePos}
                    className="text-xs text-[#666] hover:text-white transition-colors disabled:opacity-30"
                  >
                    &larr; 前のポジション
                  </button>
                  <button
                    onClick={() => {
                      const idx = POSITIONS.findIndex(p => p.key === activePos);
                      if (idx < POSITIONS.length - 1) setActivePos(POSITIONS[idx + 1].key);
                    }}
                    disabled={POSITIONS[POSITIONS.length - 1].key === activePos}
                    className="text-xs text-[#666] hover:text-white transition-colors disabled:opacity-30"
                  >
                    次のポジション &rarr;
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                {submitted ? (
                  <p className="text-[#5CB85C] text-sm">投票済みです。結果タブで確認できます。</p>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!allComplete || submitting}
                    className="px-8 py-3 rounded-full font-bold text-sm transition-all disabled:opacity-40"
                    style={{ background: allComplete ? '#D4AF37' : '#333', color: allComplete ? '#000' : '#666' }}
                  >
                    {submitting
                      ? '送信中...'
                      : allComplete
                      ? '投票を確定する'
                      : `あと${POSITIONS.length - completedCount}ポジション残っています`}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* RESULTS VIEW */}
        {view === 'results' && (
          <div>
            {loadingResults ? (
              <p className="text-center text-[#555] py-20">集計中...</p>
            ) : results ? (
              <>
                <p className="text-center text-xs text-[#555] mb-8">総投票者数: {totalVoters}人</p>
                <div className="space-y-8">
                  {POSITIONS.map(pos => {
                    const ranking = results[pos.key] || [];
                    if (ranking.length === 0) return (
                      <div key={pos.key} className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-[#D4AF37] mb-3">{pos.label}</h3>
                        <p className="text-xs text-[#444]">まだ投票がありません</p>
                      </div>
                    );
                    const maxPts = ranking[0]?.points || 1;
                    return (
                      <div key={pos.key} className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-[#D4AF37] mb-4">{pos.label}</h3>
                        <div className="space-y-2">
                          {ranking.slice(0, 10).map((entry, i) => {
                            const medal = i === 0 ? '#D4AF37' : i === 1 ? '#A0A0A0' : i === 2 ? '#CD7F32' : '#333';
                            return (
                              <div key={entry.player} className="flex items-center gap-3">
                                <span
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                                  style={{ background: medal, color: i < 3 ? '#000' : '#666' }}
                                >
                                  {i + 1}
                                </span>
                                <span className="text-sm w-44 shrink-0 truncate">{entry.player}</span>
                                <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                      width: `${(entry.points / maxPts) * 100}%`,
                                      background: i === 0 ? '#D4AF37' : i === 1 ? '#A0A0A0' : i === 2 ? '#CD7F32' : '#444',
                                    }}
                                  />
                                </div>
                                <span className="text-xs text-[#666] w-16 text-right shrink-0">
                                  {entry.points}pt ({entry.votes}票)
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center mt-8">
                  <button
                    onClick={loadResults}
                    className="text-xs text-[#666] hover:text-white transition-colors border border-[#2a2a2a] px-4 py-2 rounded-full"
                  >
                    最新の結果に更新
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-[#555] py-20">結果を読み込めませんでした</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
