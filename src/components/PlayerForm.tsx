'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, Sparkles, Building2 } from 'lucide-react';
import type { Player, Position, EvaluateResponse } from '@/types';
import { countries } from '@/lib/countries';
import HexChart from './HexChart';

interface PlayerFormProps {
  slot: { position: Position; index: number } | null;
  existingPlayer: Player | null;
  onSave: (player: Player) => void;
  onClose: () => void;
  onRemove: () => void;
}

const POSITIONS: Position[] = [
  'GK', 'CB', 'LB', 'RB', 'LWB', 'RWB',
  'CDM', 'CM', 'CAM', 'LM', 'RM',
  'LW', 'RW', 'CF', 'ST',
];

const DEFAULT_STATS = { pace: 70, shooting: 70, passing: 70, dribbling: 70, defense: 70, physical: 70 };

export default function PlayerForm({ slot, existingPlayer, onSave, onClose, onRemove }: PlayerFormProps) {
  const [name, setName] = useState(existingPlayer?.name ?? '');
  const [nationalityCode, setNationalityCode] = useState(existingPlayer?.nationality ?? '');
  const [number, setNumber] = useState<string>(existingPlayer?.number?.toString() ?? '');
  const [position, setPosition] = useState<Position>(existingPlayer?.position ?? slot?.position ?? 'ST');
  const [stats, setStats] = useState(existingPlayer?.stats ?? DEFAULT_STATS);
  const [era, setEra] = useState(existingPlayer?.era ?? '');
  const [description, setDescription] = useState(existingPlayer?.description ?? '');
  const [club, setClub] = useState(existingPlayer?.club ?? '');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalError, setEvalError] = useState('');
  const [evaluated, setEvaluated] = useState(!!existingPlayer);

  useEffect(() => {
    if (slot?.position && !existingPlayer) setPosition(slot.position);
  }, [slot, existingPlayer]);

  const selectedCountry = countries.find((c) => c.code === nationalityCode);

  async function handleEvaluate() {
    if (!name || !nationalityCode) {
      setEvalError('選手名と国籍を入力してください');
      return;
    }
    setEvalError('');
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, nationality: selectedCountry?.name ?? nationalityCode }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data: EvaluateResponse = await res.json();
      setStats({
        pace:      data.pace,
        shooting:  data.shooting,
        passing:   data.passing,
        dribbling: data.dribbling,
        defense:   data.defense,
        physical:  data.physical,
      });
      if (data.position)    setPosition(data.position);
      if (data.era)         setEra(data.era);
      if (data.description) setDescription(data.description);
      if (data.club)        setClub(data.club);
      setEvaluated(true);
    } catch {
      setEvalError('AI査定に失敗しました。APIキーを確認してください。');
    } finally {
      setIsEvaluating(false);
    }
  }

  function handleSave() {
    if (!name || !nationalityCode) {
      setEvalError('選手名と国籍は必須です');
      return;
    }
    const player: Player = {
      id:          existingPlayer?.id ?? crypto.randomUUID(),
      name,
      nationality: nationalityCode,
      flagEmoji:   selectedCountry?.flag ?? '',
      club:        club || undefined,
      number:      parseInt(number, 10) || 0,
      comment:     existingPlayer?.comment ?? '',
      position,
      stats,
      era,
      description,
    };
    onSave(player);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-xl mx-4 bg-luxury-card border border-white/10 rounded-2xl shadow-2xl animate-slide-up overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white font-display tracking-wider">
            選手登録
            <span className="ml-2 text-xs text-gold font-body tracking-widest uppercase">
              {position}
            </span>
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* left: form */}
          <div className="flex-1 space-y-4">
            {/* name */}
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">選手名 *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setEvaluated(false); }}
                placeholder="例: Zinedine Zidane"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/60 transition-colors"
              />
            </div>

            {/* nationality */}
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">国籍 *</label>
              <select
                value={nationalityCode}
                onChange={(e) => setNationalityCode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gold/60 transition-colors appearance-none"
              >
                <option value="">-- 選択してください --</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>

            {/* number & position */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">背番号</label>
                <input
                  type="number"
                  min={1} max={99}
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="10"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/60 transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">ポジション</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value as Position)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gold/60 transition-colors appearance-none"
                >
                  {POSITIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* AI evaluate button */}
            <button
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gold-gradient text-black font-bold text-sm tracking-wider hover:shadow-gold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEvaluating ? (
                <><Loader2 size={16} className="animate-spin" /> AI査定中...</>
              ) : (
                <><Sparkles size={16} /> AI能力査定（クラブ自動判定）</>
              )}
            </button>

            {evalError && <p className="text-red-400 text-xs text-center">{evalError}</p>}

            {/* AI result info */}
            {evaluated && club && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gold/10 border border-gold/30 animate-fade-in">
                <Building2 size={13} className="text-gold shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gold truncate">{club}</div>
                  {era && <div className="text-[10px] text-white/40 truncate">{era}{description ? ` — ${description}` : ''}</div>}
                </div>
              </div>
            )}
          </div>

          {/* right: hex chart + aggregate stats */}
          <div className="flex flex-col items-center justify-center min-w-[175px]">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-3">能力値プレビュー</p>
            <HexChart stats={stats} size={175} position={position} />
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
          <button
            onClick={onRemove}
            className="text-xs text-red-400/60 hover:text-red-400 transition-colors underline underline-offset-2"
          >
            この枠をクリア
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-gold text-black font-bold text-sm tracking-wider hover:shadow-gold transition-all duration-200"
          >
            登録する
          </button>
        </div>
      </div>
    </div>
  );
}
