'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface Props {
  username: string;
  tweetLimit?: number;
}

declare global {
  interface Window {
    twttr?: {
      widgets: { load: (el?: HTMLElement) => void };
    };
  }
}

export default function XTimeline({ username, tweetLimit = 5 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const load = () => {
    if (window.twttr && containerRef.current) {
      window.twttr.widgets.load(containerRef.current);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onLoad={load}
      />
      <div ref={containerRef}>
        <a
          className="twitter-timeline"
          href={`https://twitter.com/${username}`}
          data-theme="dark"
          data-chrome="noheader nofooter noborders transparent"
          data-tweet-limit={tweetLimit}
          data-dnt="true"
        >
          @{username} のポストを読み込み中…
        </a>
      </div>
    </>
  );
}
