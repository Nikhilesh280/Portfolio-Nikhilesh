import React from "react";

interface StatusBadgeProps {
  status: string;
  type?: "success" | "warning" | "error" | "info" | "neutral";
}

export default function StatusBadge({ status, type = "info" }: StatusBadgeProps) {
  const styles = {
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
    error: "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.1)]",
    info: "bg-primary/10 text-primary border-primary/30 shadow-[0_0_10px_rgba(0,245,212,0.1)]",
    neutral: "bg-slate-500/10 text-slate-400 border-slate-500/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider uppercase border ${styles[type]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {status}
    </span>
  );
}
