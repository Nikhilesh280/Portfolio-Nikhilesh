"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileDown, ShieldCheck, Terminal, Cpu } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import StatusBadge from "../ui/StatusBadge";
import { personalInfo } from "@/data/portfolio";

const GithubIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function DashboardHero() {
  const [uptime, setUptime] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Cybersecurity Engineer",
    "Cloud Architect",
    "DevSecOps Practitioner",
    "Security Researcher",
  ];

  // Uptime ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 30 : 80;

    if (!isDeleting && displayText === currentRole) {
      // Pause before deleting
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <section id="hero" className="w-full py-6 flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Console Welcome: Columns 1 and 2 */}
        <div className="lg:col-span-2 flex flex-col gap-6 justify-between">
          <GlassCard headerText="COMMANDER PROFILE" className="h-full justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <StatusBadge status="SECURE SESSION" type="success" />
                <span className="text-xs font-mono text-muted">ID: OP-2023-CSE</span>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans text-white uppercase">
                  {personalInfo.name}
                </h1>
                <div className="h-8 flex items-center font-mono text-primary text-lg md:text-xl font-bold">
                  <span>{">"} {displayText}</span>
                  <span className="w-2.5 h-5 bg-primary ml-1 animate-blink" />
                </div>
              </div>

              <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-sans mt-3">
                {personalInfo.objective}
              </p>
            </div>

            {/* CTA Controls */}
            <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-primary/10">
              <a
                href="/documents/resume.pdf"
                download="Resume_Nikhilesh_Aravapalli.pdf"
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-primary text-[#050816] font-bold uppercase text-xs tracking-widest hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <FileDown size={14} />
                DOWNLOAD_RESUME
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded border border-primary/30 hover:border-primary text-primary font-bold uppercase text-xs tracking-widest hover:bg-primary/10 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <GithubIcon size={14} />
                GITHUB_PROFILE
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded border border-primary/30 hover:border-primary text-primary font-bold uppercase text-xs tracking-widest hover:bg-primary/10 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <LinkedinIcon size={14} />
                LINKEDIN_PROFILE
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Live Telemetry Panel: Column 3 */}
        <div className="lg:col-span-1">
          <GlassCard headerText="SYS_TELEMETRY" className="h-full font-mono text-xs text-slate-300 space-y-4">
            <div className="flex items-center justify-between border-b border-primary/5 pb-2">
              <span className="text-muted">OPERATOR_ID:</span>
              <span className="text-[#00f5d4] font-bold">NIKHILESH_A</span>
            </div>
            <div className="flex items-center justify-between border-b border-primary/5 pb-2">
              <span className="text-muted">IP_STATUS:</span>
              <span className="text-primary font-bold">127.0.0.1 (LOCAL)</span>
            </div>
            <div className="flex items-center justify-between border-b border-primary/5 pb-2">
              <span className="text-muted">DEFENSE_LEVEL:</span>
              <span className="text-[#00f5d4] font-bold">ALPHA_SECURE_1</span>
            </div>
            <div className="flex items-center justify-between border-b border-primary/5 pb-2">
              <span className="text-muted">SYS_UPTIME:</span>
              <span className="text-yellow-400 font-bold">{formatUptime(uptime)}</span>
            </div>
            <div className="flex items-center justify-between border-b border-primary/5 pb-2">
              <span className="text-muted">GATEWAYS:</span>
              <span className="text-emerald-400 font-bold">6 ONLINE</span>
            </div>
            
            <div className="pt-3 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] text-muted">
                <span>MEM_CYBER_ENCRYPT_LOAD</span>
                <span>42%</span>
              </div>
              <div className="h-2 w-full bg-primary/5 border border-primary/20 rounded overflow-hidden">
                <div className="h-full bg-primary w-[42%]" />
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded bg-primary/5 border border-primary/10 mt-4 text-[10px] leading-relaxed text-slate-400">
              <ShieldCheck size={14} className="text-primary shrink-0" />
              <span>All outgoing traffic TLS/SSL encrypted. No unauthorized attempts logged.</span>
            </div>
          </GlassCard>
        </div>

      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex-row items-center gap-4 py-4 px-6">
          <div className="p-3 bg-primary/5 border border-primary/20 text-primary rounded-lg">
            <Terminal size={22} />
          </div>
          <div>
            <div className="text-xs font-mono text-muted uppercase">Projects Completed</div>
            <div className="text-2xl font-bold font-sans text-white">04</div>
          </div>
        </GlassCard>

        <GlassCard className="flex-row items-center gap-4 py-4 px-6">
          <div className="p-3 bg-primary/5 border border-primary/20 text-primary rounded-lg">
            <Cpu size={22} />
          </div>
          <div>
            <div className="text-xs font-mono text-muted uppercase">Certifications Vaulted</div>
            <div className="text-2xl font-bold font-sans text-white">05</div>
          </div>
        </GlassCard>

        <GlassCard className="flex-row items-center gap-4 py-4 px-6">
          <div className="p-3 bg-primary/5 border border-primary/20 text-primary rounded-lg">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="text-xs font-mono text-muted uppercase">Academic Phase</div>
            <div className="text-2xl font-bold font-sans text-white">B.Tech CSE (3rd Yr)</div>
          </div>
        </GlassCard>
      </div>

    </section>
  );
}
