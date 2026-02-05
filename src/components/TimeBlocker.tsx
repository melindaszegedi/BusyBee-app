"use client";

import React from 'react';
import { Task } from './TaskItem';
import { cn } from '@/lib/utils';

interface TimeBlockerProps {
  tasks: Task[];
}

const TimeBlocker = ({ tasks }: TimeBlockerProps) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-50 bg-slate-50/50">
        <h3 className="text-sm font-bold text-slate-800">Precision Schedule</h3>
        <p className="text-[10px] text-slate-500">To-the-minute visualization</p>
      </div>
      
      <div className="p-4 max-h-[400px] overflow-y-auto">
        <div className="relative space-y-6">
          {hours.map((hour) => (
            <div key={hour} className="flex gap-4 group">
              <div className="w-12 text-[10px] font-bold text-slate-400 pt-1">
                {hour}:00
              </div>
              <div className="flex-1 h-[1px] bg-slate-100 mt-3 relative">
                {/* Simulated task blocks would go here */}
                {hour === 10 && (
                  <div className="absolute top-0 left-0 right-4 h-12 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-2 z-10">
                    <p className="text-[10px] font-bold text-indigo-700">Study: Advanced Calculus</p>
                    <p className="text-[8px] text-indigo-500">10:00 - 11:30</p>
                  </div>
                )}
                {hour === 14 && (
                  <div className="absolute top-0 left-0 right-4 h-8 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg p-2 z-10">
                    <p className="text-[10px] font-bold text-emerald-700">Work: Team Sync</p>
                    <p className="text-[8px] text-emerald-500">14:00 - 14:45</p>
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