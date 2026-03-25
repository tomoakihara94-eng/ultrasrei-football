'use client';

import { useEffect, useState } from 'react';

type Counts = {
  daily: number | null;
  weekly: number | null;
  monthly: number | null;
};

function getDateKeys() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');

  // ISO week number
  const jan1 = new Date(y, 0, 1);
  const week = String(Math.ceil(((now.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7)).padStart(2, '0');

  return {
    daily: `daily-${y}-${m}-${d}`,
    weekly: `weekly-${y}-W${week}`,
    monthly: `monthly-${y}-${m}`,
  };
}

const NAMESPACE = 'ultrasrei-football';

async function hitCounter(key: string): Promise<number> {
  const res = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${key}`);
  if (!res.ok) return 0;
  const data = await res.json();
  return data.value ?? 0;
}

export default function VisitorCounter() {
  const [counts, setCounts] = useState<Counts>({ daily: null, weekly: null, monthly: null });

  useEffect(() => {
    const keys = getDateKeys();
    // Hit all three counters in parallel (one hit per page load)
    Promise.all([
      hitCounter(keys.daily),
      hitCounter(keys.weekly),
      hitCounter(keys.monthly),
    ]).then(([daily, weekly, monthly]) => {
      setCounts({ daily, weekly, monthly });
    }).catch(() => {
      // Silently fail if API is unavailable
    });
  }, []);

  const items = [
    { label: '本日', value: counts.daily },
    { label: '今週', value: counts.weekly },
    { label: '今月', value: counts.monthly },
  ];

  return (
    <div className="flex items-center gap-4">
      {items.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="text-[10px] text-white/30 uppercase tracking-widest mb-0.5">{label}</div>
          <div className="text-sm font-bold text-[#D4AF37] font-mono">
            {value === null ? '—' : value.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
