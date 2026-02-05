"use client";

import React, { useState } from 'react';
import { Sparkles, LayoutDashboard, Calendar as CalendarIcon, Settings, Hexagon, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';
import TaskItem, { Task } from '@/components/TaskItem';
import AddTask from '@/components/AddTask';
import CalendarSync from '@/components/CalendarSync';
import TimeBlocker from '@/components/TimeBlocker';
import HiveInsights from '@/components/HiveInsights';
import SummaryDropdown from '@/components/SummaryDropdown';
import SummaryView from '@/components/SummaryView';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { BeeIcon } from '@/components/Icons';
import { cn } from '@/lib/utils';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Finish React Project', duration: 120, buzzLevel: 9, category: 'study', completed: false },
    { id: '2', title: 'Email Professor', duration: 15, buzzLevel: 2, category: 'study', completed: true },
    { id: '3', title: 'Update Work Spreadsheet', duration: 45, buzzLevel: 5, category: 'work', completed: false },
  ]);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [isPrioritizing, setIsPrioritizing] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [currentView, setCurrentView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

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
      const sorted = [...tasks].sort((a, b) => b.buzzLevel - a.buzzLevel);
      setTasks(sorted);
      setIsPrioritizing(false);
      showSuccess("AI has optimized your hive for maximum productivity");
    }, 1500);
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 font-sans selection:bg-amber-100 selection:text-amber-900",
      isFocusMode ? "bg-slate-950 text-slate-100" : "bg-[#FAFAFA] text-slate-900"
    )}>
      {/* Navigation */}
      <nav className={cn(
        "fixed left-0 top-0 h-full w-20 border-r flex flex-col items-center py-8 gap-8 z-50 hidden md:flex transition-colors duration-500",
        isFocusMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
      )}>
        <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center text-slate-900 shadow-lg shadow-amber-100 transition-transform hover:scale-105 cursor-pointer">
          <BeeIcon className="w-7 h-7" />
        </div>
        <div className="flex flex-col gap-6 mt-8">
          <Button variant="ghost" size="icon" className={cn("rounded-xl", isFocusMode ? "text-amber-400 bg-slate-800" : "text-amber-600 bg-amber-50")}>
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
              <BeeIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className={cn("text-3xl font-black tracking-tight flex items-center gap-2", isFocusMode ? "text-white" : "text-slate-900")}>
                BusyBee
                <Hexagon className="w-4 h-4 text-amber-400 fill-amber-400" />
              </h1>
              <p className="text-slate-500 font-medium text-sm">Precision hive management for student-workers</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <SummaryDropdown currentView={currentView} onViewChange={setCurrentView} />
            
            <Button
              variant="outline"
              onClick={() => setIsFocusMode(!isFocusMode)}
              className={cn(
                "rounded-2xl px-4 py-6 border-2 transition-all hidden sm:flex",
                isFocusMode 
                  ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700" 
                  : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
              )}
            >
              {isFocusMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
              {isFocusMode ? "Exit Focus" : "Focus Mode"}
            </Button>

            <Button 
              onClick={runAIPrioritization}
              disabled={isPrioritizing}
              className={cn(
                "rounded-2xl px-6 py-6 shadow-xl border-none transition-all hover:scale-[1.02] active:scale-[0.98]",
                isFocusMode ? "bg-amber-400 text-slate-900 hover:bg-amber-300" : "bg-slate-900 text-white hover:bg-slate-800"
              )}
            >
              {isPrioritizing ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                  Optimizing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  AI Prioritize
                </span>
              )}
            </Button>
          </div>
        </header>

        {currentView !== 'daily' && (
          <div className="mb-8">
            <SummaryView view={currentView} tasks={tasks} />
          </div>
        )}

        <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 transition-opacity duration-500", isFocusMode && "opacity-90")}>
          {/* Left Column: Tasks */}
          <div className="lg:col-span-7 space-y-6">
            {!isFocusMode && currentView === 'daily' && (
              <section className="animate-in fade-in slide-in-from-top-4 duration-500">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  New Task
                </h2>
                <AddTask onAdd={handleAddTask} />
              </section>
            )}

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {isFocusMode ? "Current Focus" : currentView === 'daily' ? "Active Tasks" : `${currentView} Task List`}
                </h2>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100">
                  {tasks.filter(t => !t.completed).length} Remaining
                </span>
              </div>
              <div className={cn(
                "space-y-1 transition-all",
                isFocusMode ? "bg-slate-900/50 p-4 rounded-3xl border border-slate-800" : ""
              )}>
                {tasks.map(task => (
                  <TaskItem key={task.id} task={task} onToggle={toggleTask} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Schedule & Sync */}
          <div className="lg:col-span-5 space-y-6">
            <section className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Hive Insights
              </h2>
              <HiveInsights tasks={tasks} />
            </section>

            {!isFocusMode && (
              <section className="animate-in fade-in slide-in-from-right-4 duration-700">
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
            )}

            <section className="animate-in fade-in slide-in-from-right-4 duration-1000">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Timeline
              </h2>
              <TimeBlocker tasks={tasks} />
            </section>
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