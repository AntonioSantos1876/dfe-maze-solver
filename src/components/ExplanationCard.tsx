import React from 'react';
import { BookOpen } from 'lucide-react';

export function ExplanationCard() {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 w-full">
      <h3 className="text-lg font-bold mb-3 text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
        <BookOpen className="w-5 h-5" /> Depth First Search (DFS)
      </h3>
      
      <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          <strong>What is DFS?</strong> Depth-First Search is an uninformed traversing strategy that explores a single branch of the state-space tree as deeply as possible before backtracking.
        </p>
        <p>
          <strong>Backtracking:</strong> When the agent reaches a dead end (a node with no unvisited open neighbors), it backtracks by popping nodes off its LIFO (Last-In-First-Out) stack until it finds a node with unexplored valid paths.
        </p>
        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700 mt-4">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Difficulty Behavioral Differences</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Easy:</strong> Uses a <i>randomized</i> neighbor prioritization. It exemplifies pure uninformed search, resulting in chaotic pathing and high backtrack rates.</li>
            <li><strong>Medium:</strong> Uses a <i>strict, fixed</i> directional preference (e.g., Up, Down, Left, Right). It is rigidly systematic but still uninformed.</li>
            <li><strong>Hard:</strong> Uses a <i>goal-biased</i> ordering heuristic at branch points, sorting neighbors by Manhattan distance to the target. <br/><span className="text-indigo-600 dark:text-indigo-400 font-medium">Academically:</span> It remains strict DFS because it still commits entirely to branches via a stack, unlike Best-First or A* Search which evaluate global minimum cost from the frontier queue.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
