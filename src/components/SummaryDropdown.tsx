"use client";

import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, BarChart3, CalendarDays, CalendarRange } from 'lucide-react';

interface SummaryDropdownProps {
  currentView: 'daily' | 'weekly' | 'monthly';
  onViewChange: (view: 'daily' | 'weekly' | 'monthly') => void;
}

const SummaryDropdown = ({ currentView, onViewChange }: SummaryDropdownProps) => {
  const viewLabels = {
    daily: "Daily Overview",
    weekly: "Weekly Overview",
    monthly: "Monthly Overview"
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-2xl border-slate-100 bg-white text-slate-600 hover:bg-slate-50 gap-2">
          <BarChart3 className="w-4 h-4 text-amber-500" />
          <span className="hidden sm:inline">{viewLabels[currentView]}</span>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-slate-100 shadow-xl">
        <DropdownMenuLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1.5">
          Select View
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-50" />
        <DropdownMenuItem 
          onClick={() => onViewChange('daily')}
          className="rounded-xl gap-3 py-2.5 cursor-pointer focus:bg-amber-50 focus:text-amber-900"
        >
          <BarChart3 className="w-4 h-4" />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Daily</span>
            <span className="text-[10px] opacity-70">Today's bizz</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onViewChange('weekly')}
          className="rounded-xl gap-3 py-2.5 cursor-pointer focus:bg-amber-50 focus:text-amber-900"
        >
          <CalendarDays className="w-4 h-4" />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Weekly</span>
            <span className="text-[10px] opacity-70">Last 7 days</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onViewChange('monthly')}
          className="rounded-xl gap-3 py-2.5 cursor-pointer focus:bg-amber-50 focus:text-amber-900"
        >
          <CalendarRange className="w-4 h-4" />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Monthly</span>
            <span className="text-[10px] opacity-70">Current month</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SummaryDropdown;