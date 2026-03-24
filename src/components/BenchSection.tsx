'use client';

import type { Player, Position } from '@/types';

interface BenchSectionProps {
  benchPlayers: (Player | null)[];
  onSlotClick: (index: number) => void;
}

const BENCH_POSITIONS: Position[] = ['GK', 'CB', 'CM', 'ST', 'LW'];

export default function BenchSection({ benchPlayers, onSlotClick }: BenchSectionProps) {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-white/30 uppercase tracking-[0.2em]">Bench</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <div className="flex justify-center gap-3 flex-wrap">
        {benchPlayers.map((player, i) => {
          const pos = BENCH_POSITIONS[i] ?? 'SUB';
          return (
            <button
              key={i}
              onClick={() => onSlotClick(i)}
              className="group flex flex-col items-center gap-1"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                player
                  ? 'bg-white/10 border-white/30 group-hover:border-gold/60 group-hover:shadow-gold'
                  : 'border-dashed border-white/15 group-hover:border-gold/40 group-hover:bg-gold/5'
              }`}>
                {player ? (
                  <span className="text-white font-bold text-xs relative">
                    {player.number || player.position}
                    <span className="absolute -top-2 -right-2 text-sm">{player.flagEmoji}</span>
                  </span>
                ) : (
                  <span className="text-white/20 text-lg group-hover:text-gold/50">+</span>
                )}
              </div>
              <div className="text-[10px] text-center leading-tight">
                {player ? (
                  <>
                    <div className="text-white/70 font-semibold truncate max-w-[60px]">
                      {player.name.split(' ').slice(-1)[0]}
                    </div>
                    <div className="text-gold/60">{player.position}</div>
                  </>
                ) : (
                  <div className="text-white/25 group-hover:text-gold/40">{pos}</div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
