import type { Metadata } from 'next';
import Link from 'next/link';
import AdsenseUnit from '@/components/AdsenseUnit';

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
    translation: 'マドリーと対戦することにモチベーションを感じない選手は、フットボール選手ではない。',
    context: 'マドリー監督時代、敵チームへの発言。クラブの格を示した言葉。',
    category: '挑発',
  },
  {
    text: 'Three years without a title is a long time for me.',
    translation: '私にとって3年間タイトルなしは長すぎる。',
    context: 'マドリー監督時代、国内ではリーガを制したが欧州タイトルを逃した時期に。',
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
  // 追加10本
  {
    text: 'Pressure is a privilege. It only comes to those who earn it.',
    translation: 'プレッシャーは特権だ。それを勝ち取った者にしか訪れない。',
    context: '重圧を恐れるのではなく、誇るべきものとして語った言葉。モウリーニョの勝者の思考を示す。',
    category: '哲学',
  },
  {
    text: 'I don\'t need the media to make me who I am. The trophies do that.',
    translation: 'メディアに私を定義してもらう必要はない。トロフィーがそれをやってくれる。',
    context: 'メディアとの関係を問われた際の発言。実績が全てという姿勢を貫いた。',
    category: '自信',
  },
  {
    text: 'At the end of the day, it\'s the result that counts. Not the performance, not the possession, not the passes. The result.',
    translation: '最終的には結果だけが重要だ。パフォーマンスでも、ポゼッションでも、パス数でもない。結果だ。',
    context: '美しいサッカーよりも勝利を優先するモウリーニョの哲学を直接的に語った言葉。',
    category: '哲学',
  },
  {
    text: 'I gave everything at Inter. Treble. And they still want more. That\'s football — you\'re only as good as your last game.',
    translation: 'インテルには全てを捧げた。三冠だ。それでもまだ求めてくる。それがフットボールだ——最後の試合の結果が全て。',
    context: 'インテルでの三冠達成後に監督を離れた際のコメント。クラブと監督の関係性の難しさを示した。',
    category: '過去',
  },
  {
    text: 'I\'d rather win 1-0 than lose 5-4. It\'s not boring. It\'s professional.',
    translation: '5-4で負けるより1-0で勝つほうがいい。退屈ではない。プロフェッショナルなんだ。',
    context: '守備的な戦い方を批判されることへの反論。勝利こそがプロの仕事だと主張した。',
    category: '哲学',
  },
  {
    text: 'I am the manager who wins the league in every country I\'ve been to.',
    translation: '私は行った先々の国でリーグ優勝した監督だ。',
    context: 'ポルトガル・イングランド・イタリア・スペインでのリーグ制覇を誇った発言。歴史的な事実に裏打ちされた自信。',
    category: '自信',
  },
  {
    text: 'When I left Chelsea the first time, I was sacked. The second time, I was sacked. I always come back. That\'s what winners do.',
    translation: '最初にチェルシーを去ったのは解任だった。2度目もそうだ。しかし私は常に戻ってくる。それが勝者のやることだ。',
    context: 'チェルシーとの複雑な関係を自らのレジリエンスとして語った言葉。',
    category: '過去',
  },
  {
    text: 'My teams never die in the first minute. They die in the last minute, fighting.',
    translation: '私のチームは試合開始1分で死なない。最後の1分まで戦って、倒れる。',
    context: 'チームの戦う姿勢と諦めない精神について語った言葉。モウリーニョの選手に求めるメンタリティを示す。',
    category: '哲学',
  },
  {
    text: 'I can\'t be afraid of winning. Winning is my oxygen.',
    translation: '勝つことを恐れることはできない。勝利が私の酸素だ。',
    context: '勝利への執念を生命維持に例えた言葉。勝つために生きているという信念を示した。',
    category: '自信',
  },
  {
    text: 'In football you need great players. But you also need a great leader on the touchline. That\'s me.',
    translation: 'フットボールでは優秀な選手が必要だ。しかし同時に、タッチライン上に偉大なリーダーも必要だ。それが私だ。',
    context: '監督としての自分の役割と存在価値を明確に語った言葉。',
    category: '自信',
  },
];

const categoryColors: Record<string, string> = {
  哲学: '#4A90D9',
  自信: '#D4AF37',
  挑発: '#E05C5C',
  ユーモア: '#5CB85C',
  過去: '#9B59B6',
};

const trophies = [
  { label: 'チャンピオンズリーグ', count: 2, years: '2004, 2010' },
  { label: 'リーグ優勝', count: 8, years: 'POR / ENG / ESP / ITA' },
  { label: 'FAカップ / コッパ', count: 3, years: '諸国カップ戦' },
  { label: 'コンフェレンスL', count: 1, years: '2023 ASローマ' },
];

export default function MourinhoPage() {
  const quoteCount = quotes.length;

  return (
    <div className="min-h-screen bg-[#060606] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Top nav */}
      <header className="border-b border-[#1a1a1a] bg-[#060606]/90 sticky top-0 z-20 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors">
            &larr; ツールに戻る
          </Link>
          <span className="text-xs text-[#444]">欧州サッカー歴代ベストイレブンメーカー</span>
        </div>
      </header>

      {/* ====== HERO ====== */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0d0000 0%, #0a0a0a 40%, #060606 100%)' }}
      >
        {/* Decorative background text */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
          aria-hidden="true"
        >
          <span
            className="text-[18vw] font-black tracking-tighter leading-none whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(212,175,55,0.04)',
            }}
          >
            MOURINHO
          </span>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
          <p className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase mb-5 font-semibold">
            ⸻ The Special One ⸻
          </p>
          <h1
            className="text-5xl md:text-7xl font-black mb-2 leading-none"
            style={{ fontFamily: 'var(--font-playfair)', letterSpacing: '-0.02em' }}
          >
            <span className="text-white">JOSÉ</span>
          </h1>
          <h1
            className="text-5xl md:text-7xl font-black mb-8 leading-none"
            style={{ fontFamily: 'var(--font-playfair)', letterSpacing: '-0.02em' }}
          >
            <span style={{ color: '#D4AF37' }}>MOURINHO</span>
          </h1>

          <blockquote
            className="text-xl md:text-2xl italic mb-8 max-w-2xl"
            style={{ fontFamily: 'var(--font-playfair)', color: 'rgba(255,255,255,0.75)', borderLeft: '4px solid #D4AF37', paddingLeft: '1.25rem' }}
          >
            &ldquo;I am not in the business of losing.&rdquo;
          </blockquote>

          <p className="text-[#666] text-sm leading-relaxed max-w-2xl mb-10">
            FCポルト・チェルシー・インテル・マドリード・マンU・ローマ——欧州の頂点を渡り歩いた「スペシャル・ワン」。
            勝利への執念、恐るべき自信、時に辛辣な挑発、そしてユーモア。
            全{quoteCount}本の名言でモウリーニョという男の全貌に迫る。
          </p>

          {/* Trophy stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trophies.map((t) => (
              <div
                key={t.label}
                className="rounded-xl px-4 py-4 text-center"
                style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)' }}
              >
                <div
                  className="text-3xl font-black mb-1"
                  style={{ fontFamily: 'var(--font-playfair)', color: '#D4AF37' }}
                >
                  {t.count}
                </div>
                <div className="text-white text-xs font-semibold mb-0.5">{t.label}</div>
                <div className="text-[#555] text-[10px]">{t.years}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

      <main className="max-w-5xl mx-auto px-6 py-14">
        {/* Category legend */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <span
              key={cat}
              className="text-xs px-4 py-1.5 rounded-full font-semibold"
              style={{ borderColor: color + '60', color: color, backgroundColor: color + '15', border: `1px solid ${color}40` }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Quote count */}
        <p
          className="text-center text-[#444] text-xs tracking-[0.3em] uppercase mb-10"
        >
          全{quoteCount}本 収録
        </p>

        {/* Quotes */}
        <div className="space-y-5">
          {quotes.map((quote, i) => {
            const color = categoryColors[quote.category] || '#D4AF37';
            const isGold = quote.category === '自信';
            return (
              <div key={i}>
                <article
                  className="rounded-2xl p-6 md:p-8 transition-all"
                  style={{
                    background: isGold
                      ? 'linear-gradient(135deg, #0f0d06 0%, #100f09 100%)'
                      : '#0c0c0c',
                    border: `1px solid ${isGold ? 'rgba(212,175,55,0.25)' : '#1a1a1a'}`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <span
                      className="text-[10px] px-3 py-1 rounded-full font-bold tracking-wider uppercase"
                      style={{ backgroundColor: color + '20', color: color, border: `1px solid ${color}40` }}
                    >
                      {quote.category}
                    </span>
                    <span
                      className="text-3xl font-black leading-none shrink-0 tabular-nums"
                      style={{ fontFamily: 'var(--font-playfair)', color: 'rgba(212,175,55,0.08)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* English quote */}
                  <blockquote
                    className="text-lg md:text-xl font-medium leading-relaxed mb-3 italic"
                    style={{
                      color: isGold ? '#f0e4b0' : '#e0e0e0',
                      fontFamily: 'var(--font-playfair)',
                      borderLeft: `3px solid ${color}`,
                      paddingLeft: '1rem',
                    }}
                  >
                    &ldquo;{quote.text}&rdquo;
                  </blockquote>

                  {/* Japanese translation */}
                  <p className="text-[#999] text-sm leading-relaxed mb-5 pl-5">
                    「{quote.translation}」
                  </p>

                  {/* Context */}
                  <p className="text-[#444] text-xs leading-relaxed border-t pt-4" style={{ borderColor: '#1a1a1a' }}>
                    {quote.context}
                  </p>
                </article>
                {i % 8 === 7 && <AdsenseUnit />}
              </div>
            );
          })}
        </div>

        {/* Profile section */}
        <section
          className="mt-16 rounded-2xl p-8"
          style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #0f0a00 100%)', border: '1px solid rgba(212,175,55,0.2)' }}
        >
          <p className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase mb-2">Profile</p>
          <h2
            className="text-xl font-bold mb-5"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            ジョゼ・モウリーニョとは
          </h2>
          <div className="text-[#777] text-sm leading-relaxed space-y-4">
            <p>
              ジョゼ・モウリーニョ（1963年1月26日生まれ、ポルトガル・セトゥーバル出身）は、欧州サッカー史上最も成功した監督の一人。選手時代は目立った実績がなかったが、指導者に転身後はFCポルトでチャンピオンズリーグを制覇（2004年）し、一気に世界の注目を集めた。
            </p>
            <p>
              チェルシー（2004〜2007, 2013〜2015）、インテル・ミラン（2008〜2010）、マドリー（2010〜2013）、マンチェスター・ユナイテッド（2016〜2018）、トッテナム（2019〜2021）、ASローマ（2021〜2023）と欧州の名門を渡り歩き、リーグ優勝8回、CL優勝2回など数々のタイトルを獲得した。
            </p>
            <p>
              ピッチ外でも常にメディアを賑わせる発言力と、確固たる自信に裏打ちされた言葉は「モウリーニョ語録」として今も語り継がれている。サッカー界で最もエンターテインメント性の高い監督といえるだろう。
            </p>
          </div>
        </section>

        {/* Related links */}
        <section className="mt-10 grid sm:grid-cols-3 gap-3">
          {[
            { href: '/blog/mourinho-chelsea-era', label: 'チェルシー時代の栄光と確執' },
            { href: '/blog/mourinho-defensive-philosophy', label: '守備哲学の真髄' },
            { href: '/blog/mourinho-roma-conference-league', label: 'ローマ・コンフェレンス制覇' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-xl px-5 py-4 text-sm text-[#D4AF37] font-medium transition-all hover:bg-[#D4AF37]/10"
              style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.2)' }}
            >
              {link.label} →
            </Link>
          ))}
        </section>

        <div className="border-t border-[#1a1a1a] pt-10 mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors font-medium">
            ベストイレブンを作る →
          </Link>
          <span className="text-[#333] hidden sm:block">|</span>
          <Link href="/blog" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors font-medium">
            コラムを読む →
          </Link>
          <span className="text-[#333] hidden sm:block">|</span>
          <Link href="/records" className="text-[#D4AF37] text-sm hover:text-[#F0D060] transition-colors font-medium">
            マドリーの記録を見る →
          </Link>
        </div>
      </main>
    </div>
  );
}
