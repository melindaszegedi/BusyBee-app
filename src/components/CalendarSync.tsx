"use client";

import React from 'react';
import { Calendar as CalendarIcon, RefreshCw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarSyncProps {
  isConnected: boolean;
  onConnect: () => void;
}

const CalendarSync = ({ isConnected, onConnect }: CalendarSyncProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={isConnected ? "text-blue-500" : "text-slate-400"}>
          <CalendarIcon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">Google Calendar</p>
          <p className="text-[10px] text-slate-500">
            {isConnected ? "Synced: 4 events today" : "Not connected"}
          </p>
        </div>
      </div>
      
      <Button 
        variant={isConnected ? "outline" : "default"}
        size="sm"
        onClick={onConnect}
        className={isConnected ? "rounded-xl border-slate-200 text-slate-600" : "rounded-xl bg-blue-600 hover:bg-blue-700"}
      >
        {isConnected ? (
          <>
            <Check className="w-3 h-3 mr-2" />
            Synced
          </>
        ) : (
          <>
            <RefreshCw className="w-3 h-3 mr-2" />
            Connect
          </>
        )}
      </Button>
    </div>
  );
};

export default CalendarSync;