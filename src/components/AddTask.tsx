"use client";

import React, { useState } from 'react';
import { Plus, Clock, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task, TaskDifficulty } from './TaskItem';

interface AddTaskProps {
  onAdd: (task: Omit<Task, 'id' | 'completed'>) => void;
}

const AddTask = ({ onAdd }: AddTaskProps) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('30');
  const [difficulty, setDifficulty] = useState<TaskDifficulty>('medium');
  const [category, setCategory] = useState<'study' | 'work' | 'personal'>('study');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title,
      duration: parseInt(duration),
      difficulty,
      category,
    });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 p-4 rounded-3xl border border-slate-100 space-y-4">
      <div className="flex gap-2">
        <Input 
          placeholder="What needs to be done?" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-white border-none shadow-sm rounded-xl focus-visible:ring-indigo-500"
        />
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-3">
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl shadow-sm border border-slate-100">
          <Clock className="w-4 h-4 text-slate-400" />
          <input 
            type="number" 
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-12 text-sm font-medium focus:outline-none"
          />
          <span className="text-xs text-slate-400">min</span>
        </div>

        <Select value={difficulty} onValueChange={(v) => setDifficulty(v as TaskDifficulty)}>
          <SelectTrigger className="w-[110px] bg-white border-none shadow-sm rounded-xl h-9 text-xs">
            <Brain className="w-3 h-3 mr-2 text-indigo-500" />
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={(v) => setCategory(v as any)}>
          <SelectTrigger className="w-[110px] bg-white border-none shadow-sm rounded-xl h-9 text-xs">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="study">Study</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
};

export default AddTask;