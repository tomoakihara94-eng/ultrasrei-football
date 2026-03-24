export interface ManagerBonus {
  attack: number;
  defense: number;
  creativity: number;
  physical: number;
  chemistry: number;
}

export interface ManagerStyle {
  id: string;
  name: string;
  emoji: string;
  keyword: string;
  desc: string;
  bonus: ManagerBonus;
}

export const MANAGER_STYLES: ManagerStyle[] = [
  {
    id: 'possession',
    name: 'ポゼッションの鬼',
    emoji: '🧠',
    keyword: '支配',
    desc: 'ボールを支配し続けるパスサッカーの信奉者。創造力と連携が飛躍的に向上する。',
    bonus: { attack: 2, defense: 0, creativity: 9, physical: 0, chemistry: 6 },
  },
  {
    id: 'counter',
    name: 'カウンターの達人',
    emoji: '⚡',
    keyword: '速攻',
    desc: '守備から鋭い速攻を展開し、スペースを突く戦術の名手。攻守の切替えが鋭く機能する。',
    bonus: { attack: 7, defense: 4, creativity: 0, physical: 4, chemistry: 0 },
  },
  {
    id: 'highpress',
    name: 'ハイプレスの狂信者',
    emoji: '🔥',
    keyword: '強度',
    desc: '全員が休まず走り続けるインテンシティ最優先の戦術家。フィジカルとチームの結束が強まる。',
    bonus: { attack: 3, defense: 3, creativity: 0, physical: 11, chemistry: 4 },
  },
  {
    id: 'defensive',
    name: '守備の鉄人',
    emoji: '🛡️',
    keyword: '堅守',
    desc: '鉄壁の守備ブロックを構築し、失点ゼロを至上とする守備の求道者。守備力が大幅強化される。',
    bonus: { attack: -4, defense: 15, creativity: 0, physical: 5, chemistry: 0 },
  },
  {
    id: 'attacking',
    name: '攻撃の魔術師',
    emoji: '⚽',
    keyword: '得点',
    desc: '攻撃こそ最大の防御を信念とし、ゴールを量産し続ける攻撃特化型の戦術家。攻撃力と創造力が爆発する。',
    bonus: { attack: 15, defense: -5, creativity: 6, physical: 0, chemistry: 0 },
  },
  {
    id: 'total',
    name: 'トータルフットボールの申し子',
    emoji: '👑',
    keyword: '万能',
    desc: '流動的なポジションチェンジと全員攻守で理想を体現する万能型の名将。すべての能力がバランスよく向上する。',
    bonus: { attack: 5, defense: 5, creativity: 5, physical: 5, chemistry: 9 },
  },
];

export const BONUS_LABELS: Record<keyof ManagerBonus, string> = {
  attack:    '攻撃',
  defense:   '守備',
  creativity:'創造',
  physical:  'FIZ',
  chemistry: '連携',
};
