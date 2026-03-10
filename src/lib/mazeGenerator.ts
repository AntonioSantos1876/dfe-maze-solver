import { GridCell, Position } from '../types';

/**
 * Generates a maze using Recursive Backtracking.
 * This ensures there is a fully connected spanning tree (i.e. guaranteed single path between any two points).
 * The grid returned uses a 2D array representation where walls are explicit cells.
 */
export function generateMaze(width: number, height: number): GridCell[][] {
  const rows = height * 2 + 1;
  const cols = width * 2 + 1;

  // Initialize all to walls
  const grid: GridCell[][] = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      type: 'wall',
      status: 'unvisited',
      isStart: false,
      isGoal: false,
    }))
  );

  const isValid = (r: number, c: number) => r > 0 && r < rows - 1 && c > 0 && c < cols - 1;

  const stack: Position[] = [];
  const startR = 1;
  const startC = 1;

  grid[startR][startC].type = 'open';
  stack.push({ r: startR, c: startC });

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    
    // Shuffle directions for organic maze generation
    const dirs = [
      { dr: -2, dc: 0 }, { dr: 2, dc: 0 },
      { dr: 0, dc: -2 }, { dr: 0, dc: 2 }
    ].sort(() => Math.random() - 0.5);

    let moved = false;
    for (const { dr, dc } of dirs) {
      const nr = current.r + dr;
      const nc = current.c + dc;

      if (isValid(nr, nc) && grid[nr][nc].type === 'wall') {
        grid[nr][nc].type = 'open';
        // Open the wall between the two cells
        grid[current.r + dr / 2][current.c + dc / 2].type = 'open';
        stack.push({ r: nr, c: nc });
        moved = true;
        break;
      }
    }

    if (!moved) {
      stack.pop();
    }
  }

  // Set default start and goal (top-left to bottom-right)
  grid[startR][startC].isStart = true;
  grid[rows - 2][cols - 2].isGoal = true;

  return grid;
}
