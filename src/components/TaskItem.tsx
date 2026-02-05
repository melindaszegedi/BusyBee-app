"use client";

import React from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TaskDifficulty = 'easy' | 'medium' | 'hard';

export interface Task {
  id: string;
  title: string;
  duration: number; // in minutes
  difficulty: TaskDifficulty;
  category: 'study' | 'work' | 'personal';
  completed: boolean;
  startTime?: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  const difficultyColor = {
    easy: 'text-emerald-500 bg-emerald-50',
    medium: 'text-amber-500 bg-amber-50',
    hard: 'text-rose-500 bg-rose-50',
  };

  return (
    <div className={cn(
      "group flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-sm",
      task.completed && "opacity-50"
    )}>
      <button 
        onClick={() => onToggle(task.id)}
        className="text-slate-400 hover:text-indigo-600 transition-colors"
      >
        {task.completed ? <CheckCircle2 className="w-6 h-6 text-indigo-600" /> : <Circle className="w-6 h-6" />}
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
          <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider", difficultyColor[task.difficulty])}>
            {task.difficulty}
          </span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            {task.category}
          </span>
        </div>
      </div>

      {task.difficulty === 'hard' && !task.completed && (
        <div className="flex items-center gap-1 text-rose-500 animate-pulse">
          <AlertCircle className="w-4 h-4" />
          <span className="text-[10px] font-bold">PRIORITY</span>
        </div>
      )}
    </div>
  );
};

export default TaskItem;