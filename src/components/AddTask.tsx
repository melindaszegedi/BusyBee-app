"use client";

import React, { useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Task } from './TaskItem';
import { BeeIcon, HornetIcon } from './Icons';

interface AddTaskProps {
  onAdd: (task: Omit<Task, 'id' | 'completed'>) => void;
}

const AddTask = ({ onAdd }: AddTaskProps) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('30');
  const [buzzLevel, setBuzzLevel] = useState([5]);
  const [category, setCategory] = useState<'study' | 'work' | 'personal'>('study');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title,
      duration: parseInt(duration),
      buzzLevel: buzzLevel[0],
      category,
    });
    setTitle('');
    setBuzzLevel([5]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-5">
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
      
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <BeeIcon className="w-3 h-3 text-emerald-500" />
            Bumblebee
          </div>
          <span className="text-xs font-black text-slate-600">Buzz Level: {buzzLevel[0]}</span>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
            Hornet
            <HornetIcon className="w-3 h-3 text-rose-500" />
          </div>
        </div>
        <Slider 
          value={buzzLevel} 
          onValueChange={setBuzzLevel} 
          max={10} 
          step={1} 
          className="py-2"
        />
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