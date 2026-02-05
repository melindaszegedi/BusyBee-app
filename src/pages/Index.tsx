"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, LayoutDashboard, Calendar as CalendarIcon, Settings } from 'lucide-react';
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
    showSuccess("Task added to your BusyBee flow");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const runAIPrioritization = () => {
    setIsPrioritizing(true);
    // Simulate AI thinking
    setTimeout(() => {
      const sorted = [...tasks].sort((a, b) => {
        const difficultyMap = { hard: 3, medium: 2, easy: 1 };
        return difficultyMap[b.difficulty] - difficultyMap[a.difficulty];
      });
      setTasks(sorted);
      setIsPrioritizing(false);
      showSuccess("AI has optimized your schedule for maximum efficiency");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed left-0 top-0 h-full w-20 bg-white border-r border-slate-100 flex flex-col items-center py-8 gap-8 z-50 hidden md:flex">
        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <Brain className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-6 mt-8">
          <Button variant="ghost" size="icon" className="rounded-xl text-indigo-600 bg-indigo-50">
            <LayoutDashboard className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-indigo-600">
            <CalendarIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-indigo-600">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      <main className="md:ml-20 p-4 md:p-8 max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">BusyBee</h1>
            <p className="text-slate-500 font-medium">Precision management for student-workers</p>
          </div>
          
          <Button 
            onClick={runAIPrioritization}
            disabled={isPrioritizing}
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-2xl px-6 py-6 shadow-xl shadow-indigo-100 border-none transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isPrioritizing ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                Optimizing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                AI Prioritize
              </span>
            )}
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Tasks */}
          <div className="lg:col-span-7 space-y-6">
            <section>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Add Task</h2>
              <AddTask onAdd={handleAddTask} />
            </section>

            <section>
              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Tasks</h2>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
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
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Integrations</h2>
              <CalendarSync 
                isConnected={isCalendarConnected} 
                onConnect={() => {
                  setIsCalendarConnected(true);
                  showSuccess("Google Calendar connected successfully");
                }} 
              />
            </section>

            <section>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Timeline</h2>
              <TimeBlocker tasks={tasks} />
            </section>

            <div className="p-6 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-1">Student-Worker Mode</h3>
                <p className="text-indigo-100 text-xs leading-relaxed">
                  BusyBee is currently balancing your 4pm shift with your 6pm study group.
                </p>
              </div>
              <Brain className="absolute -right-4 -bottom-4 w-24 h-24 text-indigo-500/30 rotate-12" />
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