import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '運営者情報 | 欧州サッカー歴史的ベストイレブンメーカー',
  description: 'サイトの運営者情報、制作の目的、サッカーへの想いをご紹介します。',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Header */}
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors"
          >
            &larr; ツールに戻る
          </Link>
          <span className="text-xs text-[#555]">欧州サッカー歴史的ベストイレブンメーカー</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Title */}
        <h1
          className="text-4xl font-bold mb-2 shimmer-text"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          運営者情報
        </h1>
        <p className="text-[#555] text-sm mb-12">About This Site</p>

        {/* Section 1: Who */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4 border-b border-[#1e1e1e] pb-2">
            このサイトについて
          </h2>
          <p className="text-[#ccc] leading-relaxed mb-4">
            「欧州サッカー歴史的ベストイレブンメーカー」は、欧州サッカーを愛する個人が運営するファンサイトです。
            プレミアリーグ・ラ・リーガ・セリエA・ブンデスリーガ・リーグアンを中心に、
            何十年にもわたる名選手たちを自由に組み合わせて、自分だけのドリームチームを編成できます。
          </p>
          <p className="text-[#ccc] leading-relaxed">
            本サービスは特定のクラブ・選手・団体とは一切関係のない非公式のファンアプリです。
            選手名・チーム名・国名はすべて識別目的で使用しており、各権利は各権利保有者に帰属します。
          </p>
        </section>

        {/* Section 2: Passion */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4 border-b border-[#1e1e1e] pb-2">
            サッカーへの情熱
          </h2>
          <p className="text-[#ccc] leading-relaxed mb-4">
            幼い頃からサッカーを見て育ちました。深夜の欧州CLを眠い目で見続けた記憶、
            ゴールが決まった瞬間に家族と飛び上がった喜び——そういった体験が、サッカーへの愛の原点です。
          </p>
          <p className="text-[#ccc] leading-relaxed mb-4">
            欧州サッカーが特別なのは、時代を超えて語り継がれる「伝説」が積み重なっているからだと思います。
            マラドーナのドリブル、クライフのトータルフットボール、ロナウドの圧倒的な個人技——
            異なる時代の選手たちを「もし同じチームで戦ったら?」と想像することが、サッカーファンにとって最高の遊びの一つです。
          </p>
          <p className="text-[#ccc] leading-relaxed">
            その「想像の喜び」をすべての人に届けたいという思いが、このツールを作ったきっかけです。
          </p>
        </section>

        {/* Section 3: Purpose */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4 border-b border-[#1e1e1e] pb-2">
            このツールを作った目的
          </h2>
          <div className="space-y-6">
            <div className="bg-[#111] border border-[#1e1e1e] rounded-lg p-5">
              <h3 className="font-semibold text-white mb-2">1. 議論と発見のきっかけを作る</h3>
              <p className="text-[#aaa] text-sm leading-relaxed">
                「ベストイレブン」は答えのない問いです。だからこそ面白い。
                友人や家族と「なぜそのフォーメーションを選んだのか」「なぜあの選手を外したのか」を語り合う——
                そんな議論のきっかけになれれば最高です。
              </p>
            </div>
            <div className="bg-[#111] border border-[#1e1e1e] rounded-lg p-5">
              <h3 className="font-semibold text-white mb-2">2. 歴史的名手を次世代に伝える</h3>
              <p className="text-[#aaa] text-sm leading-relaxed">
                若いファンに「ジネディーヌ・ジダンってどんな選手?」「ロナウジーニョのプレースタイルは?」と
                興味を持ってもらえる入り口になってほしい。
                偉大な選手たちの記憶を未来につないでいきたいという思いがあります。
              </p>
            </div>
            <div className="bg-[#111] border border-[#1e1e1e] rounded-lg p-5">
              <h3 className="font-semibold text-white mb-2">3. テクノロジーとサッカーの融合を楽しむ</h3>
              <p className="text-[#aaa] text-sm leading-relaxed">
                AIによる能力査定やタクティカルボードの自動生成など、最新のテクノロジーを使ってサッカー体験を豊かにする——
                そのチャレンジ自体がエンジニアとしての楽しみでもあります。
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Contact */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4 border-b border-[#1e1e1e] pb-2">
            お問い合わせ
          </h2>
          <p className="text-[#ccc] leading-relaxed mb-4">
            サイトに関するご意見・ご要望・不具合報告は、下記よりお気軽にご連絡ください。
            いただいたフィードバックはすべて目を通し、サービス改善に活かしています。
          </p>
          <a
            href="mailto:ren90no@hotmail.co.jp"
            className="inline-block text-[#D4AF37] border border-[#D4AF37] rounded px-5 py-2 text-sm hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            メールで問い合わせる
          </a>
        </section>

        {/* Section 5: Disclaimer */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4 border-b border-[#1e1e1e] pb-2">
            免責事項
          </h2>
          <p className="text-[#888] text-sm leading-relaxed">
            本サイトに掲載されている選手の能力値・評価はAIによる推定値であり、実際の能力を保証するものではありません。
            また、本サイトの情報を利用したことによる損害について、運営者は一切の責任を負いかねます。
            コンテンツは予告なく変更・削除される場合があります。
          </p>
        </section>

        {/* Footer nav */}
        <div className="border-t border-[#1e1e1e] pt-8 text-center">
          <Link
            href="/"
            className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors"
          >
            ツールを使ってみる &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
