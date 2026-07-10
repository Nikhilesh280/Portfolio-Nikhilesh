"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";
import { projectsData } from "@/data/portfolio";
import { Search, ExternalLink, FolderGit2, X, ShieldAlert, Layers, KeyRound } from "lucide-react";
import { Project } from "@/types";
import { playClick, playHover, playGlitch } from "@/utils/audio";

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

export default function SecurityLabs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Listen for Escape key to close details vault
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        playGlitch();
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedProject]);

  // Extract all unique tags
  const filterTags = ["All", "AWS", "Cryptography", "MERN", "Security"];

  // Filter projects based on query and tag
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag =
      selectedTag === "All" ||
      project.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  return (
    <section id="projects" className="w-full py-6">
      <SectionHeader title="Security Labs" code="PROJECT_VAULT" subtitle="Sandboxed project repositories & cryptography proofs" />

      {/* Control Bar: Search & Category Chips */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-primary/5 border border-primary/20 rounded font-mono text-xs text-white focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,245,212,0.1)] transition-all duration-300"
          />
          <Search size={14} className="absolute left-3 top-2.5 text-muted" />
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                playClick();
                setSelectedTag(tag);
              }}
              onMouseEnter={playHover}
              className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider uppercase border transition-all duration-300 cursor-pointer relative ${
                selectedTag === tag
                  ? "border-primary text-primary font-bold"
                  : "border-primary/10 text-slate-400 hover:border-primary/30 hover:text-white"
              }`}
            >
              <span className="relative z-10">{tag}</span>
              {selectedTag === tag && (
                <motion.div
                  layoutId="activeProjectTag"
                  className="absolute inset-0 bg-primary/10 rounded"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={playHover}
            >
              <GlassCard
                headerText={`LAB_SYS_ID: ${project.id.toUpperCase()}`}
                onClick={() => {
                  playClick();
                  setSelectedProject(project);
                }}
                className="h-full justify-between hover:border-primary/40 group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-bold font-sans text-white group-hover:text-primary transition-colors uppercase">
                      {project.title}
                    </h3>
                    <div className="shrink-0">
                      {project.confStatus ? (
                        <StatusBadge status="CLASSIFIED" type="warning" />
                      ) : (
                        <StatusBadge status="SECURE" type="success" />
                      )}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-primary/70">{project.subtitle}</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-primary/10 flex flex-wrap gap-1.5">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center font-mono text-xs text-muted py-12 border border-dashed border-primary/10 rounded-lg">
          [!] NO ACTIVE REPOSITORIES FOUND MATCHING CRITERIA
        </div>
      )}

      {/* Deep-Dive Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            onClick={() => {
              playGlitch();
              setSelectedProject(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/85 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="glass-panel w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-lg relative flex flex-col p-6 border-primary/30 cursor-default"
            >
              {/* Corner tech highlights */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />

              {/* Close Button */}
              <button
                onClick={() => {
                  playGlitch();
                  setSelectedProject(null);
                }}
                onMouseEnter={playHover}
                className="absolute right-4 top-4 p-1.5 border border-primary/20 hover:border-primary text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>

              {/* Header */}
              <div className="border-b border-primary/10 pb-4 mb-4 mt-2">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <StatusBadge status={`LAB_CORE_${selectedProject.id.toUpperCase()}`} type="info" />
                  {selectedProject.confStatus && (
                    <StatusBadge status="CONFERENCE_PAPER" type="warning" />
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white uppercase font-sans">
                  {selectedProject.title}
                </h3>
                <div className="text-xs font-mono text-primary mt-1">{selectedProject.subtitle}</div>
              </div>

              {/* Body Content */}
              <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans pr-2">
                {selectedProject.confStatus && (
                  <div className="flex gap-2 p-3 bg-amber-500/5 border border-amber-500/20 rounded font-mono text-xs text-amber-400">
                    <ShieldAlert size={16} className="shrink-0" />
                    <div>
                      <strong>SECURITY PROTOCOL STATUS:</strong> {selectedProject.confStatus}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Layers size={12} />
                    <span>01_system_overview</span>
                  </h4>
                  <p>{selectedProject.longDescription}</p>
                </div>

                {selectedProject.architecture && (
                  <div>
                    <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Layers size={12} />
                      <span>02_architectural_layers</span>
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm font-mono text-slate-400">
                      {selectedProject.architecture.map((arch, idx) => (
                        <li key={idx}>{arch}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <FolderGit2 size={12} />
                    <span>03_key_features</span>
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="text-slate-300">
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedProject.securitySpecs && (
                  <div>
                    <h4 className="text-xs font-mono text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <KeyRound size={12} />
                      <span>04_cryptography_and_hardening</span>
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm text-slate-300">
                      {selectedProject.securitySpecs.map((spec, idx) => (
                        <li key={idx}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer CTA */}
              <div className="border-t border-primary/10 pt-4 mt-6 flex flex-wrap gap-4 justify-between items-center">
                <div className="flex gap-1.5">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-primary/20 hover:border-primary text-slate-300 hover:text-white rounded text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                  >
                    <GithubIcon size={12} />
                    SOURCE_CODE
                  </a>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-[#050816] rounded text-xs font-mono font-bold uppercase hover:bg-white transition-colors cursor-pointer"
                    >
                      <ExternalLink size={12} />
                      LIVE_DEPLOY
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
