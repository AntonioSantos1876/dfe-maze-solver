import React, { useState } from 'react';
import { GameState, Difficulty } from '../types';
import { Play, Pause, SkipForward, RotateCcw, Settings, Grid, Gamepad2 } from 'lucide-react';

interface ControlPanelProps {
  gameState: GameState;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  speed: number;
  setSpeed: (s: number) => void;
  onGenerate: (width: number, height: number) => void;
  onStart: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onManualModeToggle: () => void;
}

export function ControlPanel({
  gameState, difficulty, setDifficulty, speed, setSpeed,
  onGenerate, onStart, onPause, onStep, onReset, onManualModeToggle
}: ControlPanelProps) {
  const [mazeSize, setMazeSize] = useState<number>(10);

  const isRunning = gameState === 'running';
  const isGenerating = gameState === 'generating';
  const isIdle = gameState === 'idle';

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 w-full mb-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100 flex items-center gap-2">
        <Settings className="w-5 h-5" /> Controls
      </h3>

      <div className="space-y-4">
        {/* Generation Controls */}
        <div className="flex items-center gap-2">
          <select
            value={mazeSize}
            onChange={e => setMazeSize(Number(e.target.value))}
            disabled={isRunning || isGenerating}
            className="flex-1 p-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-200"
          >
            <option value={5}>Small (5x5)</option>
            <option value={10}>Medium (10x10)</option>
            <option value={15}>Large (15x15)</option>
            <option value={20}>Huge (20x20)</option>
          </select>
          <button
            onClick={() => onGenerate(mazeSize, mazeSize)}
            disabled={isRunning || isGenerating}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium p-2 rounded-lg text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Grid className="w-4 h-4" /> New Maze
          </button>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* AI Setup */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">AI Difficulty (DFS Variant)</label>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                disabled={isRunning}
                className={`flex-1 capitalize p-1.5 text-sm rounded-lg border transition-colors ${
                  difficulty === d 
                    ? 'bg-purple-100 dark:bg-purple-900/40 border-purple-500 text-purple-700 dark:text-purple-300 font-bold' 
                    : 'bg-transparent border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                } disabled:opacity-50`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
           <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Animation Speed: {speed}ms</label>
           <input 
             type="range" min="10" max="500" step="10" value={speed} 
             onChange={e => setSpeed(Number(e.target.value))}
             className="w-full accent-indigo-600"
           />
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {!isRunning ? (
            <button
              onClick={onStart}
              disabled={isIdle || isGenerating || gameState === 'solved' || gameState === 'manual' || gameState === 'manual-won'}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold p-2 text-sm rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
            >
              <Play className="w-4 h-4" /> Start AI
            </button>
          ) : (
            <button
              onClick={onPause}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold p-2 text-sm rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Pause className="w-4 h-4" /> Pause
            </button>
          )}

          <button
            onClick={onStep}
            disabled={isRunning || isIdle || isGenerating || gameState === 'solved' || gameState === 'manual' || gameState === 'manual-won'}
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold p-2 text-sm rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
          >
            <SkipForward className="w-4 h-4" /> Step
          </button>

          <button
            onClick={onReset}
            disabled={isIdle || isGenerating}
            className="bg-slate-600 hover:bg-slate-700 text-white font-semibold p-2 text-sm rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>

          <button
            onClick={onManualModeToggle}
            disabled={isIdle || isGenerating || isRunning || gameState === 'solved'}
            className={`p-2 font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors ${
              gameState === 'manual' 
                ? 'bg-indigo-500 text-white border-transparent' 
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            } disabled:opacity-50`}
          >
            <Gamepad2 className="w-4 h-4" /> {gameState === 'manual' ? 'Playing' : 'Play Manually'}
          </button>
        </div>
      </div>
    </div>
  );
}
