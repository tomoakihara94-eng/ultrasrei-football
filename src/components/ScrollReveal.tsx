'use client';
import { useEffect, useRef, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

export default function ScrollReveal({ delay = 0, className = '', children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.remove('sr-hidden'), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`sr-base sr-hidden ${className}`} {...rest}>
      {children}
    </div>
  );
}
