"use client";

import React from "react";
import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import { personalInfo } from "@/data/portfolio";
import { GraduationCap, BookOpen, Target, Calendar } from "lucide-react";

export default function MissionBrief() {
  return (
    <section id="about" className="w-full py-6">
      <SectionHeader title="Mission Brief" code="ABOUT_ME" subtitle="SOC identity records & objectives" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core Profile */}
        <GlassCard headerText="TACTICAL_SUMMARY" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded border border-primary/20 text-primary">
              <Calendar size={18} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-muted uppercase">Active Service</div>
              <div className="text-sm font-bold text-white">Aug 2023 - Present</div>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            I am a security-focused developer currently pursuing my B.Tech at SRM University AP. My academic and project focus center on the structural intersections of <strong>cloud serverless systems</strong> and <strong>secure cryptographic storage models</strong>.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Having completed a Software Engineering internship at Salesforce, I understand the importance of secure, scalable APIs, and follow strict Agile methodologies to build and test resilient software.
          </p>
        </GlassCard>

        {/* Academic Training */}
        <GlassCard headerText="ACADEMIC_INTEL" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded border border-primary/20 text-primary">
              <GraduationCap size={18} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-muted uppercase">Degree Program</div>
              <div className="text-sm font-bold text-white">B.Tech in CSE</div>
            </div>
          </div>

          <div className="space-y-2 font-sans">
            <div className="text-xs text-muted font-mono">// INSTITUTIONAL PROFILE</div>
            <div className="text-sm font-bold text-white">{personalInfo.university}</div>
            <div className="text-xs text-primary font-mono">CGPA: {personalInfo.cgpa}</div>
          </div>

          <div className="space-y-2 border-t border-primary/10 pt-3">
            <div className="flex items-center gap-1 text-[10px] font-mono text-muted uppercase">
              <BookOpen size={10} />
              <span>Core Directives</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Data Structures",
                "DBMS",
                "Computer Networks",
                "Web Pen-Testing",
                "Cryptography",
                "Compiler Design"
              ].map((course, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Objective & Mission Focus */}
        <GlassCard headerText="OBJECTIVE_LOG" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded border border-primary/20 text-primary">
              <Target size={18} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-muted uppercase">Target Operations</div>
              <div className="text-sm font-bold text-white">Cybersecurity & Cloud</div>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            To leverage developer-grade programming in Python, Javascript, and APEX alongside security-first architectures to develop and auditing systems vulnerable to data manipulation or access override threats.
          </p>

          <div className="p-3 bg-red-500/5 border border-red-500/20 rounded font-mono text-[10px] leading-relaxed text-red-400">
            <strong>DIRECTIVE:</strong> Secure serverless deployment, lightweight cryptography integration, API route validation, audit-logging enforcement.
          </div>
        </GlassCard>

      </div>
    </section>
  );
}
