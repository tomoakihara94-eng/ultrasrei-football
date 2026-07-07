'use client';
import { useEffect, useRef, useState, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  to: number;
  suffix?: string;
  duration?: number;
}

export default function CountUp({ to, suffix = '', duration = 1600, ...rest }: Props) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - (1 - p) ** 3;
            setVal(Math.round(eased * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return <span ref={ref} {...rest}>{val}{suffix}</span>;
}
