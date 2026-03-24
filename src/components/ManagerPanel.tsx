'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Brain, Loader2 } from 'lucide-react';
import { MANAGER_STYLES, BONUS_LABELS, type ManagerStyle } from '@/lib/managerStyles';

interface ManagerPanelProps {
  selected: ManagerStyle | null;
  onSelect: (style: ManagerStyle) => void;
  formation: string;
  totalScore: number;
}

export default function ManagerPanel({ selected, onSelect, formation, totalScore }: ManagerPanelProps) {
  const [open, setOpen] = useState(false);
  const [diagInput, setDiagInput] = useState('');
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagReason, setDiagReason] = useState('');
  const [diagError, setDiagError] = useState('');

  async function handleDiagnose() {
    if (!diagInput.trim()) return;
    setIsDiagnosing(true);
    setDiagReason('');
    setDiagError('');
    try {
      const res = await fetch('/api/manager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: diagInput, formation, totalScore }),
      });
      const data = await res.json();
      if (data.styleId) {
        const style = MANAGER_STYLES.find((s) => s.id === data.styleId);
        if (style) {
          onSelect(style);
          setDiagReason(data.reason ?? '');
          setOpen(false);
        }
      } else {
        setDiagError('診断に失敗しました');
      }
    } catch {
      setDiagError('通信エラーが発生しました');
    } finally {
      setIsDiagnosing(false);
    }
  }

  const positiveBonuses = selected
    ? (Object.entries(selected.bonus) as [keyof typeof BONUS_LABELS, number][]).filter(([, v]) => v > 0)
    : [];
  const negativeBonuses = selected
    ? (Object.entries(selected.bonus) as [keyof typeof BONUS_LABELS, number][]).filter(([, v]) => v < 0)
    : [];

  return (
    <div className="bg-luxury-card border border-white/8 rounded-xl p-4">
      {/* header row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{selected?.emoji ?? '🎩'}</span>
          <div className="text-left">
            <div className="text-[9px] text-white/25 uppercase tracking-widest">監督・戦術スタイル</div>
            <div className="text-xs font-bold text-white leading-tight">
              {selected?.name ?? '未設定 — クリックして選択'}
            </div>
          </div>
        </div>
        {open
          ? <ChevronUp size={13} className="text-white/30 group-hover:text-white/50" />
          : <ChevronDown size={13} className="text-white/30 group-hover:text-white/50" />}
      </button>

      {/* collapsed: show bonuses + reason */}
      {!open && selected && (
        <div className="mt-2 space-y-1.5">
          <div className="flex flex-wrap gap-1">
            {positiveBonuses.map(([key, val]) => (
              <span key={key} className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-green-500/10 text-green-400">
                +{val} {BONUS_LABELS[key]}
              </span>
            ))}
            {negativeBonuses.map(([key, val]) => (
              <span key={key} className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-red-500/10 text-red-400">
                {val} {BONUS_LABELS[key]}
              </span>
            ))}
          </div>
          {diagReason && (
            <p className="text-[10px] text-gold/50 italic leading-relaxed">{diagReason}</p>
          )}
        </div>
      )}

      {/* expanded panel */}
      {open && (
        <div className="mt-4 space-y-4 animate-fade-in">

          {/* AI diagnosis */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Brain size={12} className="text-gold" />
              <span className="text-[10px] text-gold/80 font-bold uppercase tracking-wider">AI監督診断</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={diagInput}
                onChange={(e) => setDiagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDiagnose()}
                placeholder="例: 守備を固めてカウンターで…"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button
                onClick={handleDiagnose}
                disabled={isDiagnosing || !diagInput.trim()}
                className="px-2.5 py-1.5 rounded-lg bg-gold/15 text-gold text-[10px] font-bold border border-gold/20 hover:bg-gold/25 transition-colors disabled:opacity-40 flex items-center gap-1"
              >
                {isDiagnosing ? <Loader2 size={11} className="animate-spin" /> : '診断'}
              </button>
            </div>
            {diagError && <p className="text-red-400 text-[10px]">{diagError}</p>}
          </div>

          <div className="border-t border-white/8 pt-3">
            <div className="text-[9px] text-white/25 uppercase tracking-widest mb-2">直接選択</div>
            <div className="grid grid-cols-2 gap-1.5">
              {MANAGER_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => { onSelect(style); setDiagReason(''); setOpen(false); }}
                  className={`flex flex-col items-start gap-0.5 p-2.5 rounded-lg border text-left transition-all ${
                    selected?.id === style.id
                      ? 'bg-gold/15 border-gold/40'
                      : 'bg-white/3 border-white/8 hover:bg-white/8 hover:border-white/15'
                  }`}
                >
                  <span className="text-lg leading-none">{style.emoji}</span>
                  <span className={`text-[10px] font-bold leading-tight mt-1 ${selected?.id === style.id ? 'text-gold' : 'text-white/70'}`}>
                    {style.name}
                  </span>
                  <span className="text-[9px] text-white/30">{style.keyword}</span>
                </button>
              ))}
            </div>
          </div>

          {/* current selection description */}
          {selected && (
            <div className="px-3 py-2 rounded-lg bg-white/3 border border-white/8 text-[10px] text-white/35 leading-relaxed animate-fade-in">
              {selected.desc}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
