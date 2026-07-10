"use client";

import React, { useState, useEffect } from "react";
import { Shield, ShieldAlert, Cpu, Volume2, VolumeX, Sun, Moon } from "lucide-react";
import BootScreen from "@/components/boot/BootScreen";
import DashboardHero from "@/components/hero/DashboardHero";
import MissionBrief from "@/components/about/MissionBrief";
import ThreatIntelligence from "@/components/skills/ThreatIntelligence";
import SecurityLabs from "@/components/projects/SecurityLabs";
import CertVault from "@/components/certifications/CertVault";
import CareerTimeline from "@/components/timeline/CareerTimeline";
import ContactConsole from "@/components/contact/ContactConsole";
import TerminalWidget from "@/components/terminal/TerminalWidget";
import NetworkBackground from "@/components/ui/NetworkBackground";
import StatusBadge from "@/components/ui/StatusBadge";
import { setMutedState, getMutedState, playClick, playHover } from "@/utils/audio";

export default function Home() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [soundsEnabled, setSoundsEnabled] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Sync state on load
  useEffect(() => {
    setSoundsEnabled(!getMutedState());
    
    // Sync theme
    const savedTheme = localStorage.getItem("soc_theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    playClick();
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("soc_theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  // Check if user has bypassed boot on a previous session to save loading time
  useEffect(() => {
    const isBypassed = localStorage.getItem("soc_boot_bypassed");
    if (isBypassed === "true") {
      setBootCompleted(true);
    }
  }, []);

  const handleBootComplete = () => {
    localStorage.setItem("soc_boot_bypassed", "true");
    setBootCompleted(true);
  };

  if (!bootCompleted) {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  return (
    <>
      {/* Dynamic Network Mesh Grid Particle Background */}
      <NetworkBackground />

      {/* Main SOC Dashboard Layout */}
      <div className="relative min-h-screen flex flex-col font-sans text-slate-200">
        
        {/* Futuristic Dashboard Header */}
        <header className="sticky top-0 z-30 w-full border-b border-primary/20 bg-[#050816]/75 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary/10 border border-primary/30 rounded text-primary">
              <Shield size={18} className="animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-widest text-white block uppercase">
                N_A_S_A_SOC
              </span>
              <span className="text-[10px] font-mono text-primary block leading-none font-bold">
                SECURE_GATE_V2.8 // OPERATIVE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-[11px] tracking-wider text-slate-300">
            <a href="#about" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4">// BRIEF</a>
            <a href="#skills" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4">// MATRIX</a>
            <a href="#projects" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4">// LABS</a>
            <a href="#certifications" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4">// VAULT</a>
            <a href="#timeline" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4">// LOGS</a>
            <a href="#contact" onMouseEnter={playHover} onClick={playClick} className="hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4">// COMMS</a>
          </nav>

          {/* Telemetry connection status indicator */}
          <div className="flex items-center gap-2">
            {/* Sound Toggle */}
            <button
              onClick={() => {
                const nextState = !soundsEnabled;
                setSoundsEnabled(nextState);
                setMutedState(!nextState);
                if (nextState) {
                  playClick();
                }
              }}
              onMouseEnter={playHover}
              className={`p-1.5 rounded border font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer select-none ${
                soundsEnabled
                  ? "bg-primary/10 border-primary text-primary shadow-[0_0_8px_rgba(0,245,212,0.15)]"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
              title="Toggle Audio Feedback"
            >
              {soundsEnabled ? (
                <>
                  <Volume2 size={12} className="animate-pulse" />
                  SOUND_ON
                </>
              ) : (
                <>
                  <VolumeX size={12} />
                  SOUND_OFF
                </>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              onMouseEnter={playHover}
              className="p-1.5 rounded border border-primary/20 hover:border-primary text-slate-400 hover:text-white bg-primary/5 hover:bg-primary/15 transition-all text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer select-none"
              title="Toggle Light/Dark Theme"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={12} />
                  LIGHT_MODE
                </>
              ) : (
                <>
                  <Moon size={12} />
                  DARK_MODE
                </>
              )}
            </button>

            <button
              onClick={() => {
                playClick();
                localStorage.removeItem("soc_boot_bypassed");
                setBootCompleted(false);
              }}
              onMouseEnter={playHover}
              title="Re-run Boot Sequence"
              className="p-1.5 rounded border border-primary/20 hover:border-primary text-slate-400 hover:text-white bg-primary/5 hover:bg-primary/15 transition-all text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer select-none"
            >
              <Cpu size={12} />
              REBOOT
            </button>
          </div>
        </header>

        {/* Dashboard Main Workspace */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8 pb-24">
          <DashboardHero />
          <MissionBrief />
          <ThreatIntelligence />
          <SecurityLabs />
          <CertVault />
          <CareerTimeline />
          <ContactConsole />
        </main>

        {/* Interactive Floating Terminal Widget */}
        <TerminalWidget />

        {/* Futuristic Dashboard Footer */}
        <footer className="w-full border-t border-primary/10 bg-[#050816]/95 py-6 px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldAlert size={14} className="text-primary" />
            <span>&copy; {new Date().getFullYear()} Nikhilesh Aravapalli. All access logs secure.</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-muted">
            <span>ENC_ALGO: AES-256 / ASCON-128</span>
            <span>CONN_TUNNEL: SECURE_TLS_1.3</span>
          </div>
        </footer>

      </div>
    </>
  );
}
