"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SummaryViewProps {
  type: 'weekly' | 'monthly';
  onClose: () => void;
}

const weeklyData = [
  { name: 'Mon', tasks: 4, focus: 120 },
  { name: 'Tue', tasks: 6, focus: 180 },
  { name: 'Wed', tasks: 3, focus: 90 },
  { name: 'Thu', tasks: 8, focus: 240 },
  { name: 'Fri', tasks: 5, focus: 150 },
  { name: 'Sat', tasks: 2, focus: 60 },
  { name: 'Sun', tasks: 1, focus: 30 },
];

const monthlyData = [
  { name: 'Week 1', tasks: 25, focus: 750 },
  { name: 'Week 2', tasks: 32, focus: 960 },
  { name: 'Week 3', tasks: 28, focus: 840 },
  { name: 'Week 4', tasks: 35, focus: 1050 },
];

const SummaryView = ({ type, onClose }: SummaryViewProps) => {
  const data = type === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-none overflow-hidden animate-in zoom-in-95 duration-300">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
          <div>
            <CardTitle className="text-xl font-black text-slate-800 capitalize">
              {type} Hive Overview
            </CardTitle>
            <CardDescription>Tracking your productivity cycles</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} 
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="tasks" fill="#fbbf24" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Tasks</p>
              <p className="text-2xl font-black text-slate-800">
                {data.reduce((acc, curr) => acc + curr.tasks, 0)}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Focus Hours</p>
              <p className="text-2xl font-black text-slate-800">
                {(data.reduce((acc, curr) => acc + curr.focus, 0) / 60).toFixed(1)}h
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Efficiency</p>
              <p className="text-2xl font-black text-emerald-600">+8.2%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryView;