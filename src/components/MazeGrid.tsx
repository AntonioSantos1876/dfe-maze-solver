import React from 'react';
import { GridCell, Position } from '../types';
import { motion } from 'framer-motion';

interface MazeGridProps {
  grid: GridCell[][];
  agentPos: Position | null;
}

export function MazeGrid({ grid, agentPos }: MazeGridProps) {
  if (!grid.length) return null;

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 bg-gray-900 rounded-xl shadow-2xl overflow-auto border border-gray-700 w-full max-w-full overflow-x-auto">
      <div 
        className="grid gap-[1px] bg-gray-600 p-[1px] rounded-sm"
        style={{
          gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`
        }}
      >
        {grid.map((row, r) => 
          row.map((cell, c) => {
            const isAgent = agentPos?.r === r && agentPos?.c === c;
            
            let cellColor = '';
            if (cell.type === 'wall') {
              cellColor = 'bg-slate-800';
            } else if (cell.isStart) {
              cellColor = 'bg-emerald-500';
            } else if (cell.isGoal) {
              cellColor = 'bg-rose-500';
            } else if (cell.status === 'path') {
              cellColor = 'bg-amber-400';
            } else if (cell.status === 'visited') {
              cellColor = 'bg-sky-400 opacity-60';
            } else if (cell.status === 'deadend') {
              cellColor = 'bg-indigo-300 opacity-40';
            } else {
              cellColor = 'bg-slate-100'; // Open unvisited
            }

            return (
              <div
                key={`${r}-${c}`}
                className={`w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 relative ${cellColor}`}
              >
                {isAgent && (
                  <motion.div
                    layoutId="agent"
                    className="absolute inset-0 m-[10%] bg-purple-500 rounded-full shadow-lg z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
