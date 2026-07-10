"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  code: string;
  subtitle?: string;
}

export default function SectionHeader({ title, code, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-primary/20 pb-4 relative overflow-hidden w-full">
      {/* Laser horizontal line effect */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse-slow" />
      
      <div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-primary/70 tracking-widest bg-primary/5 px-2 py-0.5 border border-primary/20 rounded">
            SYS.{code}
          </span>
          <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-ping" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-1 uppercase font-sans">
          {title}
        </h2>
      </div>

      {subtitle && (
        <div className="mt-2 md:mt-0 font-mono text-xs text-muted max-w-xs md:text-right">
          // {subtitle}
        </div>
      )}
    </div>
  );
}
