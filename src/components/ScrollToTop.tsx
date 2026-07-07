'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 即時 → 描画後 → 次フレームと3段階でスクロール位置を上書き
    // autosave復元などの非同期レンダリング後のスクロールもカバーする
    scrollToTop();
    const raf1 = requestAnimationFrame(() => {
      scrollToTop();
      const raf2 = requestAnimationFrame(scrollToTop);
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [pathname]);

  return null;
}
