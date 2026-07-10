"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import { skillsData } from "@/data/portfolio";
import { ShieldAlert, BarChart3 } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

import { playClick, playHover } from "@/utils/audio";

const radarData = [
  { subject: "Cryptography", A: 95, fullMark: 100 },
  { subject: "Cloud Security", A: 90, fullMark: 100 },
  { subject: "API Integration", A: 85, fullMark: 100 },
  { subject: "Web Pen-Testing", A: 80, fullMark: 100 },
  { subject: "Database Security", A: 85, fullMark: 100 },
  { subject: "System Auditing", A: 75, fullMark: 100 },
];

export default function ThreatIntelligence() {
  const [activeTab, setActiveTab] = useState(skillsData[0].id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeCategory = skillsData.find((cat) => cat.id === activeTab) || skillsData[0];

  return (
    <section id="skills" className="w-full py-6">
      <SectionHeader title="Threat Intelligence" code="SKILLS_LOG" subtitle="System skill indexes & cryptographic matrices" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Skills Tab & Bars Panel: 3 Columns */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <GlassCard headerText="CORE_CAPABILITIES">
            
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-primary/10 pb-4">
              {skillsData.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    playClick();
                    setActiveTab(category.id);
                  }}
                  onMouseEnter={playHover}
                  className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase border transition-all duration-300 cursor-pointer relative ${
                    activeTab === category.id
                      ? "border-primary text-primary font-bold"
                      : "border-primary/20 text-slate-400 hover:border-primary/50 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{category.name}</span>
                  {activeTab === category.id && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 bg-primary/10 rounded"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Skill list inside active category */}
            <div className="space-y-5">
              {activeCategory.skills.map((skill, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-200">{skill.name}</span>
                    <span className="text-primary font-bold">{skill.level}%</span>
                  </div>
                  {/* Outer Bar */}
                  <div className="h-3 w-full bg-primary/5 border border-primary/20 rounded overflow-hidden relative">
                    {/* Laser highlight line */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary/40 to-primary relative"
                    >
                      {/* Laser pointer pulse on head of loading bar */}
                      <span className="absolute right-0 top-0 h-full w-1 bg-white animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Operational directives indicator */}
            <div className="flex gap-2 p-3 bg-primary/5 border border-primary/10 rounded mt-6 text-[10px] font-mono text-slate-400 leading-normal">
              <ShieldAlert size={14} className="text-primary shrink-0" />
              <span>Skill capabilities audited using local academic validations, verified projects, and public credentials.</span>
            </div>

          </GlassCard>
        </div>

        {/* Recharts Radar Matrix Panel: 2 Columns */}
        <div className="lg:col-span-2">
          <GlassCard headerText="TACTICAL_MATRIX_RADAR" className="h-full items-center justify-center">
            
            <div className="w-full h-[260px] md:h-[300px] flex items-center justify-center relative">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="rgba(0, 245, 212, 0.15)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      stroke="#a0aec0"
                      tick={{ fontSize: 10, fontFamily: "var(--font-jetbrains-mono)" }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      stroke="rgba(0, 245, 212, 0.2)"
                      tick={{ fontSize: 8 }}
                    />
                    <Radar
                      name="Capability Index"
                      dataKey="A"
                      stroke="#00f5d4"
                      fill="#00f5d4"
                      fillOpacity={0.15}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 font-mono text-xs text-muted">
                  <BarChart3 className="animate-spin text-primary" size={24} />
                  <span>CALCULATING VECTOR SPACE MATRIX...</span>
                </div>
              )}
            </div>

            <div className="text-center font-mono text-[9px] text-slate-400 border-t border-primary/5 pt-3 w-full">
              VECTOR AXIS MODEL V2.8 — PLOTTING TACTICAL FIELD CAPABILITIES
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
