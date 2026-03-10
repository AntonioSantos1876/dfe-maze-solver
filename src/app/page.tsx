"use client";

import React, { useEffect } from 'react';
import { useMaze } from '@/hooks/useMaze';
import { MazeGrid } from '@/components/MazeGrid';
import { ControlPanel } from '@/components/ControlPanel';
import { StatsPanel } from '@/components/StatsPanel';
import { Legend } from '@/components/Legend';
import { ExplanationCard } from '@/components/ExplanationCard';

export default function Home() {
  const {
    grid, gameState, difficulty, setDifficulty, agentPos, stats, 
    speed, setSpeed, initMaze, startSimulation, pauseSimulation, 
    stepSimulation, resetReady, handleManualMove, setGameState
  } = useMaze();

  useEffect(() => {
    // Initialize default small maze on mount
    initMaze(10, 10);
  }, [initMaze]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for arrow keys when manually playing
      if (gameState === 'manual' || gameState === 'ready') {
        let handled = true;
        
        switch (e.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            handleManualMove(-1, 0);
            break;
          case 'ArrowDown':
          case 's':
          case 'S':
            handleManualMove(1, 0);
            break;
          case 'ArrowLeft':
          case 'a':
          case 'A':
            handleManualMove(0, -1);
            break;
          case 'ArrowRight':
          case 'd':
          case 'D':
            handleManualMove(0, 1);
            break;
          default:
            handled = false;
        }

        if (handled) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleManualMove]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
      <header className="bg-indigo-600 dark:bg-indigo-900 text-white py-6 px-4 shadow-md">
        <div className="max-w-7xl mx-auto space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">DFS Maze Solver</h1>
          <h2 className="text-sm font-medium text-indigo-100 dark:text-indigo-200 opacity-90">
            Web-Based Maze Navigation System Using Depth First Search with User-Selectable AI Difficulty Levels
          </h2>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Maze Visualization */}
          <div className="lg:col-span-2 space-y-4 flex flex-col items-center">
            {grid.length > 0 ? (
              <MazeGrid grid={grid} agentPos={agentPos} />
            ) : (
              <div className="flex items-center justify-center p-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-full aspect-square border border-gray-300 dark:border-gray-700 animate-pulse">
                <span className="text-gray-500 font-semibold">Generating Maze...</span>
              </div>
            )}
            <Legend />
          </div>

          {/* Right Column - Controls, Stats, Explanation */}
          <div className="space-y-4">
            <ControlPanel
              gameState={gameState}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              speed={speed}
              setSpeed={setSpeed}
              onGenerate={initMaze}
              onStart={startSimulation}
              onPause={pauseSimulation}
              onStep={stepSimulation}
              onReset={resetReady}
              onManualModeToggle={() => {
                if (gameState === 'manual') setGameState('ready');
                else setGameState('manual');
              }}
            />
            
            <StatsPanel stats={stats} gameState={gameState} />
            
            <ExplanationCard />
          </div>
        </div>
      </main>
    </div>
  );
}
