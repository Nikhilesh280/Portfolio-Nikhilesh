"use client";

import React from "react";
import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";
import { timelineData } from "@/data/portfolio";
import * as Icons from "lucide-react";

export default function CareerTimeline() {
  return (
    <section id="timeline" className="w-full py-6">
      <SectionHeader title="Career Timeline" code="SYS_LOGS" subtitle="Sequential chronological logs & milestones" />

      <div className="relative border-l border-primary/20 ml-4 md:ml-6 pl-6 space-y-8 my-4">
        {/* Animated laser pointer pulse on vertical line */}
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-primary via-secondary/55 to-transparent pointer-events-none" />

        {timelineData.map((event) => {
          // Dynamic Icon resolver
          const IconComponent = (Icons as any)[event.iconName] || Icons.Cpu;

          return (
            <div key={event.id} className="relative group">
              {/* Timeline Bullet node */}
              <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#050816] border border-primary text-primary group-hover:bg-primary group-hover:text-[#050816] shadow-[0_0_10px_rgba(0,245,212,0.3)] transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                
                {/* Event Metadata (Date & Badge): 1 column */}
                <div className="font-mono text-xs space-y-1 lg:pt-1">
                  <div className="text-primary font-bold">{event.date}</div>
                  <div className="text-slate-400 text-[10px]">{event.organization}</div>
                  <div className="pt-1">
                    <StatusBadge
                      status={event.type}
                      type={
                        event.type === "experience"
                          ? "success"
                          : event.type === "achievement"
                          ? "warning"
                          : event.type === "education"
                          ? "info"
                          : "neutral"
                      }
                    />
                  </div>
                </div>

                {/* Event Description Card: 3 columns */}
                <div className="lg:col-span-3">
                  <GlassCard className="p-4 space-y-2 hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-2 text-white font-bold text-sm uppercase">
                      <IconComponent size={14} className="text-primary shrink-0" />
                      <span>{event.title}</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 font-sans text-xs md:text-sm text-slate-300">
                      {event.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
