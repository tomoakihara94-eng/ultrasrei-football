import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'モウリーニョ名言集 | 欧州サッカー歴代ベストイレブンメーカー',
  description:
    'ジョゼ・モウリーニョの伝説の名言・語録を厳選して紹介。「スペシャル・ワン」が残した挑発・哲学・情熱の言葉たち。チェルシー、インテル、マドリード、マンUでの発言から厳選した名言集。',
};

const quotes = [
  {
    text: 'I think I am a special one.',
    translation: '私はスペシャル・ワンだと思う。',
    context: '2004年、チェルシー監督就任会見にて。この発言が「The Special One」という彼の代名詞を生んだ。',
    category: '自信',
  },
  {
    text: 'Please don\'t call me arrogant, but I\'m European champion and I think I\'m a special one.',
    translation: '傲慢と呼ばないでほしい。でも私は欧州王者であり、スペシャル・ワンだと思っている。',
    context: 'チェルシー就任会見での発言の続き。FCポルトでのCL優勝直後だった。',
    category: '自信',
  },
  {
    text: 'I am not going to be the afraid one. I am going to be the brave one.',
    translation: '私は臆病者にはならない。勇気ある者になる。',
    context: 'プレッシャーのかかる重要な試合前のコメント。',
    category: '哲学',
  },
  {
    text: 'Football is not always about playing well. It\'s about winning.',
    translation: 'フットボールは必ずしも美しく戦うことではない。勝つことだ。',
    context: 'モウリーニョの実利主義的な哲学を端的に表した言葉。',
    category: '哲学',
  },
  {
    text: 'I have a lot of respect for Wenger. But I think he is a voyeur. He likes to watch other people. There are some managers who are afraid of failure... Wenger is a specialist in failure.',
    translation: 'ベンゲルには敬意を持っている。でも彼は覗き魔だと思う。他人を眺めていたいんだ。失敗を恐れる監督がいる……ベンゲルは失敗のスペシャリストだ。',
    context: '2014年、プレミアリーグでのベンゲルとの激しい口論の中での発言。',
    category: '挑発',
  },
  {
    text: 'I was at Barcelona B and the club didn\'t want me. For them I was a translator.',
    translation: 'バルセロナBにいたが、クラブは私を必要としなかった。彼らにとって私は通訳だった。',
    context: 'バルセロナでの苦労した時代を振り返っての言葉。グアルディオラとの対比でよく引用される。',
    category: '過去',
  },
  {
    text: 'If Chelsea drop points, I\'ll be very surprised. And if they do, I\'ll be having dinner, and I\'ll say to myself "they lost points". And I\'ll carry on with my dinner.',
    translation: 'チェルシーがポイントを落とすなら、非常に驚く。もしそうなっても、私は夕食を食べながら「彼らはポイントを落とした」と思うだけで、食事を続ける。',
    context: 'チェルシー監督時代、タイトル争いについて問われた際の余裕の発言。',
    category: '挑発',
  },
  {
    text: 'The best moment of my career? Every time I win.',
    translation: '私のキャリアで最高の瞬間？ 勝つたびに、だ。',
    context: 'キャリアのハイライトを問われた際のシンプルな答え。',
    category: '哲学',
  },
  {
    text: 'I don\'t read the press. I read books.',
    translation: '私はプレスは読まない。本を読む。',
    context: 'メディア批判への対応として。読書家としての一面を示した言葉。',
    category: '哲学',
  },
  {
    text: 'I am the manager. I make the decisions, not you.',
    translation: '私が監督だ。決めるのは私であって、あなたではない。',
    context: '記者会見での挑発的な発言。プレスとの関係を示す一言。',
    category: '挑発',
  },
  {
    text: 'Of course I didn\'t get the sack. I resigned. There is a difference.',
    translation: 'もちろん解雇されたわけではない。辞任した。違いがある。',
    context: 'チェルシーを離れた後のコメント。',
    category: '自信',
  },
  {
    text: 'When you have three or four great players in the same position, you have to choose. I prefer to keep great players. Problems? I prefer to have them. It is better to have great players and problems than no great players and no problems.',
    translation: '同じポジションに3〜4人の優秀な選手がいれば選択しなければならない。私は優秀な選手を残したい。問題？あった方がいい。優秀な選手がいて問題があるほうが、優秀な選手がいなくて問題もないよりはるかにいい。',
    context: 'スカッドマネジメントについて問われた際の回答。',
    category: '哲学',
  },
  {
    text: 'I am not scared. I am brave. If the dogs bark, the caravan passes.',
    translation: '私は怖くない。勇敢だ。犬が吠えても、キャラバンは進む。',
    context: '批判や圧力を受けた際の、モウリーニョらしいコメント。',
    category: '哲学',
  },
  {
    text: 'Sometimes you see beautiful people with no brains. Sometimes you have brains with no beauty. Put them together and you have me.',
    translation: '美しいのに頭の悪い人もいる。頭はいいが美しくない人もいる。それを合わせると私になる。',
    context: '自身のキャラクターについてユーモラスに語った言葉。',
    category: 'ユーモア',
  },
  {
    text: 'I started at Porto. Porto is everything to me. But Chelsea gave me the chance to work in the best league in the world.',
    translation: 'ポルトから始めた。ポルトは私の全てだ。しかしチェルシーが世界最高のリーグで仕事する機会を与えてくれた。',
    context: 'チェルシー就任後のインタビューで。',
    category: '過去',
  },
  {
    text: 'I won the Champions League with Porto, a club with no history.',
    translation: '私は歴史のないクラブ、ポルトでチャンピオンズリーグを制した。',
    context: '大クラブの監督たちへのあてつけとも取れる、挑発的な自慢。',
    category: '挑発',
  },
  {
    text: 'I would love to have a statue at every club I\'ve worked at. That\'s my dream.',
    translation: '私が働いた全てのクラブに銅像を建ててもらいたい。それが私の夢だ。',
    context: '自身の功績への自信に満ちた発言。',
    category: 'ユーモア',
  },
  {
    text: 'My biggest fear is that when I die my wife will sell my trophies for what I told her I paid for them.',
    translation: '一番怖いのは、私が死んだとき、妻が私のトロフィーを私が告げた値段で売ってしまうことだ。',
    context: '自身のユーモアセンスを示した発言。',
    category: 'ユーモア',
  },
  {
    text: 'I have two children. Do you think they dream of playing in La Liga? No. They dream of playing in the Premier League.',
    translation: '私には子供が2人いる。彼らがラ・リーガでプレーすることを夢見ていると思うか？ 違う。プレミアリーグでプレーすることを夢見ている。',
    context: 'プレミアリーグへの愛着を示した言葉。',
    category: '哲学',
  },
  {
    text: 'If I speak, I am in trouble. I prefer not to speak.',
    translation: '話したら面倒なことになる。話さない方がいい。',
    context: '審判や対戦相手についてコメントを求められた際の発言。しばしばその後で話し続ける。',
    category: 'ユーモア',
  },
  {
    text: 'I am the happiest man in the world.',
    translation: '私は世界一幸せな男だ。',
    context: 'インテルでのトレブル（セリエA・コッパ・CL三冠）達成後、2010年CL優勝の瞬間に。',
    category: '自信',
  },
  {
    text: 'You can say what you want about me. But not my team. Not my players.',
    translation: '私についてはいくらでも言え。しかし私のチームについては、私の選手たちについては駄目だ。',
    context: 'メディアやファンからの批判に対して、チームを守る発言。',
    category: '哲学',
  },
  {
    text: 'Zero. Zero. Zero. I don\'t like pressure? Put pressure on me. Zero, zero, zero.',
    translation: 'ゼロ。ゼロ。ゼロ。プレッシャーが嫌い？かけてみろ。ゼロ、ゼロ、ゼロだ。',
    context: 'プレッシャーへの耐性を問われた際の名物回答。繰り返すことで逆に自信を強調した。',
    category: '自信',
  },
  {
    text: 'Loyalty is when someone supports you when you are wrong. Respect is when someone supports you when you are right.',
    translation: '忠誠とは、あなたが間違っているときでも支持してくれること。敬意とは、あなたが正しいときに支持してくれること。',
    context: '選手・スタッフとの関係性について語った哲学的な言葉。',
    category: '哲学',
  },
  {
    text: 'I was born to be a manager. I think I was born to be a winner.',
    translation: '私は監督として生まれてきた。勝者として生まれてきたと思う。',
    context: '自身の天職についての確信に満ちた発言。',
    category: '自信',
  },
  {
    text: 'The day you stop dreaming is the day you start dying.',
    translation: '夢を見ることをやめた日が、死に始める日だ。',
    context: '向上心と目標を持ち続けることの重要性を語った言葉。',
    category: '哲学',
  },
  {
    text: 'I am not a defensive coach. I am a coach who knows how to defend.',
    translation: '私は守備的な監督ではない。守り方を知っている監督だ。',
    context: '守備的戦術への批判に反論した言葉。定義の違いを逆手に取った名答。',
    category: '哲学',
  },
  {
    text: 'When you lose, the dressing room smells bad. When you win, everything smells fantastic.',
    translation: '負けたとき、更衣室は臭い。勝ったとき、何もかも最高の香りがする。',
    context: '勝敗がチームの雰囲気に与える影響について、直感的に語った言葉。',
    category: 'ユーモア',
  },
  {
    text: 'I am proud of my own statue.',
    translation: '自分の銅像を誇りに思う。',
    context: 'チェルシーから銅像贈呈を打診された際のコメント。自己評価の高さを笑いに変えた。',
    category: 'ユーモア',
  },
  {
    text: 'If players are not motivated to play Real Madrid, it is because they are not football players.',
    translation: 'レアル・マドリードと対戦することにモチベーションを感じない選手は、フットボール選手ではない。',
    context: 'レアル・マドリード監督時代、敵チームへの発言。クラブの格を示した言葉。',
    category: '挑発',
  },
  {
    text: 'Three years without a title is a long time for me.',
    translation: '私にとって3年間タイトルなしは長すぎる。',
    context: 'レアル・マドリード監督時代、国内ではリーガを制したが欧州タイトルを逃した時期に。',
    category: '自信',
  },
  {
    text: 'The best place in the world to manage is England. But the best league is the Premier League.',
    translation: '監督するのに世界最高の場所はイングランドだ。そして最高のリーグはプレミアリーグだ。',
    context: 'プレミアリーグへの愛着を何度も語ったモウリーニョらしい発言。',
    category: '哲学',
  },
  {
    text: 'I am not in the business of losing.',
    translation: '私は負けるビジネスをしていない。',
    context: '敗北を受け入れない姿勢を表した短く力強い言葉。',
    category: '自信',
  },
  {
    text: 'Some people believe football is a matter of life and death. I assure you, it\'s much more serious than that.',
    translation: 'フットボールは死活問題だと思っている人がいる。断言するが、それよりずっと深刻だ。',
    context: 'ビル・シャンクリーの名言のオマージュとして語ったもの。サッカーへの情熱を示す。',
    category: '哲学',
  },
  {
    text: 'A lion doesn\'t concern himself with the opinions of sheep.',
    translation: 'ライオンは羊の意見を気にしない。',
    context: '批評家やメディアの批判を意に介さないことを示した言葉。',
    category: '哲学',
  },
];

const categories = ['すべて', '哲学', '自信', '挑発', 'ユーモア', '過去'];
const categoryColors: Record<string, string> = {
  哲学: '#4A90D9',
  自信: '#D4AF37',
  挑発: '#E05C5C',
  ユーモア: '#5CB85C',
  過去: '#9B59B6',
};

export default function MourinhoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      <header className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            &larr; ツールに戻る
          </Link>
          <span className="text-xs text-[#555]">欧州サッカー歴代ベストイレブンメーカー</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-14">
        {/* Hero */}
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-3">The Special One</p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            モウリーニョ名言集
          </h1>
          <p className="text-[#888] leading-relaxed max-w-2xl mb-4">
            ジョゼ・モウリーニョ——「スペシャル・ワン」の異名を持つ、欧州サッカー史上最も雄弁な監督。
            FCポルト、チェルシー、インテル・ミラン、レアル・マドリード、マンチェスター・ユナイテッド、トッテナムで指揮を執り、
            数々の名言・迷言を世界に残してきた。その言葉には、サッカーへの深い哲学と、唯一無二のキャラクターが凝縮されている。
          </p>
          <p className="text-[#555] text-sm">全{quotes.length}本の名言を収録</p>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap gap-3 mb-10">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <span
              key={cat}
              className="text-xs px-3 py-1 rounded-full border"
              style={{ borderColor: color + '60', color: color, backgroundColor: color + '15' }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Quotes */}
        <div className="space-y-6">
          {quotes.map((quote, i) => {
            const color = categoryColors[quote.category] || '#D4AF37';
            return (
              <article
                key={i}
                className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6 md:p-8 hover:border-[#D4AF37]/20 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full shrink-0"
                    style={{ backgroundColor: color + '20', color: color, border: `1px solid ${color}40` }}
                  >
                    {quote.category}
                  </span>
                  <span
                    className="text-4xl font-black leading-none shrink-0"
                    style={{ fontFamily: 'var(--font-playfair)', color: '#D4AF3715' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* English quote */}
                <blockquote
                  className="text-lg md:text-xl font-medium leading-relaxed mb-3 italic"
                  style={{ color: '#e0e0e0', fontFamily: 'var(--font-playfair)', borderLeft: `3px solid ${color}`, paddingLeft: '1rem' }}
                >
                  &ldquo;{quote.text}&rdquo;
                </blockquote>

                {/* Japanese translation */}
                <p className="text-[#aaa] text-sm leading-relaxed mb-4 pl-4">
                  「{quote.translation}」
                </p>

                {/* Context */}
                <p className="text-[#555] text-xs leading-relaxed border-t border-[#1a1a1a] pt-4">
                  {quote.context}
                </p>
              </article>
            );
          })}
        </div>

        {/* Profile section */}
        <section className="mt-16 bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            ジョゼ・モウリーニョとは
          </h2>
          <div className="text-[#888] text-sm leading-relaxed space-y-3">
            <p>
              ジョゼ・モウリーニョ（1963年1月26日生まれ、ポルトガル・セトゥーバル出身）は、欧州サッカー史上最も成功した監督の一人。選手時代は目立った実績がなかったが、指導者に転身後はFCポルトでチャンピオンズリーグを制覇（2004年）し、一気に世界の注目を集めた。
            </p>
            <p>
              チェルシー（2004〜2007, 2013〜2015）、インテル・ミラン（2008〜2010）、レアル・マドリード（2010〜2013）、マンチェスター・ユナイテッド（2016〜2018）、トッテナム（2019〜2021）、ASローマ（2021〜2023）と欧州の名門を渡り歩き、リーグ優勝8回、CL優勝2回など数々のタイトルを獲得した。
            </p>
            <p>
              ピッチ外でも常にメディアを賑わせる発言力と、確固たる自信に裏打ちされた言葉は「モウリーニョ語録」として今も語り継がれている。サッカー界で最もエンターテインメント性の高い監督といえるだろう。
            </p>
          </div>
        </section>

        <div className="border-t border-[#1e1e1e] pt-10 mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors font-medium">
            ベストイレブンを作る →
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
