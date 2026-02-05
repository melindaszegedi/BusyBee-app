"use client";

import React, { useState } from 'react';
import { Plus, Clock, Hexagon } from 'lucide-react';
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
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex gap-2">
        <Input 
          placeholder="What's the next buzz?" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-slate-50 border-none shadow-none rounded-xl focus-visible:ring-amber-400"
        />
        <Button type="submit" className="bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-xl px-3 shadow-md shadow-amber-100">
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-xl border border-slate-100">
          <Clock className="w-4 h-4 text-slate-400" />
          <input 
            type="number" 
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-12 text-sm font-medium bg-transparent focus:outline-none"
          />
          <span className="text-xs text-slate-400">min</span>
        </div>

        <Select value={difficulty} onValueChange={(v) => setDifficulty(v as TaskDifficulty)}>
          <SelectTrigger className="w-[110px] bg-slate-50 border-none rounded-xl h-9 text-xs">
            <Hexagon className="w-3 h-3 mr-2 text-amber-500" />
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={(v) => setCategory(v as any)}>
          <SelectTrigger className="w-[110px] bg-slate-50 border-none rounded-xl h-9 text-xs">
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