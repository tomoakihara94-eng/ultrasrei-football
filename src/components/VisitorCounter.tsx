'use client';

import { useEffect, useState, useRef } from 'react';

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
  const jan1 = new Date(y, 0, 1);
  const week = String(Math.ceil(((now.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7)).padStart(2, '0');
  return {
    daily:   `daily-${y}-${m}-${d}`,
    weekly:  `weekly-${y}-W${week}`,
    monthly: `monthly-${y}-${m}`,
  };
}

const POLL_INTERVAL = 30_000;

async function hitCounter(key: string): Promise<number> {
  const res = await fetch('/api/pageviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key }),
  });
  if (!res.ok) return 0;
  const data = await res.json() as { value: number };
  return data.value ?? 0;
}

async function getCounter(key: string): Promise<number> {
  const res = await fetch(`/api/pageviews?key=${encodeURIComponent(key)}`);
  if (!res.ok) return 0;
  const data = await res.json() as { value: number };
  return data.value ?? 0;
}

function AnimatedNumber({ value }: { value: number | null }) {
  const [flash, setFlash] = useState(false);
  const prevRef = useRef<number | null>(null);

  useEffect(() => {
    if (value !== null && prevRef.current !== null && value !== prevRef.current) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 600);
      return () => clearTimeout(t);
    }
    prevRef.current = value;
  }, [value]);

  return (
    <span
      className="text-sm font-bold font-mono transition-colors duration-300"
      style={{ color: flash ? '#ffffff' : '#D4AF37' }}
    >
      {value === null ? '—' : value.toLocaleString()}
    </span>
  );
}

export default function VisitorCounter() {
  const [counts, setCounts] = useState<Counts>({ daily: null, weekly: null, monthly: null });
  const [live, setLive] = useState(false);

  useEffect(() => {
    const keys = getDateKeys();

    // 初回: hit（カウントアップ）
    Promise.all([
      hitCounter(keys.daily),
      hitCounter(keys.weekly),
      hitCounter(keys.monthly),
    ]).then(([daily, weekly, monthly]) => {
      setCounts({ daily, weekly, monthly });
      setLive(true);
    }).catch(() => {});

    // 以降: 30秒ごとに get（カウントせず最新値取得）
    const timer = setInterval(() => {
      Promise.all([
        getCounter(keys.daily),
        getCounter(keys.weekly),
        getCounter(keys.monthly),
      ]).then(([daily, weekly, monthly]) => {
        setCounts({ daily, weekly, monthly });
      }).catch(() => {});
    }, POLL_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: '本日', value: counts.daily },
    { label: '今週', value: counts.weekly },
    { label: '今月', value: counts.monthly },
  ];

  return (
    <div className="flex items-center gap-5">
      {/* LIVE indicator */}
      <div className="flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: live ? '#22c55e' : '#555',
            boxShadow: live ? '0 0 6px #22c55e' : 'none',
            animation: live ? 'pulse 2s ease-in-out infinite' : 'none',
          }}
        />
        <span className="text-[9px] text-white/25 uppercase tracking-widest">live</span>
      </div>

      {/* Counts */}
      {items.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="text-[10px] text-white/30 uppercase tracking-widest mb-0.5">{label}</div>
          <AnimatedNumber value={value} />
        </div>
      ))}
    </div>
  );
}
