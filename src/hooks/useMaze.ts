import { useState, useCallback, useRef } from 'react';
import { GridCell, Position, Difficulty, GameState, Stats } from '../types';
import { generateMaze } from '../lib/mazeGenerator';
import { createDfsGenerator, SearchStep } from '../lib/dfsSolver';

export function useMaze() {
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [agentPos, setAgentPos] = useState<Position | null>(null);
  const [startPos, setStartPos] = useState<Position | null>(null);
  const [goalPos, setGoalPos] = useState<Position | null>(null);
  const [stats, setStats] = useState<Stats>({
    visitedCount: 0, backtrackCount: 0, pathLength: 0, elapsedTime: 0
  });
  
  const [speed, setSpeed] = useState<number>(50); // ms per step

  const generatorRef = useRef<Generator<SearchStep, SearchStep, unknown> | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const initMaze = useCallback((width: number, height: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    generatorRef.current = null;
    
    setGameState('generating');
    const newGrid = generateMaze(width, height);
    
    let start: Position | null = null;
    let goal: Position | null = null;
    for (let r = 0; r < newGrid.length; r++) {
      for (let c = 0; c < newGrid[0].length; c++) {
        if (newGrid[r][c].isStart) start = { r, c };
        if (newGrid[r][c].isGoal) goal = { r, c };
      }
    }
    
    setGrid(newGrid);
    setStartPos(start);
    setGoalPos(goal);
    setAgentPos(start);
    setStats({ visitedCount: 0, backtrackCount: 0, pathLength: 0, elapsedTime: 0 });
    setGameState('ready');
  }, []);

  const stepSimulation = useCallback(() => {
    if (!generatorRef.current) return;
    
    const result = generatorRef.current.next();
    if (result.value) {
      setGrid(result.value.grid);
      setAgentPos(result.value.agentPos);
      setStats(result.value.stats);
    }
    
    if (result.done || (result.value && result.value.isSolved)) {
      if (timerRef.current) clearInterval(timerRef.current);
      setGameState('solved');
    }
  }, []);

  const startSimulation = useCallback(() => {
    if (gameState === 'idle' || gameState === 'generating' || gameState === 'solved') return;
    
    if (gameState === 'ready' || gameState === 'manual') {
      if (!startPos || !goalPos) return;
      generatorRef.current = createDfsGenerator(grid, startPos, goalPos, difficulty);
    }
    
    setGameState('running');
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(stepSimulation, speed);
  }, [gameState, grid, startPos, goalPos, difficulty, speed, stepSimulation]);

  const pauseSimulation = useCallback(() => {
    if (gameState === 'running') {
      if (timerRef.current) clearInterval(timerRef.current);
      setGameState('paused');
    }
  }, [gameState]);

  const resetReady = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    generatorRef.current = null;
    
    const resetGrid = grid.map(row => row.map(cell => ({
      ...cell,
      status: 'unvisited' as const
    })));
    
    setGrid(resetGrid);
    setAgentPos(startPos);
    setStats({ visitedCount: 0, backtrackCount: 0, pathLength: 0, elapsedTime: 0 });
    setGameState('ready');
  }, [grid, startPos]);

  const handleManualMove = useCallback((dr: number, dc: number) => {
    if (gameState !== 'manual' && gameState !== 'ready') return;
    if (gameState === 'ready') setGameState('manual');
    
    if (!agentPos || !goalPos) return;
    
    const nr = agentPos.r + dr;
    const nc = agentPos.c + dc;
    
    if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc].type === 'open') {
      const newGrid = grid.map(row => row.map(c => ({...c})));
      newGrid[nr][nc].status = 'path';
      
      setGrid(newGrid);
      setAgentPos({ r: nr, c: nc });
      
      setStats(prev => ({
        ...prev,
        pathLength: prev.pathLength + 1,
        visitedCount: prev.visitedCount + 1
      }));
      
      if (nr === goalPos.r && nc === goalPos.c) {
        setGameState('manual-won');
      }
    }
  }, [agentPos, goalPos, grid, gameState]);

  return {
    grid,
    gameState,
    difficulty,
    setDifficulty,
    agentPos,
    stats,
    speed,
    setSpeed,
    initMaze,
    startSimulation,
    pauseSimulation,
    stepSimulation,
    resetReady,
    handleManualMove,
    setGameState
  };
}
