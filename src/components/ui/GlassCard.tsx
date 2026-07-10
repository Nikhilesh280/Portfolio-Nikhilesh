"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  headerText?: string;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  glow = false,
  headerText,
  onClick,
}: GlassCardProps) {
  const CardWrapper = onClick ? motion.button : motion.div;

  return (
    <CardWrapper
      onClick={onClick}
      whileHover={onClick ? { scale: 1.01 } : undefined}
      className={`glass-panel text-left w-full relative overflow-hidden rounded-lg p-5 flex flex-col transition-all duration-300 ${
        glow ? "glass-panel-active" : ""
      } ${onClick ? "cursor-pointer select-none focus:outline-none" : ""} ${className}`}
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/40" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/40" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/40" />

      {/* Cyber Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,245,212,0.03)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" />

      {headerText && (
        <div className="flex items-center justify-between border-b border-primary/10 pb-3 mb-4 text-xs font-mono tracking-widest text-primary/70 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span>{headerText}</span>
          </div>
          <div className="text-[10px] text-muted">SEC_SYS_V2.8</div>
        </div>
      )}

      <div className="relative z-10 w-full h-full flex flex-col">{children}</div>
    </CardWrapper>
  );
}
