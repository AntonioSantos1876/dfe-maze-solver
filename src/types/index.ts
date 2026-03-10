export type Position = { r: number; c: number };

export type CellType = 'wall' | 'open';
// status tracked during DFS
export type CellStatus = 'unvisited' | 'visited' | 'deadend' | 'path';

export interface GridCell {
  row: number;
  col: number;
  type: CellType;
  status: CellStatus;
  isStart: boolean;
  isGoal: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameState = 'idle' | 'generating' | 'ready' | 'running' | 'paused' | 'solved' | 'manual' | 'manual-won';

export interface Stats {
  visitedCount: number;
  backtrackCount: number;
  pathLength: number;
  elapsedTime: number; // in ms
}
