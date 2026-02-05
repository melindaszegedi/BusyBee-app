"use client";

import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BeeIcon, HornetIcon } from './Icons';

export interface Task {
  id: string;
  title: string;
  duration: number;
  buzzLevel: number; // 0-10 scale
  category: 'study' | 'work' | 'personal';
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  const isHighStress = task.buzzLevel > 7;
  
  return (
    <div className={cn(
      "group flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-sm",
      task.completed && "opacity-50"
    )}>
      <button 
        onClick={() => onToggle(task.id)}
        className="text-slate-400 hover:text-amber-600 transition-colors"
      >
        {task.completed ? <CheckCircle2 className="w-6 h-6 text-amber-600" /> : <Circle className="w-6 h-6" />}
      </button>
      
      <div className="flex-1 min-w-0">
        <h3 className={cn("font-medium text-slate-800 truncate", task.completed && "line-through")}>
          {task.title}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            {task.duration}m
          </span>
          
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-500",
                  task.buzzLevel < 4 ? "bg-emerald-400" : 
                  task.buzzLevel < 8 ? "bg-amber-400" : "bg-rose-500"
                )}
                style={{ width: `${task.buzzLevel * 10}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              {task.buzzLevel}/10
            </span>
          </div>

          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            {task.category}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center w-8 h-8">
        {task.buzzLevel > 5 ? (
          <HornetIcon className={cn("w-5 h-5", isHighStress ? "text-rose-500 animate-bounce" : "text-amber-600")} />
        ) : (
          <BeeIcon className="w-5 h-5 text-emerald-500" />
        )}
      </div>
    </div>
  );
};

export default TaskItem;