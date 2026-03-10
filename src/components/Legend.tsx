import React from 'react';

export function Legend() {
  const items = [
    { label: 'Start', bg: 'bg-emerald-500' },
    { label: 'Goal', bg: 'bg-rose-500' },
    { label: 'Wall', bg: 'bg-slate-800' },
    { label: 'Open', bg: 'bg-slate-100' },
    { label: 'Visited', bg: 'bg-sky-400 opacity-60' },
    { label: 'Dead End', bg: 'bg-indigo-300 opacity-40' },
    { label: 'Path', bg: 'bg-amber-400' },
    { label: 'AI/Player', bg: 'bg-purple-500' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 w-full mb-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Legend</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-sm border border-gray-300 dark:border-gray-600 ${item.bg}`} />
            <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
