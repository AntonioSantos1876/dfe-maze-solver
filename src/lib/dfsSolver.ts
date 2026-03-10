import { GridCell, Position, Difficulty, Stats } from '../types';

export type SearchStep = {
  grid: GridCell[][];
  agentPos: Position;
  stats: Stats;
  isSolved: boolean;
};

/**
 * A generator function that yields each step of the DFS execution.
 * This allows the UI to animate the algorithm step-by-step.
 */
export function* createDfsGenerator(
  initialGrid: GridCell[][],
  start: Position,
  goal: Position,
  difficulty: Difficulty
): Generator<SearchStep, SearchStep, unknown> {
  // Deep clone to avoid mutating React state directly
  const grid = initialGrid.map(row => row.map(cell => ({ ...cell })));
  const stack: Position[] = [start];
  
  // Track ancestry for final path reconstruction
  const parentMap = new Map<string, string>();
  const toKey = (pos: Position) => `${pos.r},${pos.c}`;
  const fromKey = (key: string) => {
    const [r, c] = key.split(',').map(Number);
    return { r, c };
  };

  const stats: Stats = {
    visitedCount: 0,
    backtrackCount: 0,
    pathLength: 0,
    elapsedTime: 0
  };

  const startMs = Date.now();

  grid[start.r][start.c].status = 'visited';
  stats.visitedCount++;

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    stats.elapsedTime = Date.now() - startMs;
    
    // Yield current state for animation rendering
    yield {
      grid: grid.map(r => r.map(c => ({...c}))),
      agentPos: current,
      stats: { ...stats },
      isSolved: false
    };

    if (current.r === goal.r && current.c === goal.c) {
      // Reconstruct and highlight the final solution path
      let currPosKey = toKey(goal);
      const path: Position[] = [];
      while (currPosKey) {
        const p = fromKey(currPosKey);
        path.push(p);
        grid[p.r][p.c].status = 'path';
        currPosKey = parentMap.get(currPosKey) || '';
      }
      stats.pathLength = path.length;
      
      return {
        grid: grid.map(r => r.map(c => ({...c}))),
        agentPos: goal,
        stats: { ...stats },
        isSolved: true
      };
    }

    // Identify valid unvisited neighbors
    const validMoves = [
      { r: current.r - 1, c: current.c }, // UP
      { r: current.r + 1, c: current.c }, // DOWN
      { r: current.r, c: current.c - 1 }, // LEFT
      { r: current.r, c: current.c + 1 }  // RIGHT
    ].filter(n => 
      n.r >= 0 && n.r < grid.length && 
      n.c >= 0 && n.c < grid[0].length && 
      grid[n.r][n.c].type === 'open' && 
      grid[n.r][n.c].status === 'unvisited'
    );

    if (validMoves.length > 0) {
      let nextPos: Position;
      
      /*
       * ACADEMIC EXPLANATION OF DIFFICULTY DIFFERENCES
       * 
       * All difficulties use the exact same algorithm: Depth-First Search (DFS).
       * They explore a branch until hitting a dead end (or goal), then backtrack 
       * using a LIFO stack.
       * 
       * How the AI "difficulty" differs is simply the order in which child nodes 
       * are pushed onto the stack:
       * 
       * - Easy: Randomized ordering. The AI blindly searches the maze and frequently
       *   explores entirely wrong branches, demonstrating pure "uninformed search".
       * 
       * - Medium: Fixed directional priority. It still blindly searches, but its
       *   systematic nature prevents frantic oscillating behavior.
       * 
       * - Hard: Goal-biased ordering (heuristic). It sorts valid neighbors by their
       *   Manhattan distance to the goal, exploring the visually closest path first.
       *   Because it strictly uses a stack and backtracks entirely upon failure without
       *   evaluating global cost metrics (unlike A* or Dijkstra), it is STILL Depth First
       *   Search, just with locally intelligent branch decisions.
       */
      
      if (difficulty === 'easy') {
        // Random ordering
        nextPos = validMoves[Math.floor(Math.random() * validMoves.length)];
      } else if (difficulty === 'medium') {
        // Fixed preference (the array is ordered Up, Down, Left, Right)
        nextPos = validMoves[0]; 
      } else {
        // Goal biased
        validMoves.sort((a, b) => {
          const distA = Math.abs(a.r - goal.r) + Math.abs(a.c - goal.c);
          const distB = Math.abs(b.r - goal.r) + Math.abs(b.c - goal.c);
          return distA - distB; // smaller distance first
        });
        nextPos = validMoves[0];
      }

      grid[nextPos.r][nextPos.c].status = 'visited';
      parentMap.set(toKey(nextPos), toKey(current));
      stack.push(nextPos);
      stats.visitedCount++;
      
    } else {
      // Dead end encountered: backtrack
      grid[current.r][current.c].status = 'deadend';
      stack.pop();
      stats.backtrackCount++;
    }
  }

  // Fallback if no goal is reachable
  return {
    grid: grid.map(r => r.map(c => ({...c}))),
    agentPos: start,
    stats: { ...stats },
    isSolved: false
  };
}
