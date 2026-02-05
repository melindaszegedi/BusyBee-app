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
    {/* Body */}
    <ellipse cx="12" cy="13" rx="6" ry="5" fill="currentColor" fillOpacity="0.1" />
    {/* Stripes */}
    <path d="M10 8.5v9M14 8.5v9" />
    {/* Wings */}
    <path d="M12 8c-1-3-4-4-6-2s-2 5 1 6" />
    <path d="M12 8c1-3 4-4 6-2s2 5-1 6" />
    {/* Antennae */}
    <path d="M10 8l-1-3M14 8l1-3" />
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