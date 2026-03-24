'use client';

import { useState, useRef } from 'react';
import type { Player, Formation, FormationSlot } from '@/types';
import { formations } from '@/lib/formations';
import HexChart from './HexChart';

interface TacticalBoardProps {
  players: (Player | null)[];
  formation: Formation;
  onSlotClick: (index: number) => void;
  onSwap?: (i: number, j: number) => void;
  onPositionChange?: (index: number, x: number, y: number) => void;
  chemistryPairs?: [number, number][];
  freeMode?: boolean;
  customPositions?: Record<number, { x: number; y: number }>;
}

interface FreeDragState {
  idx: number;
  startClientX: number;
  startClientY: number;
  currentX: number;
  currentY: number;
}

function PitchMarkings() {
  return (
    <svg viewBox="0 0 400 560" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <rect x="20" y="15" width="360" height="530" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <line x1="20" y1="280" x2="380" y2="280" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <circle cx="200" cy="280" r="52" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <circle cx="200" cy="280" r="3" fill="rgba(255,255,255,0.4)" />
      <rect x="90" y="15" width="220" height="90" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <rect x="148" y="15" width="104" height="38" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <circle cx="200" cy="75" r="2.5" fill="rgba(255,255,255,0.4)" />
      <path d="M 155 105 A 52 52 0 0 1 245 105" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <rect x="90" y="455" width="220" height="90" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <rect x="148" y="507" width="104" height="38" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <circle cx="200" cy="485" r="2.5" fill="rgba(255,255,255,0.4)" />
      <path d="M 155 455 A 52 52 0 0 0 245 455" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <path d="M 20 30 A 14 14 0 0 1 34 15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <path d="M 366 15 A 14 14 0 0 1 380 30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <path d="M 380 530 A 14 14 0 0 1 366 545" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <path d="M 34 545 A 14 14 0 0 1 20 530" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    </svg>
  );
}

interface PlayerTokenProps {
  player: Player | null;
  slot: FormationSlot;
  displayX: number;
  displayY: number;
  index: number;
  onClick: () => void;
  isDragging: boolean;
  isDragOver: boolean;
  isSwapped: boolean;
  freeMode: boolean;
  isFreeDragging: boolean;
  // Grid mode
  onDragStart: () => void;
  onGridDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onDragEnd: () => void;
  // Free mode
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
}

function PlayerToken({
  player, slot, displayX, displayY, onClick,
  isDragging, isDragOver, isSwapped,
  freeMode, isFreeDragging,
  onDragStart, onGridDragOver, onDrop, onDragEnd,
  onPointerDown, onPointerMove, onPointerUp,
}: PlayerTokenProps) {
  const [showChart, setShowChart] = useState(false);

  const wrapStyle: React.CSSProperties = {
    left: `${displayX}%`,
    top: `${displayY}%`,
    transform: 'translate(-50%, -50%)',
    zIndex: showChart ? 10 : isFreeDragging || isDragOver ? 5 : 1,
    transition: isFreeDragging ? 'none' : 'left 0.2s ease-out, top 0.2s ease-out',
  };

  if (!player) {
    return (
      <div
        className="absolute"
        style={wrapStyle}
        onDragOver={freeMode ? undefined : onGridDragOver}
        onDrop={freeMode ? undefined : onDrop}
      >
        <button
          onClick={onClick}
          className={`group flex flex-col items-center transition-all duration-200 ${isDragOver ? 'scale-110' : ''}`}
        >
          <div className={`w-12 h-12 rounded-full border-2 border-dashed flex flex-col items-center justify-center transition-all duration-200 ${
            isDragOver
              ? 'border-gold/80 bg-gold/20 shadow-gold'
              : 'border-white/25 group-hover:border-gold/70 group-hover:bg-gold/10 group-hover:shadow-gold'
          }`}>
            <span className={`text-lg transition-all ${isDragOver ? 'text-gold scale-125' : 'text-white/30 group-hover:text-gold'}`}>+</span>
          </div>
          <div className="mt-1 text-center text-[10px] text-white/30 group-hover:text-gold/70 font-bold tracking-wider">
            {slot.position}
          </div>
        </button>
      </div>
    );
  }

  return (
    <div
      className="absolute"
      style={wrapStyle}
      onDragOver={freeMode ? undefined : onGridDragOver}
      onDrop={freeMode ? undefined : onDrop}
    >
      {/* popup hex chart — hidden while dragging */}
      {showChart && !isFreeDragging && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-20 bg-luxury-card border border-gold/30 rounded-xl shadow-gold-lg p-3 animate-fade-in pointer-events-none">
          <p className="text-center text-white text-xs font-bold mb-1">{player.name}</p>
          <HexChart stats={player.stats} size={160} position={player.position} />
        </div>
      )}

      <button
        draggable={!freeMode}
        onClick={freeMode ? undefined : onClick}
        onMouseEnter={() => !isFreeDragging && setShowChart(true)}
        onMouseLeave={() => setShowChart(false)}
        onDragStart={freeMode ? undefined : (e) => {
          e.dataTransfer.effectAllowed = 'move';
          setShowChart(false);
          onDragStart();
        }}
        onDragEnd={freeMode ? undefined : onDragEnd}
        onPointerDown={freeMode ? (e) => {
          e.preventDefault();
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          setShowChart(false);
          onPointerDown(e);
        } : undefined}
        onPointerMove={freeMode ? onPointerMove : undefined}
        onPointerUp={freeMode ? onPointerUp : undefined}
        className={`group flex flex-col items-center transition-all duration-200 ${
          isDragging ? 'opacity-35 scale-90' : ''
        } ${isDragOver ? 'scale-115' : ''} ${isSwapped ? 'scale-125' : ''} ${
          isFreeDragging
            ? 'scale-110 cursor-grabbing drop-shadow-[0_4px_12px_rgba(212,175,55,0.6)]'
            : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        <div className={`relative w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center border-2 transition-all duration-200 ${
          isDragOver || isFreeDragging
            ? 'border-white shadow-[0_0_20px_rgba(212,175,55,0.8)]'
            : 'border-gold-light shadow-gold group-hover:shadow-gold-lg group-hover:scale-110'
        }`}>
          <span className="text-black font-black text-sm leading-none">{player.number || player.position}</span>
          <span className="absolute -top-1 -right-1 text-base leading-none">{player.flagEmoji}</span>
        </div>
        <div className="mt-1 max-w-[72px] text-center">
          <div className="text-[10px] font-bold text-white leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] truncate">
            {player.name.split(' ').slice(-1)[0]}
          </div>
        </div>
      </button>
    </div>
  );
}

export default function TacticalBoard({
  players,
  formation,
  onSlotClick,
  onSwap,
  onPositionChange,
  chemistryPairs = [],
  freeMode = false,
  customPositions = {},
}: TacticalBoardProps) {
  const slots = formations[formation];
  const boardRef = useRef<HTMLDivElement>(null);

  // Grid mode state
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [swappedPair, setSwappedPair] = useState<[number, number] | null>(null);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Free mode state
  const [freeDrag, setFreeDrag] = useState<FreeDragState | null>(null);

  function clientToPercent(clientX: number, clientY: number) {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return { x: 50, y: 50 };
    return {
      x: Math.max(3, Math.min(97, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.max(3, Math.min(97, ((clientY - rect.top) / rect.height) * 100)),
    };
  }

  function getDisplayPos(i: number): { x: number; y: number } {
    if (freeMode) {
      if (freeDrag?.idx === i) return { x: freeDrag.currentX, y: freeDrag.currentY };
      if (customPositions[i]) return customPositions[i];
    }
    return { x: slots[i].x, y: slots[i].y };
  }

  function handleDrop(targetIdx: number) {
    if (draggingIdx === null || draggingIdx === targetIdx) {
      setDraggingIdx(null);
      setDragOverIdx(null);
      return;
    }
    onSwap?.(draggingIdx, targetIdx);
    setSwappedPair([draggingIdx, targetIdx]);
    if (swapTimer.current) clearTimeout(swapTimer.current);
    swapTimer.current = setTimeout(() => setSwappedPair(null), 350);
    setDraggingIdx(null);
    setDragOverIdx(null);
  }

  function handleFreeDragStart(e: React.PointerEvent, idx: number) {
    const pos = getDisplayPos(idx);
    setFreeDrag({ idx, startClientX: e.clientX, startClientY: e.clientY, currentX: pos.x, currentY: pos.y });
  }

  function handleFreeDragMove(e: React.PointerEvent, idx: number) {
    if (!freeDrag || freeDrag.idx !== idx) return;
    const pos = clientToPercent(e.clientX, e.clientY);
    setFreeDrag(prev => prev ? { ...prev, currentX: pos.x, currentY: pos.y } : null);
  }

  function handleFreeDragEnd(e: React.PointerEvent, idx: number) {
    if (!freeDrag || freeDrag.idx !== idx) return;
    const dx = Math.abs(e.clientX - freeDrag.startClientX);
    const dy = Math.abs(e.clientY - freeDrag.startClientY);
    const finalPos = clientToPercent(e.clientX, e.clientY);
    setFreeDrag(null);
    if (dx > 8 || dy > 8) {
      onPositionChange?.(idx, finalPos.x, finalPos.y);
    } else {
      onSlotClick(idx);
    }
  }

  return (
    <div
      id="tactical-board"
      ref={boardRef}
      className="relative w-full"
      style={{ paddingBottom: '140%' }}
    >
      {/* field background */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{
              top: `${(i / 7) * 100}%`,
              height: `${100 / 7}%`,
              background: i % 2 === 0 ? 'rgba(45,90,39,1)' : 'rgba(38,78,33,1)',
            }}
          />
        ))}
        <PitchMarkings />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* chemistry lines — follow actual player positions in real time */}
      {chemistryPairs.length > 0 && (
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          style={{ zIndex: 2 }}
        >
          <defs>
            <filter id="chem-glow">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {chemistryPairs.map(([i, j], k) => {
            const p1 = getDisplayPos(i);
            const p2 = getDisplayPos(j);
            return (
              <g key={k}>
                <line
                  x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  stroke="rgba(212,175,55,0.07)"
                  strokeWidth="3"
                />
                <line
                  x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  stroke="rgba(212,175,55,0.28)"
                  strokeWidth="0.9"
                  strokeDasharray="3 2.5"
                  filter="url(#chem-glow)"
                  className="chemistry-line"
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* player tokens */}
      {slots.map((slot, i) => {
        const pos = getDisplayPos(i);
        return (
          <PlayerToken
            key={i}
            index={i}
            player={players[i] ?? null}
            slot={slot}
            displayX={pos.x}
            displayY={pos.y}
            onClick={() => onSlotClick(i)}
            isDragging={draggingIdx === i}
            isDragOver={dragOverIdx === i && draggingIdx !== i}
            isSwapped={swappedPair !== null && swappedPair.includes(i)}
            freeMode={freeMode}
            isFreeDragging={freeDrag?.idx === i}
            onDragStart={() => { setDraggingIdx(i); setDragOverIdx(null); }}
            onGridDragOver={(e) => { e.preventDefault(); setDragOverIdx(i); }}
            onDrop={() => handleDrop(i)}
            onDragEnd={() => { setDraggingIdx(null); setDragOverIdx(null); }}
            onPointerDown={(e) => handleFreeDragStart(e, i)}
            onPointerMove={(e) => handleFreeDragMove(e, i)}
            onPointerUp={(e) => handleFreeDragEnd(e, i)}
          />
        );
      })}
    </div>
  );
}
