import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '使い方ガイド | 欧州サッカー歴代ベストイレブンメーカー',
  description:
    '欧州サッカー歴代ベストイレブンメーカーの使い方を徹底解説。選手の選び方、フォーメーションの組み方、チーム分析の見方、SNSシェアの方法まで、初めての方でもすぐに使えるガイドです。',
};

export default function GuidePage() {
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

      <main className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-3">How to Use</p>
        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          使い方ガイド
        </h1>
        <p className="text-[#888] leading-relaxed mb-12">
          このページでは「欧州サッカー歴代ベストイレブンメーカー」の使い方を詳しく説明します。
          初めて使う方でも、このガイドを読めばすぐに自分だけのドリームチームを作れます。
        </p>

        <div className="space-y-12 text-[#ccc] text-sm leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-[#D4AF37] pl-4">ステップ1：フォーメーションを選ぶ</h2>
            <p className="mb-4">
              まずはチームの基本構造となるフォーメーションを選びます。現在選べるフォーメーションは以下の通りです。
            </p>
            <ul className="space-y-3 mb-4">
              <li className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-4">
                <span className="font-bold text-[#D4AF37]">4-3-3</span>
                <span className="ml-3">攻撃的で流動的なスタイル。両ウイングとセンターFWの3トップが強力な攻撃陣を形成。レアル・マドリードやバルセロナが得意とするシステム。</span>
              </li>
              <li className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-4">
                <span className="font-bold text-[#D4AF37]">4-4-2</span>
                <span className="ml-3">バランスの取れたクラシックなシステム。2トップの組み合わせが鍵で、堅守速攻を得意とするチームに向く。プレミアリーグで長年主流だった布陣。</span>
              </li>
              <li className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-4">
                <span className="font-bold text-[#D4AF37]">4-2-3-1</span>
                <span className="ml-3">現代的で守備と攻撃のバランスに優れる。ダブルボランチが中盤を支配し、トップ下が攻撃を司る。世界中のトップクラブで採用される実用的なシステム。</span>
              </li>
              <li className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-4">
                <span className="font-bold text-[#D4AF37]">3-5-2</span>
                <span className="ml-3">3バックの守備とウイングバックの攻撃参加が特徴。中盤の枚数を増やして支配力を高めたい場合に有効。大胆な選択をしたい方向け。</span>
              </li>
              <li className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-4">
                <span className="font-bold text-[#D4AF37]">3-4-3</span>
                <span className="ml-3">超攻撃的な布陣。3バックにリスクはあるが、前線に3枚置くことで圧倒的な得点力を発揮する。アントニオ・コンテが好む攻撃的な変形。</span>
              </li>
            </ul>
            <p className="text-[#666] text-xs">
              ※ フォーメーション選択後、ポジションのスロットが自動的に更新されます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-[#D4AF37] pl-4">ステップ2：選手を選ぶ</h2>
            <p className="mb-4">
              フォーメーションが決まったら、各ポジションに選手を配置します。フィールド上の「＋」ボタンをクリックすると選手選択画面が開きます。
            </p>
            <div className="space-y-3 mb-4">
              <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">選手の検索方法</h3>
                <p>名前（日本語・英語どちらも可）、クラブ名、国籍で絞り込めます。「ロナウド」と入力すればクリスティアーノ・ロナウドとロナウド（ブラジル人）の両方が表示されます。</p>
              </div>
              <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">収録選手について</h3>
                <p>1950年代から2020年代まで、欧州5大リーグで活躍した300名以上の名選手を収録しています。ディ・ステファノ、プスカス、クライフ、マラドーナ（欧州時代）、ジダン、ロナウジーニョ、メッシ、クリスティアーノ・ロナウドなど、時代を超えた伝説的な選手たちが揃っています。</p>
              </div>
              <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">ベンチ要員の設定</h3>
                <p>スターター11人に加え、ベンチにも5人まで選手を登録できます。ベンチ要員も含めた16人のスカッドを作ることで、より本格的なチーム編成が楽しめます。</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-[#D4AF37] pl-4">ステップ3：チーム分析を確認する</h2>
            <p className="mb-4">
              選手を配置したら、右側の「チーム分析」タブをクリックしてみましょう。AIがあなたのチームを分析し、以下の情報を提供します。
            </p>
            <ul className="space-y-2 mb-4 list-disc list-inside text-[#aaa]">
              <li>チーム全体の総合評価（攻撃力・守備力・テクニック・メンタル・インテリジェンス）</li>
              <li>各選手の能力値レーダーチャート</li>
              <li>チームの強みと弱みの分析</li>
              <li>このチームに最適な監督スタイルの提案</li>
            </ul>
            <p>
              選んだ選手の組み合わせによって、分析結果が大きく変わります。守備的な選手を多く選べば堅守のチームに、攻撃的な選手を揃えれば高得点チームになります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-[#D4AF37] pl-4">ステップ4：SNSでシェアして議論しよう</h2>
            <p className="mb-4">
              チームが完成したら「Xにシェア」ボタンでSNSに投稿できます。あなたの渾身のドリームチームを世界中のサッカーファンに見せて、熱い議論を楽しみましょう。
            </p>
            <div className="bg-[#0f0f0f] border border-[#D4AF37]/20 rounded-lg p-4">
              <p className="text-[#D4AF37] font-bold mb-2">シェア時のコツ</p>
              <p>チームを投稿する際に「このフォーメーションにした理由」や「この選手を選んだこだわり」を添えると、より多くのリアクションが得られます。サッカーファンはみな、他人のベストイレブンの「選択理由」が気になるものです。</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-[#D4AF37] pl-4">よくある質問</h2>
            <div className="space-y-4">
              <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-4">
                <p className="font-bold text-white mb-2">Q. 作ったチームは保存されますか？</p>
                <p className="text-[#aaa]">はい。ブラウザのローカルストレージに自動保存されるため、同じブラウザ・同じ端末でアクセスすると前回のチームが復元されます。ただし、ブラウザのキャッシュをクリアすると消えます。</p>
              </div>
              <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-4">
                <p className="font-bold text-white mb-2">Q. 現役選手は入っていますか？</p>
                <p className="text-[#aaa]">主に欧州サッカーで長年の実績を残した名選手を収録しています。現役選手も一部収録していますが、歴史的な評価が確立した選手を中心に厳選しています。</p>
              </div>
              <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-4">
                <p className="font-bold text-white mb-2">Q. 能力値はどうやって決めていますか？</p>
                <p className="text-[#aaa]">AIによる分析と、各選手のキャリア統計・専門家評価・歴史的功績をもとに算出しています。あくまでエンターテインメント目的の参考値であり、公式な評価ではありません。</p>
              </div>
            </div>
          </section>

        </div>

        <div className="border-t border-[#1e1e1e] pt-10 mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors font-medium">
            ツールを使ってみる →
          </Link>
          <span className="text-[#333] hidden sm:block">|</span>
          <Link href="/blog" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors font-medium">
            コラムを読む →
          </Link>
        </div>
      </main>
    </div>
  );
}
