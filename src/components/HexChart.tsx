'use client';

import type { PlayerStats } from '@/types';
import type { Position } from '@/types';

interface HexChartProps {
  stats: PlayerStats;
  size?: number;
  position?: Position | string;
}

interface LabelDef {
  key: keyof PlayerStats;
  full: string;
  short: string;
}

function getLabels(position?: string): LabelDef[] {
  const pos = (position ?? '').toUpperCase();
  const isGK  = pos === 'GK';
  const isFW  = ['ST', 'CF', 'LW', 'RW'].includes(pos);
  const isCAM = pos === 'CAM';

  return [
    {
      key: 'pace',
      full:  isGK ? '反応速度'    : 'スピード',
      short: isGK ? 'REF'         : 'SPD',
    },
    {
      key: 'shooting',
      full:  isGK ? 'キック精度'  : isFW  ? '決定力'      : 'シュート',
      short: isGK ? 'KCK'         : isFW  ? 'FIN'          : 'SHT',
    },
    {
      key: 'dribbling',
      full:  isGK ? 'ボール捌き'  : isCAM ? 'テクニック'  : 'ドリブル',
      short: isGK ? 'HND'         : 'DRB',
    },
    {
      key: 'physical',
      full:  'フィジカル',
      short: 'PHY',
    },
    {
      key: 'defense',
      full:  isGK ? 'セービング'  : isFW ? 'プレス強度' : '守備',
      short: isGK ? 'SAV'         : isFW ? 'PRS'         : 'DEF',
    },
    {
      key: 'passing',
      full:  isGK ? '配球'        : 'パス',
      short: isGK ? 'DST'         : 'PAS',
    },
  ];
}

function hexPoints(cx: number, cy: number, r: number): [number, number][] {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as [number, number];
  });
}

function toPath(pts: [number, number][]) {
  return pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ') + ' Z';
}

export default function HexChart({ stats, size = 180, position }: HexChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR   = size * 0.34;
  const labelR = size * 0.475;

  const useFullLabel = size >= 190;
  const labels = getLabels(position);
  const bgRings = [1, 0.75, 0.5, 0.25];

  const statPts = labels.map(({ key }, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    const r = (stats[key] / 100) * maxR;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as [number, number];
  });

  const labelFontSize = Math.max(7.5, size * 0.052);
  const valueFontSize = Math.max(9,   size * 0.068);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ overflow: 'visible' }}
    >
      {/* background rings */}
      {bgRings.map((scale) => (
        <path
          key={scale}
          d={toPath(hexPoints(cx, cy, maxR * scale))}
          fill="none"
          stroke="rgba(212,175,55,0.15)"
          strokeWidth="1"
        />
      ))}

      {/* axis lines */}
      {hexPoints(cx, cy, maxR).map(([x, y], i) => (
        <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(212,175,55,0.18)" strokeWidth="1" />
      ))}

      {/* stat polygon */}
      <path
        d={toPath(statPts)}
        fill="rgba(212,175,55,0.22)"
        stroke="#D4AF37"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* stat dots */}
      {statPts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#D4AF37" />
      ))}

      {/* labels + values */}
      {labels.map(({ key, full, short }, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const lx = cx + labelR * Math.cos(angle);
        const ly = cy + labelR * Math.sin(angle);
        const anchor = lx < cx - 3 ? 'end' : lx > cx + 3 ? 'start' : 'middle';

        const labelY = ly - 8;
        const valueY = ly + valueFontSize * 0.85;
        const displayLabel = useFullLabel ? full : short;

        return (
          <g key={key}>
            <text
              x={lx}
              y={labelY}
              textAnchor={anchor}
              fill="rgba(255,255,255,0.55)"
              fontSize={labelFontSize}
              fontFamily="system-ui, sans-serif"
            >
              {displayLabel}
            </text>
            <text
              x={lx}
              y={valueY}
              textAnchor={anchor}
              fill="#D4AF37"
              fontSize={valueFontSize}
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              {stats[key]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
