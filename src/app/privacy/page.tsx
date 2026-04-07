import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | 欧州サッカー歴代ベストイレブンメーカー',
  description: 'ultrasrei.com のプライバシーポリシーです。',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            &larr; トップページに戻る
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14">
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          プライバシーポリシー
        </h1>
        <p className="text-[#555] text-sm mb-12">最終更新日：2026年4月7日</p>

        <div className="space-y-10 text-[#ccc] leading-relaxed text-sm">

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-l-2 border-[#D4AF37] pl-4">はじめに</h2>
            <p>
              ultrasrei.com（欧州サッカー歴代ベストイレブンメーカー、以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本プライバシーポリシーは、当サイトにおける個人情報の取り扱い方針を定めるものです。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-l-2 border-[#D4AF37] pl-4">1. 広告の配信について（Google AdSenseおよびCookieの使用）</h2>
            <p className="mb-3">
              当サイトでは、Google LLC が提供する広告配信サービス「Google AdSense」を利用しています。Google AdSense は、ユーザーの興味に応じた広告を表示するために Cookie を使用します。
            </p>
            <p className="mb-3">
              Cookie とは、ウェブサイトがユーザーのブラウザに保存する小さなテキストファイルです。Google はこの Cookie を使用して、ユーザーが当サイトや他のサイトを訪問した際の情報をもとに、適切な広告を配信します。
            </p>
            <p className="mb-3">
              ユーザーは、Google の広告設定ページ（<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">https://www.google.com/settings/ads</a>）から、パーソナライズ広告を無効にすることができます。また、<a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">www.aboutads.info</a> にアクセスすることで、第三者配信事業者による Cookie の使用を無効にすることもできます。
            </p>
            <p>
              Google による Cookie の使用方法については、Google のプライバシーポリシー（<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">https://policies.google.com/privacy</a>）をご参照ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-l-2 border-[#D4AF37] pl-4">2. アクセス解析ツールの使用について</h2>
            <p className="mb-3">
              当サイトでは、Google LLC が提供するアクセス解析サービス「Google Analytics」を利用しています。Google Analytics は Cookie を使用して、ユーザーの当サイトへのアクセス状況（訪問回数、滞在時間、参照元など）を収集・分析します。
            </p>
            <p className="mb-3">
              収集されるデータは匿名で処理されており、個人を特定するものではありません。当サイトはこのデータをサイトの改善や利便性向上を目的としてのみ使用します。
            </p>
            <p>
              Google Analytics のデータ収集を無効にするには、Google Analytics オプトアウトアドオン（<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">https://tools.google.com/dlpage/gaoptout</a>）をブラウザにインストールしてください。Google Analytics の利用規約およびプライバシーポリシーについては、Google のウェブサイトをご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-l-2 border-[#D4AF37] pl-4">3. お問い合わせについて</h2>
            <p className="mb-3">
              当サイトでは、ユーザーからのお問い合わせをメール等で受け付けております。お問い合わせの際にご提供いただいた氏名・メールアドレスなどの個人情報は、お問い合わせへの回答のみを目的として使用し、第三者への提供は行いません。
            </p>
            <p>
              ご提供いただいた個人情報は、お問い合わせの対応が完了した後、適切に管理・廃棄いたします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-l-2 border-[#D4AF37] pl-4">4. 免責事項</h2>
            <p className="mb-3">
              当サイトに掲載する情報については、正確性・最新性の維持に努めておりますが、その完全性・正確性・有用性を保証するものではありません。当サイトの情報をもとにユーザーが行った行為によって生じた損害について、当サイトは一切の責任を負いません。
            </p>
            <p className="mb-3">
              当サイトからリンクされた外部サイトの内容については、当サイトが管理・運営するものではなく、その正確性・安全性等について一切の責任を負いかねます。
            </p>
            <p>
              当サイトのコンテンツは予告なく変更・削除される場合があります。また、システムの不具合やサーバーのメンテナンス等により、サービスが一時的に停止する場合があることをご了承ください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-l-2 border-[#D4AF37] pl-4">5. 著作権・肖像権について</h2>
            <p className="mb-3">
              当サイトに掲載されているテキスト・画像・デザイン等のコンテンツの著作権は、当サイトの運営者または正当な権利を有する第三者に帰属します。これらのコンテンツについて、権利者の許可なく複製・転載・改変・再配布することを禁じます。
            </p>
            <p>
              当サイトに掲載する選手名・クラブ名・大会名等は情報提供を目的としたものであり、各権利者の著作権・商標権・肖像権を侵害する意図はありません。掲載内容に関して権利上の問題がある場合は、お問い合わせよりご連絡ください。速やかに対応いたします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-l-2 border-[#D4AF37] pl-4">6. プライバシーポリシーの変更</h2>
            <p>
              当サイトは、法令の変更やサービス内容の変化に応じて、本プライバシーポリシーを予告なく変更することがあります。変更後のプライバシーポリシーは、当ページに掲載した時点から効力を生じるものとします。定期的に本ページをご確認いただくようお願いいたします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-l-2 border-[#D4AF37] pl-4">お問い合わせ先</h2>
            <p>
              本プライバシーポリシーに関するお問い合わせは、下記までご連絡ください。
            </p>
            <p className="mt-3">
              サイト名：欧州サッカー歴代ベストイレブンメーカー（ultrasrei.com）<br />
              運営者：Tomoaki Hara<br />
              メールアドレス：ren90no@hotmail.co.jp
            </p>
          </section>

        </div>

        <div className="border-t border-[#1e1e1e] pt-10 mt-16 text-center">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            ベストイレブンを作る &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
