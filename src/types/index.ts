export interface PlayerStats {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defense: number;
  physical: number;
}

export type Position =
  | 'GK'
  | 'CB' | 'LB' | 'RB' | 'LWB' | 'RWB'
  | 'CDM' | 'CM' | 'CAM' | 'LM' | 'RM'
  | 'LW' | 'RW' | 'CF' | 'ST';

export interface Player {
  id: string;
  name: string;
  nationality: string;
  flagEmoji: string;
  club?: string;
  number: number;
  comment: string;
  position: Position;
  stats: PlayerStats;
  era?: string;
  description?: string;
}

export type Formation = '4-4-2' | '4-4-2D' | '4-3-3' | '4-2-3-1' | '3-5-2' | '3-4-3' | '4-2-4' | '3-2-2-3';

export interface FormationSlot {
  position: Position;
  x: number; // 0-100 (% from left)
  y: number; // 0-100 (% from top)
}

export interface EvaluateResponse {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defense: number;
  physical: number;
  position: Position;
  era: string;
  description: string;
  club?: string;
}
