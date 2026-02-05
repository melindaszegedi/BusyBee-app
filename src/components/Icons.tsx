"use client";

import React from 'react';

export const BeeIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="currentColor" fillOpacity="0.1" />
    <path d="M7 10c.5-1.5 2-2.5 3.5-2.5s3 1 3.5 2.5" />
    <path d="M10.5 14.5c.5 1.5 2 2.5 3.5 2.5s3-1 3.5-2.5" />
    <circle cx="8" cy="12" r="1" fill="currentColor" />
    <circle cx="16" cy="12" r="1" fill="currentColor" />
    <path d="M2 12h2M20 12h2" />
  </svg>
);

export const HornetIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22l-2-4-6-2 4-2 2-6 2 6 4 2-6 2-2 4z" fill="currentColor" fillOpacity="0.2" />
    <path d="M8 8l2 2M14 8l-2 2" />
    <path d="M9 15s1.5 2 3 2 3-2 3-2" />
    <path d="M2 2l4 4M22 2l-4 4" />
  </svg>
);