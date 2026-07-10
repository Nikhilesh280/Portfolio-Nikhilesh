"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { playKeypress, playSuccess, playGlitch } from "@/utils/audio";

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING SYSTEM SECURE SCAN...");
  const [isBypassed, setIsBypassed] = useState(false);
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    setLocalTime(new Date().toLocaleTimeString());
    const clockInterval = setInterval(() => {
      setLocalTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const bootLogs = [
    "LOG: Initializing Antigravity security core...",
    "LOG: Connecting to client database...",
    "STATUS: Connection established. Port: 443",
    "LOG: Loading operator metadata: Nikhilesh Aravapalli...",
    "STATUS: Profile verified (CSE B.Tech, SRM University AP)",
    "LOG: Checking AWS credentials certification status...",
    "STATUS: AWS Certified Cloud Practitioner [366baf53ee5b] - ACTIVE",
    "LOG: Verifying cryptographic vault libraries...",
    "STATUS: SecureFile AES-GCM + ASCON tier active",
    "LOG: Launching Campus Dining anti-weaponization gateways...",
    "STATUS: Redis rate-limiter & Tripwire active",
    "LOG: Fetching publication status (Paper ID: 1571280820)...",
    "STATUS: Conference scheduled (Aug 21-22, 2026) - PEER REVIEW PASS",
    "LOG: Granting terminal operator clearances...",
    "STATUS: ACCESS GRANTED - WELCOME TO CYBER COMMAND CENTER V2.8",
  ];

  useEffect(() => {
    if (isBypassed) return;

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs((prev) => [...prev, bootLogs[logIndex]]);
        playKeypress();
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setStatus("ACCESS GRANTED. DEPLOYING SOC DASHBOARD...");
          playSuccess();
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [isBypassed]);

  const handleBypass = () => {
    playGlitch();
    setIsBypassed(true);
    setProgress(100);
    setStatus("ACCESS BYPASSED. GRANTED OPERATOR ACCESS.");
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050816] flex flex-col justify-between p-6 md:p-12 font-mono text-terminal select-none overflow-hidden crt-overlay scanline">
      {/* CRT Line Effect */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-primary/20 animate-scan pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-primary/20 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-primary font-bold">
            SECURITY PROTOCOL: SECURE_BOOT_v2.8
          </span>
        </div>
        <div className="text-xs text-muted">
          LOCAL_TIME: {localTime || "CONNECTING..."}
        </div>
      </div>

      {/* Main Terminal Screen */}
      <div className="flex-1 my-6 overflow-y-auto max-h-[60vh] space-y-2 text-xs md:text-sm">
        <div className="text-[#00f5d4] font-bold text-lg mb-4">
          {"[N.A.S.A. SOC CORE TERMINAL INITIALIZED]"}
        </div>
        <AnimatePresence>
          {logs.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={log.startsWith("STATUS:") ? "text-primary/90 pl-4 font-bold" : "text-[#a0aec0]"}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer / Progress Container */}
      <div className="border-t border-primary/20 pt-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#a0aec0]">{status}</span>
              <span className="text-primary font-bold">{progress}%</span>
            </div>
            {/* Progress Bar Container */}
            <div className="h-4 w-full bg-primary/5 border border-primary/20 rounded overflow-hidden relative">
              <motion.div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
                layout
              />
            </div>
          </div>
          <button
            onClick={handleBypass}
            className="px-4 py-2 border border-primary/40 rounded bg-primary/5 hover:bg-primary/20 hover:border-primary text-xs tracking-widest text-primary font-bold uppercase transition-all duration-300 active:scale-95 whitespace-nowrap self-end md:self-auto cursor-pointer"
          >
            BYPASS SECURE SCAN
          </button>
        </div>
      </div>
    </div>
  );
}
