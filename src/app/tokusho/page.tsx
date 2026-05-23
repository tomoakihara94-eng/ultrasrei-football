import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 | ultrasrei.com',
  description: '特定商取引法に基づく表記。販売業者情報、料金、解約方法についてご確認ください。',
  robots: { index: true, follow: true },
};

const rows: { label: string; value: React.ReactNode }[] = [
  { label: '販売業者', value: 'Hara Tech' },
  { label: '代表者名', value: '代表者（お問い合わせにて開示します）' },
  {
    label: '所在地',
    value: (
      <>
        〒 （準備中）
        <br />
        <span className="text-[#555] text-xs">※お問い合わせいただいた場合は遅滞なく開示いたします。</span>
      </>
    ),
  },
  {
    label: '電話番号',
    value: (
      <>
        準備中
        <br />
        <span className="text-[#555] text-xs">※お問い合わせはメールにてお願いします。</span>
      </>
    ),
  },
  {
    label: 'メールアドレス',
    value: <a href="mailto:ren90no@hotmail.co.jp" className="text-[#D4AF37] underline">ren90no@hotmail.co.jp</a>,
  },
  { label: 'サイトURL', value: 'https://ultrasrei.com' },
  {
    label: '販売価格',
    value: '月額 ¥900（税込）',
  },
  {
    label: '料金の支払い時期',
    value: '初回：お申し込み時に即時決済。以降：毎月同日に自動更新。',
  },
  {
    label: '支払い方法',
    value: 'クレジットカード（Visa・Mastercard・American Express・JCB等）',
  },
  {
    label: 'サービスの提供時期',
    value: 'お申し込み・決済完了後、即時にご利用いただけます。',
  },
  {
    label: '定期課金について',
    value: (
      <>
        本サービスは<strong className="text-white">月額の定期購読（サブスクリプション）</strong>です。
        お客様がキャンセルしない限り、毎月自動的に課金されます。
      </>
    ),
  },
  {
    label: 'キャンセル・解約',
    value: (
      <>
        会員ページ（ultrasrei.com/members/dashboard）の「支払い管理」から、
        いつでも解約できます。解約後は次回請求日まで引き続きサービスをご利用いただけます。
        <br />
        <span className="text-[#555] text-xs">※日割り返金は行っておりません。</span>
      </>
    ),
  },
  {
    label: '返品・返金',
    value: 'デジタルコンテンツの性質上、決済完了後の返金は原則お受けできません。サービスに重大な不具合があった場合はご相談ください。',
  },
  {
    label: '動作環境',
    value: 'インターネット接続環境、最新のWebブラウザ（Chrome・Safari・Firefox・Edge等）',
  },
];

export default function TokushoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            &larr; トップへ
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-3 font-semibold">Legal</p>
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          特定商取引法に基づく表記
        </h1>
        <p className="text-[#555] text-xs mb-12">
          特定商取引に関する法律第11条に基づき、以下の事項を表示します。
        </p>

        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1e1e1e' }}>
          {rows.map(({ label, value }, i) => (
            <div
              key={label}
              className="flex flex-col sm:flex-row"
              style={{ borderBottom: i < rows.length - 1 ? '1px solid #1a1a1a' : undefined }}
            >
              <div
                className="sm:w-44 shrink-0 px-5 py-4 text-xs font-semibold text-[#888]"
                style={{ background: '#0d0d0d' }}
              >
                {label}
              </div>
              <div className="flex-1 px-5 py-4 text-sm text-[#bbb] leading-relaxed">
                {value}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[#333] text-xs mt-10 leading-relaxed">
          本ページの内容は予告なく変更する場合があります。最新の情報は本ページをご確認ください。
          ご不明な点はメールにてお問い合わせください。
        </p>
      </main>
    </div>
  );
}
