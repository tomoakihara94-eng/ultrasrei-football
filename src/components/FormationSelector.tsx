'use client';

import type { Formation } from '@/types';
import { formationLabels } from '@/lib/formations';

interface FormationSelectorProps {
  current: Formation;
  onChange: (f: Formation) => void;
}

const OPTIONS: Formation[] = ['4-3-3', '4-4-2', '4-2-3-1', '3-5-2', '3-4-3', '4-2-4', '3-2-2-3'];

export default function FormationSelector({ current, onChange }: FormationSelectorProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      <span className="text-xs text-white/40 uppercase tracking-widest mr-1">Formation</span>
      {OPTIONS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-3 py-1 rounded text-xs font-bold tracking-wider transition-all duration-200 border ${
            current === f
              ? 'bg-gold text-black border-gold shadow-gold'
              : 'bg-transparent text-white/60 border-white/20 hover:border-gold/50 hover:text-white'
          }`}
        >
          {formationLabels[f]}
        </button>
      ))}
    </div>
  );
}
