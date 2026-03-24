'use client';

import { useMemo } from 'react';
import { TrendingUp, Shield, Brain, Zap, Users, Award } from 'lucide-react';
import type { Player } from '@/types';
import type { ManagerStyle } from '@/lib/managerStyles';

interface TeamAnalysisProps {
  players: (Player | null)[];
  chemistryPairs: [number, number][];
  totalScore: number;
  managerStyle: ManagerStyle | null;
}

function gradeLabel(score: number) {
  if (score >= 90) return { label: 'S', color: 'text-gold' };
  if (score >= 80) return { label: 'A', color: 'text-green-400' };
  if (score >= 70) return { label: 'B', color: 'text-blue-400' };
  if (score >= 60) return { label: 'C', color: 'text-yellow-500' };
  return { label: 'D', color: 'text-red-400' };
}

function barGradient(score: number) {
  if (score >= 88) return 'linear-gradient(90deg,#D4AF37,#F0D060)';
  if (score >= 75) return 'linear-gradient(90deg,#22c55e,#4ade80)';
  if (score >= 65) return 'linear-gradient(90deg,#3b82f6,#60a5fa)';
  if (score >= 55) return 'linear-gradient(90deg,#eab308,#facc15)';
  return 'linear-gradient(90deg,#ef4444,#f87171)';
}

function MetricRow({
  icon, label, labelEn, score, note, bonus,
}: {
  icon: React.ReactNode;
  label: string;
  labelEn: string;
  score: number;
  note: string;
  bonus: number;
}) {
  const clamped = Math.max(0, Math.min(99, score));
  const g = gradeLabel(clamped);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-white/40">{icon}</span>
          <span className="text-xs font-bold text-white/75">{label}</span>
          <span className="text-[9px] text-white/25 uppercase tracking-wider">{labelEn}</span>
          {bonus !== 0 && (
            <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${bonus > 0 ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>
              {bonus > 0 ? '+' : ''}{bonus}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-black ${g.color}`}>{g.label}</span>
          <span className="text-[11px] text-white/40 font-mono w-6 text-right">{clamped}</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${clamped}%`, background: barGradient(clamped), transition: 'width 0.9s ease-out' }}
        />
      </div>
      <p className="text-[9px] text-white/25 leading-relaxed">{note}</p>
    </div>
  );
}

const TEAM_TYPES: {
  condition: (a: number, d: number, c: number, cr: number) => boolean;
  type: string;
  desc: string;
}[] = [
  { condition: (a, d, c) => a >= 84 && d >= 84 && c >= 50,  type: '完璧なドリームチーム',     desc: '攻守連携すべてが超一流。歴史に名を刻む最強の布陣。' },
  { condition: (a, d) => a >= 84 && d >= 84,                  type: '黄金世代イレブン',         desc: '攻守バランスが極めて高い。どの時代でも頂点を狙えるチーム。' },
  { condition: (a) => a >= 87,                                 type: '超攻撃特化型',             desc: '圧倒的な得点力が武器。前線の破壊力でゲームを制する。' },
  { condition: (_, d) => d >= 87,                              type: '鉄壁の守備陣',             desc: '堅守を軸にした難攻不落の布陣。守りで勝利を引き寄せる。' },
  { condition: (_, __, _c, cr) => cr >= 84,                   type: 'テクニカル・マスター',     desc: '高度なパスワークで相手を崩す芸術的サッカー。' },
  { condition: (_, __, c) => c >= 60,                          type: '絆のチーム',               desc: 'クラブ・国籍の絆が強く、連携で差をつける一体感あるチーム。' },
  { condition: (a, d) => a >= 75 && d >= 75,                  type: 'バランス型イレブン',       desc: '攻守バランスの取れた堅実なチーム。局面に応じた柔軟な対応が可能。' },
  { condition: () => true,                                     type: '育成中のチーム',           desc: 'AI査定を活用してさらに選手を強化すれば、より高い評価を得られます。' },
];

export default function TeamAnalysis({ players, chemistryPairs, totalScore, managerStyle }: TeamAnalysisProps) {
  const starters = players.filter(Boolean) as Player[];
  const mb = managerStyle?.bonus ?? { attack: 0, defense: 0, creativity: 0, physical: 0, chemistry: 0 };

  const metrics = useMemo(() => {
    if (starters.length === 0) return null;
    const avg = (key: keyof Player['stats']) =>
      Math.round(starters.reduce((s, p) => s + p.stats[key], 0) / starters.length);

    return {
      attack:     Math.round(avg('shooting') * 0.45 + avg('pace') * 0.25 + avg('dribbling') * 0.30) + mb.attack,
      defense:    Math.round(avg('defense')  * 0.60 + avg('physical') * 0.40) + mb.defense,
      creativity: Math.round(avg('passing')  * 0.60 + avg('dribbling') * 0.40) + mb.creativity,
      physical:   Math.round(avg('physical') * 0.50 + avg('pace') * 0.50) + mb.physical,
      chemistry:  Math.min(100, chemistryPairs.length * 12 + mb.chemistry),
    };
  }, [starters, chemistryPairs, mb]);

  const teamType = useMemo(() => {
    if (!metrics) return null;
    return TEAM_TYPES.find(({ condition }) =>
      condition(metrics.attack, metrics.defense, metrics.chemistry, metrics.creativity)
    )!;
  }, [metrics]);

  if (starters.length < 4) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
        <Award size={28} className="text-white/15" />
        <p className="text-xs text-white/25 leading-relaxed">
          4人以上の選手を登録すると<br />チーム分析が表示されます
        </p>
      </div>
    );
  }
  if (!metrics || !teamType) return null;

  const adjTotal = Math.min(99, totalScore + Math.max(0, mb.attack + mb.defense + mb.creativity + mb.physical) / 8 | 0);
  const totalGrade = gradeLabel(adjTotal);

  return (
    <div className="space-y-4">
      {/* team type badge */}
      <div className="px-3 py-3 rounded-xl bg-gold/8 border border-gold/25 text-center">
        <div className="text-[9px] text-gold/50 uppercase tracking-widest mb-1">チームタイプ</div>
        <div className="text-sm font-black text-gold leading-tight">{teamType.type}</div>
        <div className="text-[10px] text-white/35 mt-1.5 leading-relaxed">{teamType.desc}</div>
      </div>

      {/* overall */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[9px] text-white/30 uppercase tracking-wider">チーム総合評価</span>
        <div className="flex items-center gap-1.5">
          <span className={`text-sm font-black ${totalGrade.color}`}>{totalGrade.label}ランク</span>
          <span className="text-[10px] text-white/30">({adjTotal})</span>
        </div>
      </div>

      {/* manager notice */}
      {managerStyle && (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/3 border border-white/8">
          <span className="text-sm">{managerStyle.emoji}</span>
          <span className="text-[10px] text-white/40">{managerStyle.name}補正適用中</span>
        </div>
      )}

      {/* metric bars */}
      <div className="space-y-3.5">
        <MetricRow icon={<TrendingUp size={12} />} label="攻撃力"   labelEn="Attack"     score={metrics.attack}     bonus={mb.attack}     note="シュート(45%) + スピード(25%) + ドリブル(30%)" />
        <MetricRow icon={<Shield size={12} />}     label="守備力"   labelEn="Defense"    score={metrics.defense}    bonus={mb.defense}    note="守備(60%) + フィジカル(40%)" />
        <MetricRow icon={<Brain size={12} />}      label="創造力"   labelEn="Creativity" score={metrics.creativity} bonus={mb.creativity} note="パス(60%) + ドリブル(40%)" />
        <MetricRow icon={<Zap size={12} />}        label="フィジカル" labelEn="Physical"  score={metrics.physical}   bonus={mb.physical}   note="フィジカル(50%) + スピード(50%)" />
        <MetricRow icon={<Users size={12} />}      label="連携力"   labelEn="Chemistry"  score={metrics.chemistry}  bonus={mb.chemistry}  note={`同クラブ・同国籍ペア数から算出（${chemistryPairs.length}ペア検出）`} />
      </div>
    </div>
  );
}
