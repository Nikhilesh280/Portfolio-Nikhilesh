"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, CornerDownLeft } from "lucide-react";
import { personalInfo, projectsData, certificationsData, skillsData } from "@/data/portfolio";
import { playClick, playGlitch, playKeypress } from "@/utils/audio";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export default function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "initialize",
      output: (
        <div className="text-primary font-bold">
          SYS.CLI V2.8 ACTIVE. TYPE &quot;help&quot; TO SEE AVAILABLE COMMAND OPTIONS.
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let cmd = input.trim().toLowerCase();
    if (!cmd) return;

    // Fuzzy matching / natural variations mapping
    if (cmd.includes("cert") || cmd.includes("vault")) {
      cmd = "certifications";
    } else if (cmd.includes("proj") || cmd.includes("lab")) {
      cmd = "projects";
    } else if (cmd.includes("resume") || cmd.includes("cv") || cmd.includes("pdf")) {
      cmd = "resume";
    } else if (cmd.includes("contact") || cmd.includes("email") || cmd.includes("phone") || cmd.includes("comms") || cmd.includes("mail")) {
      cmd = "contact";
    } else if (cmd.includes("about") || cmd.includes("who") || cmd.includes("profile")) {
      cmd = "about";
    } else if (cmd.includes("help") || cmd.includes("command") || cmd.includes("option") || cmd.includes("directive")) {
      cmd = "help";
    } else if (cmd.includes("clear") || cmd.includes("cls") || cmd.includes("reset")) {
      cmd = "clear";
    }

    let output: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1">
            <div>AVAILABLE COMMAND CHANNELS:</div>
            <div className="pl-4 text-primary">
              <span className="font-bold">about</span> - Details on operator profile & credentials
            </div>
            <div className="pl-4 text-primary">
              <span className="font-bold">skills</span> - List operator technical capability index
            </div>
            <div className="pl-4 text-primary">
              <span className="font-bold">projects</span> - Survey list of sandboxed repositories
            </div>
            <div className="pl-4 text-primary">
              <span className="font-bold">certifications</span> - Display list of active cert verification records
            </div>
            <div className="pl-4 text-primary">
              <span className="font-bold">resume</span> - Display resume download directive
            </div>
            <div className="pl-4 text-primary">
              <span className="font-bold">contact</span> - Open communications coordinates links
            </div>
            <div className="pl-4 text-primary">
              <span className="font-bold">clear</span> - Wipe current terminal cache logs
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-1">
            <div className="text-white font-bold">OPERATOR: {personalInfo.name.toUpperCase()}</div>
            <div>DEGREE: {personalInfo.degree}</div>
            <div>CAMPUS: {personalInfo.university}</div>
            <div>CGPA: {personalInfo.cgpa}</div>
            <div className="italic text-slate-400 mt-1">
              &quot;{personalInfo.objective}&quot;
            </div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2">
            {skillsData.map((category) => (
              <div key={category.id}>
                <div className="text-white font-bold uppercase underline">{category.name}:</div>
                <div className="grid grid-cols-2 gap-x-4 pl-4 text-primary">
                  {category.skills.map((s, i) => (
                    <div key={i}>
                      {s.name} <span className="text-white">[{s.level}%]</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2">
            <div>DEPLOYED PROJECTS DIRECTORY:</div>
            {projectsData.map((p, idx) => (
              <div key={p.id} className="pl-4 border-l border-primary/20 mb-2">
                <div className="text-white font-bold">
                  {idx + 1}. {p.title.toUpperCase()}
                </div>
                <div className="text-primary text-[10px]">{p.subtitle}</div>
                <div className="text-slate-400 text-xs">{p.description}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "certifications":
        output = (
          <div className="space-y-2">
            <div>VALIDATED CREDENTIALS INDEX:</div>
            {certificationsData.map((c) => (
              <div key={c.id} className="pl-4 text-primary">
                ■ <span className="text-white font-bold">{c.name}</span> ({c.issuer})
                {c.credentialId && <span className="text-slate-400"> - ID: {c.credentialId}</span>}
              </div>
            ))}
          </div>
        );
        break;

      case "resume":
        output = (
          <div className="text-emerald-400 font-bold">
            [+] INITIATING RESUME DOWNLOAD PROTOCOL...
            <span className="block text-slate-300 font-normal">
              If download does not begin, please click:{" "}
              <a
                href="/documents/resume.pdf"
                download="Resume_Nikhilesh_Aravapalli.pdf"
                className="underline text-primary"
              >
                resume_link.pdf
              </a>
            </span>
          </div>
        );
        // Trigger download
        if (typeof window !== "undefined") {
          const link = document.createElement("a");
          link.href = "/documents/resume.pdf";
          link.download = "Resume_Nikhilesh_Aravapalli.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        break;

      case "contact":
        output = (
          <div className="space-y-1">
            <div className="text-white font-bold">COMMS LINK ENVELOPE:</div>
            <div>EMAIL: {personalInfo.email}</div>
            <div>PHONE: {personalInfo.phone}</div>
            <div>LINKEDIN: {personalInfo.linkedin}</div>
            <div>GITHUB: {personalInfo.github}</div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        output = (
          <div className="text-rose-500 font-bold">
            [!] ERROR: Command &quot;{cmd}&quot; not recognized. Type &quot;help&quot; for directives.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setCmdHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex === cmdHistory.length - 1 ? -1 : historyIndex + 1;
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? "" : cmdHistory[newIndex]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => {
          if (isOpen) {
            playGlitch();
          } else {
            playClick();
          }
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-12 w-12 rounded-full glass-panel border border-primary flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,245,212,0.2)] hover:shadow-[0_0_20px_rgba(0,245,212,0.4)] transition-all cursor-pointer bg-[#050816]"
      >
        {isOpen ? <X size={20} /> : <TerminalIcon size={20} />}
      </motion.button>

      {/* Terminal Dialog Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[90vw] sm:w-[450px] h-[350px] glass-panel border border-primary/30 rounded-lg flex flex-col overflow-hidden shadow-2xl bg-[#050816]/95 crt-overlay scanline select-text"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between bg-primary/5 px-4 py-2 border-b border-primary/20 text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>N.A.S.A_OPERATOR_SHELL_V2.8</span>
              </div>
              <span>PORT: 443</span>
            </div>

            {/* Terminal Logs Output */}
            <div
              ref={containerRef}
              className="flex-1 p-4 overflow-y-auto min-h-0 space-y-3 font-mono text-xs text-slate-300 custom-scrollbar"
            >
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  {item.command && (
                    <div className="text-slate-400 flex items-center gap-1">
                      <span>$</span>
                      <span>{item.command}</span>
                    </div>
                  )}
                  <div className="pl-3 leading-relaxed">{item.output}</div>
                </div>
              ))}
            </div>

            {/* Terminal Input Line */}
            <form
              onSubmit={(e) => {
                playClick();
                handleCommandSubmit(e);
              }}
              className="border-t border-primary/20 bg-primary/5 p-3 flex items-center gap-2"
            >
              <span className="font-mono text-xs text-primary font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  playKeypress();
                  setInput(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter command (e.g. help)..."
                className="flex-1 bg-transparent font-mono text-xs text-primary focus:outline-none placeholder-primary/30"
              />
              <button type="submit" className="text-primary hover:text-white transition-colors cursor-pointer">
                <CornerDownLeft size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
