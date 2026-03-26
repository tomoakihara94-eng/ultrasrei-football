'use client';

import { useState, useMemo, useEffect } from 'react';
import { Share2, Download, Trophy, Shield, Sparkles, Zap, BarChart2, X, Link2, Copy, Check } from 'lucide-react';
import type { Player, Formation, Position } from '@/types';
import { formations } from '@/lib/formations';
import { MANAGER_STYLES, type ManagerStyle } from '@/lib/managerStyles';
import TacticalBoard from '@/components/TacticalBoard';
import PlayerForm from '@/components/PlayerForm';
import FormationSelector from '@/components/FormationSelector';
import BenchSection from '@/components/BenchSection';
import HexChart from '@/components/HexChart';
import TeamAnalysis from '@/components/TeamAnalysis';
import ManagerPanel from '@/components/ManagerPanel';
import VisitorCounter from '@/components/VisitorCounter';

const BENCH_SIZE = 5;

export default function Home() {
  const [teamName, setTeamName] = useState('');
  const [formation, setFormation] = useState<Formation>('4-3-3');
  const [starters, setStarters] = useState<(Player | null)[]>(Array(11).fill(null));
  const [bench, setBench] = useState<(Player | null)[]>(Array(BENCH_SIZE).fill(null));
  const [editing, setEditing] = useState<{ type: 'starter' | 'bench'; index: number } | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [rightTab, setRightTab] = useState<'roster' | 'analysis'>('roster');
  const [managerStyle, setManagerStyle] = useState<ManagerStyle | null>(null);
  const [shareHint, setShareHint] = useState(false);
  const [freeMode, setFreeMode] = useState(false);
  const [customPositions, setCustomPositions] = useState<Record<number, { x: number; y: number }>>({});
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);

  const slots = formations[formation];

  // Auto-dismiss share hint
  useEffect(() => {
    if (!shareHint) return;
    const t = setTimeout(() => setShareHint(false), 6000);
    return () => clearTimeout(t);
  }, [shareHint]);

  function openStarter(i: number) {
    setEditing({ type: 'starter', index: i });
    setSelectedPlayer(starters[i] ?? null);
  }

  function openBench(i: number) {
    setEditing({ type: 'bench', index: i });
    setSelectedPlayer(bench[i] ?? null);
  }

  function handleSave(player: Player) {
    if (!editing) return;
    if (editing.type === 'starter') {
      setStarters((prev) => { const next = [...prev]; next[editing.index] = player; return next; });
    } else {
      setBench((prev) => { const next = [...prev]; next[editing.index] = player; return next; });
    }
    setEditing(null);
  }

  function handleRemove() {
    if (!editing) return;
    if (editing.type === 'starter') {
      setStarters((prev) => { const next = [...prev]; next[editing.index] = null; return next; });
      setCustomPositions((prev) => { const next = { ...prev }; delete next[editing.index]; return next; });
    } else {
      setBench((prev) => { const next = [...prev]; next[editing.index] = null; return next; });
    }
    setEditing(null);
  }

  function handleSwap(i: number, j: number) {
    setStarters((prev) => {
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setCustomPositions((prev) => {
      const next = { ...prev };
      const pi = next[i];
      const pj = next[j];
      if (pi !== undefined) next[j] = pi; else delete next[j];
      if (pj !== undefined) next[i] = pj; else delete next[i];
      return next;
    });
  }

  function handlePositionChange(index: number, x: number, y: number) {
    setCustomPositions((prev) => ({ ...prev, [index]: { x, y } }));
  }

  function handleFreeModeToggle(free: boolean) {
    setFreeMode(free);
    if (!free) setCustomPositions({});
  }

  async function handleSave_() {
    const { toPng } = await import('html-to-image');
    const node = document.getElementById('export-area');
    if (!node) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `best-eleven-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsExporting(false);
    }
  }

  async function handlePublish() {
    setIsPublishing(true);
    try {
      const res = await fetch('/api/formations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team_name: teamName || null,
          formation,
          players: starters,
          bench,
          manager_style: managerStyle?.id ?? null,
          custom_positions: freeMode ? customPositions : {},
        }),
      });
      if (!res.ok) throw new Error('Failed');
      const { id } = await res.json();
      setPublishedUrl(`${window.location.origin}/formation/${id}`);
    } catch {
      alert('保存に失敗しました。Supabaseの設定を確認してください。');
    } finally {
      setIsPublishing(false);
    }
  }

  async function handleCopyUrl() {
    if (!publishedUrl) return;
    await navigator.clipboard.writeText(publishedUrl);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  }

  async function handleShareX() {
    const { toPng } = await import('html-to-image');
    const node = document.getElementById('export-area');
    if (!node) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2 });

      // Try Web Share API (works on mobile/modern browsers with image support)
      try {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'best-eleven.png', { type: 'image/png' });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: teamName || '歴代ベストイレブン',
            text: '#ベストイレブンメーカー #欧州サッカー',
          });
          return;
        }
      } catch { /* fall through to manual flow */ }

      // Fallback: download image + open tweet
      const link = document.createElement('a');
      link.download = `best-eleven-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      setShareHint(true);
      const text = `${teamName || '歴代最強イレブン'} #ベストイレブンメーカー #欧州サッカー`;
      setTimeout(() => {
        window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
      }, 700);
    } finally {
      setIsExporting(false);
    }
  }

  const starterCount = starters.filter(Boolean).length;

  const overallAvg = useMemo(() => {
    const all = starters.filter(Boolean) as Player[];
    if (all.length === 0) return 0;
    const sum = all.reduce((acc, p) => {
      const vals = Object.values(p.stats);
      return acc + vals.reduce((a, b) => a + b, 0) / vals.length;
    }, 0);
    return Math.round(sum / all.length);
  }, [starters]);

  const chemistryPairs = useMemo<[number, number][]>(() => {
    const pairs: [number, number][] = [];
    for (let i = 0; i < starters.length; i++) {
      for (let j = i + 1; j < starters.length; j++) {
        const a = starters[i];
        const b = starters[j];
        if (!a || !b) continue;
        const sameNat  = a.nationality && b.nationality && a.nationality === b.nationality;
        const sameClub = a.club && b.club && a.club.trim().toLowerCase() === b.club.trim().toLowerCase();
        if (sameNat || sameClub) pairs.push([i, j]);
      }
    }
    return pairs;
  }, [starters]);

  const chemistryBonus = chemistryPairs.length;
  const totalScore = overallAvg > 0 ? Math.min(99, overallAvg + chemistryBonus) : 0;

  return (
    <div className="min-h-screen bg-luxury-black flex flex-col">

      {/* ===== HEADER ===== */}
      <header className="border-b border-white/5 px-6 py-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trophy size={22} className="text-gold" />
            <h1 className="font-display text-lg font-bold tracking-wider shimmer-text">
              欧州サッカー 歴代ベストイレブンメーカー
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/blog"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-bold tracking-wide transition-all"
            >
              コラム
            </a>
            <button
              onClick={handlePublish}
              disabled={isPublishing || starters.filter(Boolean).length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#60a5fa]/50 text-[#60a5fa] hover:bg-[#60a5fa]/10 text-xs font-bold transition-all disabled:opacity-30"
            >
              <Link2 size={13} />
              {isPublishing ? '発行中...' : 'URLを発行'}
            </button>
            <button
              onClick={handleSave_}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-xs transition-all"
            >
              <Download size={13} />
              保存
            </button>
            <button
              onClick={handleShareX}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gold-gradient text-black font-bold text-xs tracking-wider hover:shadow-gold transition-all disabled:opacity-50"
            >
              <Share2 size={13} />
              Xにシェア
            </button>
          </div>
        </div>
      </header>

      {/* ===== Share Hint Toast ===== */}
      {shareHint && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-luxury-card border border-gold/30 shadow-gold text-sm">
            <Share2 size={14} className="text-gold shrink-0" />
            <span className="text-white/80">
              画像を保存しました。Xに投稿する際は<strong className="text-gold">手動で画像を添付</strong>してください。
            </span>
            <button onClick={() => setShareHint(false)} className="text-white/30 hover:text-white ml-1">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ===== Published URL panel ===== */}
      {publishedUrl && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up w-[calc(100vw-2rem)] max-w-md">
          <div className="flex flex-col gap-2 px-4 py-3 rounded-xl bg-[#0f0f0f] border border-[#60a5fa]/40 shadow-lg text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link2 size={13} className="text-[#60a5fa] shrink-0" />
                <span className="text-white/70 text-xs font-bold">URLを発行しました</span>
              </div>
              <button onClick={() => setPublishedUrl(null)} className="text-white/30 hover:text-white">
                <X size={14} />
              </button>
            </div>
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5">
              <span className="text-[11px] text-white/50 truncate flex-1">{publishedUrl}</span>
              <button
                onClick={handleCopyUrl}
                className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-[#60a5fa] hover:text-white transition-colors"
              >
                {urlCopied ? <Check size={11} /> : <Copy size={11} />}
                {urlCopied ? 'コピー済み' : 'コピー'}
              </button>
            </div>
            <a
              href={publishedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-center text-[#60a5fa] hover:underline"
            >
              ページを開く →
            </a>
          </div>
        </div>
      )}

      {/* ===== MAIN ===== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">

        {/* ---- LEFT panel ---- */}
        <aside className="lg:w-72 flex-shrink-0 space-y-4">

          {/* team name */}
          <div className="bg-luxury-card border border-white/8 rounded-xl p-4">
            <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">チーム名</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="例: 歴代マドリー最強イレブン"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/60 transition-colors text-sm"
            />
          </div>

          {/* formation */}
          <div className="bg-luxury-card border border-white/8 rounded-xl p-4">
            <FormationSelector current={formation} onChange={(f) => { setFormation(f); setCustomPositions({}); }} />
          </div>

          {/* manager panel */}
          <ManagerPanel
            selected={managerStyle}
            onSelect={setManagerStyle}
            formation={formation}
            totalScore={totalScore}
          />

          {/* squad stats */}
          <div className="bg-luxury-card border border-white/8 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-white/40 uppercase tracking-widest">Squad</span>
              <span className="text-xs text-gold font-bold">{starterCount}/11</span>
            </div>
            {overallAvg > 0 && (
              <div className="text-center">
                <div className="text-3xl font-black text-gold font-display">{totalScore}</div>
                <div className="text-xs text-white/30 mt-0.5">チーム総合値</div>
                {chemistryBonus > 0 && (
                  <div className="text-xs text-gold/50 mt-0.5">Base: {overallAvg}</div>
                )}
              </div>
            )}
            {chemistryBonus > 0 && (
              <div className="mt-3 text-center">
                <div className="chemistry-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/40">
                  <Sparkles size={11} className="text-gold animate-pulse" />
                  <span className="shimmer-text text-xs font-black tracking-widest">
                    +{chemistryBonus} Chemistry Bonus!
                  </span>
                  <Sparkles size={11} className="text-gold animate-pulse" />
                </div>
              </div>
            )}
            {starterCount === 0 && (
              <p className="text-xs text-white/25 text-center">フィールドの＋をクリックして選手を追加</p>
            )}
          </div>

          {/* selected player detail */}
          {selectedPlayer && (
            <div className="bg-luxury-card border border-gold/20 rounded-xl p-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{selectedPlayer.flagEmoji}</span>
                <div>
                  <div className="text-sm font-bold text-white">{selectedPlayer.name}</div>
                  <div className="text-xs text-gold">{selectedPlayer.position} #{selectedPlayer.number}</div>
                </div>
              </div>
              <HexChart stats={selectedPlayer.stats} size={220} position={selectedPlayer.position} />
            </div>
          )}
        </aside>

        {/* ---- CENTER: tactical board ---- */}
        <div className="flex-1 max-w-lg mx-auto lg:mx-0">
          <div
            id="export-area"
            className="bg-luxury-black rounded-2xl overflow-hidden border border-white/8"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            <div className="bg-gradient-to-r from-black via-luxury-card to-black px-6 py-4 border-b border-gold/20">
              <div className="text-center">
                <div className="text-xs text-gold/60 uppercase tracking-[0.3em] mb-1">Best XI</div>
                <div className="text-xl font-black text-white font-display tracking-wider">
                  {teamName || '歴代ベストイレブン'}
                </div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-xs text-white/30">{formation}</span>
                  {managerStyle && (
                    <span className="text-xs text-gold/50">{managerStyle.emoji} {managerStyle.name}</span>
                  )}
                </div>
              </div>
            </div>

            {/* mode toggle + hint */}
            <div className="px-4 pt-3 pb-1 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => handleFreeModeToggle(false)}
                  className={`px-3 py-1 rounded-md text-xs font-bold tracking-wide transition-all ${
                    !freeMode
                      ? 'bg-[#D4AF37] text-black shadow-sm'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  グリッド
                </button>
                <button
                  onClick={() => handleFreeModeToggle(true)}
                  className={`px-3 py-1 rounded-md text-xs font-bold tracking-wide transition-all ${
                    freeMode
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  フリー
                </button>
              </div>
              <div className="flex items-center gap-2">
                {freeMode && Object.keys(customPositions).length > 0 && (
                  <button
                    onClick={() => setCustomPositions({})}
                    className="text-[10px] text-white/30 hover:text-white/60 border border-white/15 hover:border-white/30 px-2 py-0.5 rounded transition-all"
                  >
                    リセット
                  </button>
                )}
                <span className="text-[10px] text-white/25">
                  {freeMode ? 'ドラッグで自由配置' : 'D&Dで並び替え'}
                </span>
              </div>
            </div>

            <div className="px-3 py-3">
              <TacticalBoard
                players={starters}
                formation={formation}
                onSlotClick={openStarter}
                onSwap={handleSwap}
                onPositionChange={handlePositionChange}
                chemistryPairs={chemistryPairs}
                freeMode={freeMode}
                customPositions={customPositions}
              />
            </div>
            <div className="px-4 pb-4">
              <BenchSection benchPlayers={bench} onSlotClick={openBench} />
            </div>
            <div className="border-t border-white/5 px-4 py-2 flex justify-between items-center">
              <span className="text-[9px] text-white/20 uppercase tracking-widest">非公式ファン考察ツール</span>
              <span className="text-[9px] text-gold/30 font-bold tracking-widest">BEST ELEVEN MAKER</span>
            </div>
          </div>
        </div>

        {/* ---- RIGHT: roster / analysis tabs ---- */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-luxury-card border border-white/8 rounded-xl p-4">

            {/* tab switcher */}
            <div className="flex gap-1.5 mb-4">
              <button
                onClick={() => setRightTab('roster')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  rightTab === 'roster'
                    ? 'bg-gold/15 text-gold border border-gold/30'
                    : 'text-white/30 hover:text-white/50 border border-transparent'
                }`}
              >
                ロスター
              </button>
              <button
                onClick={() => setRightTab('analysis')}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  rightTab === 'analysis'
                    ? 'bg-gold/15 text-gold border border-gold/30'
                    : 'text-white/30 hover:text-white/50 border border-transparent'
                }`}
              >
                <BarChart2 size={11} />
                チーム分析
              </button>
            </div>

            {/* ---- roster tab ---- */}
            {rightTab === 'roster' && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs text-white/40 uppercase tracking-widest">スターター</h3>
                  {chemistryBonus > 0 && (
                    <div className="flex items-center gap-1">
                      <Zap size={10} className="text-gold" />
                      <span className="text-[10px] font-bold text-gold">{chemistryBonus} links</span>
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  {starters.map((p, i) => {
                    const slot = slots[i];
                    const hasChemistry = chemistryPairs.some(([a, b]) => a === i || b === i);
                    return (
                      <button
                        key={i}
                        onClick={() => openStarter(i)}
                        className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-all ${
                          p && hasChemistry
                            ? 'bg-gold/10 border border-gold/30 hover:border-gold/50'
                            : p
                            ? 'bg-white/5 hover:bg-gold/10 border border-transparent hover:border-gold/20'
                            : 'border border-dashed border-white/10 hover:border-gold/30 hover:bg-gold/5'
                        }`}
                      >
                        <span className="text-[10px] font-bold text-gold/60 w-8 text-center shrink-0">
                          {slot.position}
                        </span>
                        {p ? (
                          <>
                            <span className="text-base">{p.flagEmoji}</span>
                            <div className="min-w-0">
                              <div className="text-xs text-white font-semibold truncate">{p.name}</div>
                              <div className="text-[10px] text-white/30 truncate">{p.club || `#${p.number}`}</div>
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                              {hasChemistry && <Zap size={9} className="text-gold" />}
                              <span className="text-[10px] font-bold text-gold/70">
                                {Math.round(Object.values(p.stats).reduce((a, b) => a + b, 0) / 6)}
                              </span>
                            </div>
                          </>
                        ) : (
                          <span className="text-xs text-white/20">空き枠</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <h3 className="text-xs text-white/40 uppercase tracking-widest mt-4 mb-3">ベンチ</h3>
                <div className="space-y-1.5">
                  {bench.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => openBench(i)}
                      className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-all ${
                        p
                          ? 'bg-white/5 hover:bg-gold/10 border border-transparent'
                          : 'border border-dashed border-white/8 hover:border-gold/20'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-white/20 w-8 text-center">SUB</span>
                      {p ? (
                        <>
                          <span className="text-base">{p.flagEmoji}</span>
                          <div className="min-w-0">
                            <div className="text-xs text-white font-semibold truncate">{p.name}</div>
                            <div className="text-[10px] text-white/30">{p.position} #{p.number}</div>
                          </div>
                        </>
                      ) : (
                        <span className="text-xs text-white/20">空き枠</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ---- analysis tab ---- */}
            {rightTab === 'analysis' && (
              <TeamAnalysis
                players={starters}
                chemistryPairs={chemistryPairs}
                totalScore={totalScore}
                managerStyle={managerStyle}
              />
            )}
          </div>
        </aside>
      </main>

      {/* ===== FOOTER — 免責事項 ===== */}
      <footer className="border-t border-white/8 bg-luxury-card mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Access Counter */}
          <div className="flex items-center justify-between mb-6 px-1">
            <span className="text-[10px] text-white/20 uppercase tracking-widest">アクセス数</span>
            <VisitorCounter />
          </div>
          <div className="bg-black/40 border border-white/8 rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Shield size={16} className="text-white/40" />
              <h2 className="text-sm font-bold text-white/50 uppercase tracking-widest">
                免責事項・著作権について / Disclaimer
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 pb-1 border-b border-white/8">非公式コンテンツについて</h3>
                <p className="text-xs text-white/30 leading-relaxed">
                  本サービス「欧州サッカー 歴代ベストイレブンメーカー」は、サッカーファンが個人で制作した
                  <strong className="text-white/50">非公式の考察・分析ツール</strong>です。
                  UEFA・FIFA・各国サッカー協会・プロサッカークラブ・選手本人またはその代理人・関係機関とは
                  <strong className="text-white/50">一切の公式な関係を持ちません</strong>。
                  本サービスはいかなる公式ライセンスも取得していません。
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 pb-1 border-b border-white/8">AI生成コンテンツについて</h3>
                <p className="text-xs text-white/30 leading-relaxed">
                  選手の能力値・評価・チーム分析・監督タイプ診断はすべてAI（Claude by Anthropic）による
                  <strong className="text-white/50">推定・考察であり、実際の能力・成績・市場価値を保証・証明するものではありません</strong>。
                  監督タイプはすべて架空のキャラクターであり、実在の人物とは一切関係ありません。
                  すべての数値・評価はエンターテインメント・ファン考察目的のものです。
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 pb-1 border-b border-white/8">著作権・商標権について</h3>
                <p className="text-xs text-white/30 leading-relaxed">
                  本サービスで使用する選手名・クラブ名・国名・国旗等は
                  <strong className="text-white/50">識別・考察目的のみ</strong>
                  に使用しており、各権利者の著作権・商標権・肖像権は各権利者に帰属します。
                  営利目的での権利侵害は意図していません。
                  権利侵害のご指摘がある場合は速やかに対応いたします。
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2 pb-1 border-b border-white/8">お問い合わせ</h3>
                <p className="text-xs text-white/30 leading-relaxed">
                  コンテンツの削除要請・権利侵害のご連絡・その他のお問い合わせは下記までご連絡ください。
                  内容確認次第、速やかに対応いたします。
                </p>
                <p className="text-xs text-white/50 mt-2 font-mono">ren90no@hotmail.co.jp</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] text-white/15">
            <p>© 2024 欧州サッカー 歴代ベストイレブンメーカー — 非公式ファン考察ツール。All trademarks and copyrights belong to their respective owners.</p>
            <div className="flex items-center gap-4 shrink-0">
              <a href="/blog" className="text-white/30 hover:text-gold transition-colors">コラム</a>
              <a href="/about" className="text-white/30 hover:text-gold transition-colors">運営者情報</a>
              <p>Powered by Claude AI (Anthropic) | 個人制作・非商用</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== player form modal ===== */}
      {editing !== null && (
        <PlayerForm
          slot={
            editing.type === 'starter'
              ? { position: slots[editing.index].position as Position, index: editing.index }
              : { position: 'ST', index: editing.index }
          }
          existingPlayer={
            editing.type === 'starter'
              ? (starters[editing.index] ?? null)
              : (bench[editing.index] ?? null)
          }
          onSave={handleSave}
          onClose={() => setEditing(null)}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
}
