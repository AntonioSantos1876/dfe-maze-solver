import React from 'react';
import { Stats, GameState } from '../types';
import { Clock, Route, Footprints, RotateCcw } from 'lucide-react';

interface StatsPanelProps {
  stats: Stats;
  gameState: GameState;
}

export function StatsPanel({ stats, gameState }: StatsPanelProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-4 w-full">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Live Statistics</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <Footprints className="text-sky-500 mb-1 w-5 h-5" />
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest text-center">Nodes Visited</span>
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{stats.visitedCount}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <RotateCcw className="text-indigo-400 mb-1 w-5 h-5" />
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest text-center">Backtracks</span>
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{stats.backtrackCount}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <Route className="text-amber-500 mb-1 w-5 h-5" />
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest text-center">Path Length</span>
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{stats.pathLength}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <Clock className="text-emerald-500 mb-1 w-5 h-5" />
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest text-center">Time (ms)</span>
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{stats.elapsedTime}</span>
        </div>
      </div>
      {gameState === 'solved' && (
        <div className="mt-4 p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-lg text-center font-bold text-sm animate-pulse">
          AI Found the Solution Path!
        </div>
      )}
      {gameState === 'manual-won' && (
        <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-lg text-center font-bold text-sm animate-pulse">
          You Reached the Goal!
        </div>
      )}
    </div>
  );
}
