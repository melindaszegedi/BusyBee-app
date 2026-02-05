"use client";

import React from 'react';
import { Task } from './TaskItem';
import { TrendingUp, Zap, Clock, Target } from 'lucide-react';

interface HiveInsightsProps {
  tasks: Task[];
}

const HiveInsights = ({ tasks }: HiveInsightsProps) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  const totalMinutes = tasks.reduce((acc, t) => acc + (t.completed ? t.duration : 0), 0);
  const avgBuzz = tasks.length > 0 
    ? (tasks.reduce((acc, t) => acc + t.buzzLevel, 0) / tasks.length).toFixed(1) 
    : 0;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
            <Target className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Progress</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-black text-slate-800">{Math.round(progress)}%</span>
          <span className="text-[10px] text-slate-400 mb-1 font-bold">of hive tasks</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Buzz</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-black text-slate-800">{avgBuzz}</span>
          <span className="text-[10px] text-slate-400 mb-1 font-bold">intensity</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Focus Time</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-black text-slate-800">{totalMinutes}</span>
          <span className="text-[10px] text-slate-400 mb-1 font-bold">mins today</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Efficiency</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-black text-slate-800">+12%</span>
          <span className="text-[10px] text-slate-400 mb-1 font-bold">vs yesterday</span>
        </div>
      </div>
    </div>
  );
};

export default HiveInsights;