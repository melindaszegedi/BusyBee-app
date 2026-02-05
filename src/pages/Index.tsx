"use client";

import React, { useState } from 'react';
import { Sparkles, Zap, LayoutDashboard, Calendar as CalendarIcon, Settings, Hexagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';
import TaskItem, { Task } from '@/components/TaskItem';
import AddTask from '@/components/AddTask';
import CalendarSync from '@/components/CalendarSync';
import TimeBlocker from '@/components/TimeBlocker';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Finish React Project', duration: 120, difficulty: 'hard', category: 'study', completed: false },
    { id: '2', title: 'Email Professor', duration: 15, difficulty: 'easy', category: 'study', completed: true },
    { id: '3', title: 'Update Work Spreadsheet', duration: 45, difficulty: 'medium', category: 'work', completed: false },
  ]);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [isPrioritizing, setIsPrioritizing] = useState(false);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
      completed: false,
    };
    setTasks([task, ...tasks]);
    showSuccess("Task added to your BusyBee hive");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const runAIPrioritization = () => {
    setIsPrioritizing(true);
    setTimeout(() => {
      const sorted = [...tasks].sort((a, b) => {
        const difficultyMap = { hard: 3, medium: 2, easy: 1 };
        return difficultyMap[b.difficulty] - difficultyMap[a.difficulty];
      });
      setTasks(sorted);
      setIsPrioritizing(false);
      showSuccess("AI has optimized your hive for maximum productivity");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation */}
      <nav className="fixed left-0 top-0 h-full w-20 bg-white border-r border-slate-100 flex flex-col items-center py-8 gap-8 z-50 hidden md:flex">
        <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center text-slate-900 shadow-lg shadow-amber-100 transition-transform hover:scale-105 cursor-pointer">
          <Zap className="w-7 h-7 fill-current" />
        </div>
        <div className="flex flex-col gap-6 mt-8">
          <Button variant="ghost" size="icon" className="rounded-xl text-amber-600 bg-amber-50">
            <LayoutDashboard className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-amber-600">
            <CalendarIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-amber-600">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      <main className="md:ml-20 p-4 md:p-8 max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="md:hidden w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-slate-900">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                BusyBee
                <Hexagon className="w-4 h-4 text-amber-400 fill-amber-400" />
              </h1>
              <p className="text-slate-500 font-medium text-sm">Precision hive management for student-workers</p>
            </div>
          </div>
          
          <Button 
            onClick={runAIPrioritization}
            disabled={isPrioritizing}
            className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-6 py-6 shadow-xl shadow-slate-200 border-none transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isPrioritizing ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                Optimizing Hive...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                AI Prioritize
              </span>
            )}
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Tasks */}
          <div className="lg:col-span-7 space-y-6">
            <section>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                New Task
              </h2>
              <AddTask onAdd={handleAddTask} />
            </section>

            <section>
              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Active Tasks
                </h2>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100">
                  {tasks.filter(t => !t.completed).length} Remaining
                </span>
              </div>
              <div className="space-y-1">
                {tasks.map(task => (
                  <TaskItem key={task.id} task={task} onToggle={toggleTask} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Schedule & Sync */}
          <div className="lg:col-span-5 space-y-6">
            <section>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Integrations
              </h2>
              <CalendarSync 
                isConnected={isCalendarConnected} 
                onConnect={() => {
                  setIsCalendarConnected(true);
                  showSuccess("Google Calendar synced with hive");
                }} 
              />
            </section>

            <section>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Timeline
              </h2>
              <TimeBlocker tasks={tasks} />
            </section>

            <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl shadow-slate-200 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center text-slate-900">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <h3 className="font-bold text-lg">Hive Status</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  BusyBee is currently balancing your 4pm shift with your 6pm study group. Your efficiency is up 12% today.
                </p>
              </div>
              <Hexagon className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 rotate-12 transition-transform group-hover:scale-110" />
            </div>
          </div>
        </div>
        
        <footer className="mt-20 pb-10">
          <MadeWithDyad />
        </footer>
      </main>
    </div>
  );
};

export default Index;