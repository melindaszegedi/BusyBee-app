"use client";

import React from 'react';
import { Task } from './TaskItem';
import { cn } from '@/lib/utils';

interface TimeBlockerProps {
  tasks: Task[];
}

const TimeBlocker = ({ tasks }: TimeBlockerProps) => {
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM
  
  // Filter only uncompleted tasks for the schedule
  const activeTasks = tasks.filter(t => !t.completed);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Precision Schedule</h3>
          <p className="text-[10px] text-slate-500">To-the-minute visualization</p>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <div className="w-2 h-2 rounded-full bg-rose-500" />
        </div>
      </div>
      
      <div className="p-4 max-h-[400px] overflow-y-auto scrollbar-hide">
        <div className="relative space-y-8">
          {hours.map((hour, index) => (
            <div key={hour} className="flex gap-4 group relative">
              <div className="w-12 text-[10px] font-bold text-slate-400 pt-1">
                {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
              </div>
              <div className="flex-1 h-[1px] bg-slate-100 mt-3 relative">
                {/* Render tasks at specific slots for demo purposes */}
                {index === 1 && activeTasks[0] && (
                  <div className="absolute top-0 left-0 right-4 h-16 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl p-2 z-10 shadow-sm animate-in fade-in slide-in-from-left-2">
                    <p className="text-[10px] font-bold text-indigo-700 truncate">{activeTasks[0].title}</p>
                    <p className="text-[8px] text-indigo-500">{activeTasks[0].duration} mins • {activeTasks[0].category}</p>
                  </div>
                )}
                {index === 4 && activeTasks[1] && (
                  <div className="absolute top-0 left-0 right-4 h-12 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-2 z-10 shadow-sm animate-in fade-in slide-in-from-left-2">
                    <p className="text-[10px] font-bold text-amber-700 truncate">{activeTasks[1].title}</p>
                    <p className="text-[8px] text-amber-500">{activeTasks[1].duration} mins • {activeTasks[1].category}</p>
                  </div>
                )}
                {index === 7 && activeTasks[2] && (
                  <div className="absolute top-0 left-0 right-4 h-10 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl p-2 z-10 shadow-sm animate-in fade-in slide-in-from-left-2">
                    <p className="text-[10px] font-bold text-rose-700 truncate">{activeTasks[2].title}</p>
                    <p className="text-[8px] text-rose-500">{activeTasks[2].duration} mins • {activeTasks[2].category}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeBlocker;