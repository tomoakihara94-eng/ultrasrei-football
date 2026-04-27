import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'お問い合わせ | 欧州サッカー歴代ベストイレブンメーカー',
  description:
    '欧州サッカー歴代ベストイレブンメーカーへのお問い合わせページ。不具合報告・ご意見・コンテンツ削除依頼はこちらからご連絡ください。',
};

const topics = [
  { label: '不具合・エラー報告', desc: 'ツールが正常に動作しない場合や表示の不具合など' },
  { label: 'コンテンツへのご意見', desc: '記事の内容・選手情報の誤りなどのご指摘' },
  { label: '権利侵害・削除依頼', desc: '著作権・肖像権等に関するご連絡（速やかに対応します）' },
  { label: 'その他のお問い合わせ', desc: '掲載・提携・取材等のご相談もお気軽にどうぞ' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            &larr; ツールに戻る
          </Link>
          <span className="text-xs text-[#555]">欧州サッカー歴代ベストイレブンメーカー</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-3">Contact</p>
        <h1
          className="text-4xl font-bold mb-4 shimmer-text"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          お問い合わせ
        </h1>
        <p className="text-[#888] leading-relaxed mb-12 max-w-xl">
          当サイトに関するご意見・ご要望・不具合報告・権利侵害のご連絡は、下記メールアドレスまでお送りください。いただいたメールには通常3営業日以内にご返信いたします。
        </p>

        {/* Contact card */}
        <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-8 mb-10">
          <p className="text-xs text-[#555] uppercase tracking-widest mb-2">メールアドレス</p>
          <a
            href="mailto:ren90no@hotmail.co.jp"
            className="text-xl text-[#D4AF37] hover:text-[#F0D060] transition-colors font-medium"
          >
            ren90no@hotmail.co.jp
          </a>
          <p className="text-xs text-[#555] mt-3">
            ※ スパム防止のため、件名に「ultrasrei お問い合わせ」とご記入ください
          </p>
        </div>

        {/* Topic list */}
        <h2 className="text-lg font-bold text-white mb-5" style={{ fontFamily: 'var(--font-playfair)' }}>
          お問い合わせ内容の例
        </h2>
        <div className="space-y-4 mb-12">
          {topics.map((t) => (
            <div key={t.label} className="flex gap-4 bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl p-5">
              <span className="text-[#D4AF37] mt-0.5 shrink-0">◆</span>
              <div>
                <p className="text-sm font-semibold text-white mb-1">{t.label}</p>
                <p className="text-xs text-[#666] leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Response policy */}
        <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6 mb-12">
          <h3 className="text-sm font-bold text-[#D4AF37] mb-3">ご返信について</h3>
          <ul className="space-y-2 text-xs text-[#777] leading-relaxed">
            <li>• 通常3営業日以内にご返信いたします</li>
            <li>• お問い合わせ内容によってはご返信できない場合があります</li>
            <li>• 権利侵害・削除依頼については優先的に対応いたします</li>
            <li>• 迷惑メールフィルタをご利用の方は、返信が届かない場合があります</li>
          </ul>
        </div>

        <div className="border-t border-[#1e1e1e] pt-8 flex flex-wrap gap-6 justify-center">
          <Link href="/about" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            運営者情報 →
          </Link>
          <Link href="/privacy" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            プライバシーポリシー →
          </Link>
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            ツールを使う →
          </Link>
        </div>
      </main>
    </div>
  );
}
