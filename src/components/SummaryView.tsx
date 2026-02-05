"use client";

import React from 'react';
import { Task } from './TaskItem';
import { cn } from '@/lib/utils';
import { TrendingUp, CheckCircle2, Clock, Zap } from 'lucide-react';

interface SummaryViewProps {
  view: 'daily' | 'weekly' | 'monthly';
  tasks: Task[];
}

const SummaryView = ({ view, tasks }: SummaryViewProps) => {
  // Mock data for weekly/monthly as we only have current tasks
  const stats = {
    daily: { completed: tasks.filter(t => t.completed).length, total: tasks.length, time: 185, efficiency: "+12%" },
    weekly: { completed: 42, total: 50, time: 1240, efficiency: "+8%" },
    monthly: { completed: 156, total: 180, time: 4800, efficiency: "+15%" }
  };

  const currentStats = stats[view];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-black text-slate-800 capitalize">{view} Hive Summary</h3>
          <p className="text-xs text-slate-500">Performance metrics for this period</p>
        </div>
        <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {currentStats.efficiency}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Completion</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">{currentStats.completed}</span>
            <span className="text-sm text-slate-400 font-medium">/ {currentStats.total} tasks</span>
          </div>
          <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-400 transition-all duration-1000" 
              style={{ width: `${(currentStats.completed / currentStats.total) * 100}%` }} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Focus Time</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">{Math.floor(currentStats.time / 60)}h</span>
            <span className="text-sm text-slate-400 font-medium">{currentStats.time % 60}m total</span>
          </div>
          <p className="text-[10px] text-slate-400">Avg. {Math.round(currentStats.time / (view === 'daily' ? 1 : view === 'weekly' ? 7 : 30))}m per day</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-400">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Intensity</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">High</span>
            <span className="text-sm text-slate-400 font-medium">Buzz Level</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={cn("h-1.5 flex-1 rounded-full", i <= 4 ? "bg-amber-400" : "bg-slate-100")} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryView;