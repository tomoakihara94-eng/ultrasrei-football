'use client';

interface Props {
  username: string;
  tweetLimit?: number;
}

export default function XTimeline({ username }: Props) {
  return (
    <div className="px-4 py-6 text-center">
      <p className="text-[#888] text-xs mb-4">
        最新のポストはXでチェックしてください
      </p>
      <a
        href={`https://twitter.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #D4AF37, #F0D060)',
          color: '#0a0a0a',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.737-8.843L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
        @{username} をフォローする
      </a>
    </div>
  );
}
