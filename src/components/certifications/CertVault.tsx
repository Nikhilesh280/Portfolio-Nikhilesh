"use client";

import React from "react";
import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";
import { certificationsData } from "@/data/portfolio";
import { Award, ShieldCheck, LockKeyhole, ExternalLink } from "lucide-react";

export default function CertVault() {
  return (
    <section id="certifications" className="w-full py-6">
      <SectionHeader title="Certification Vault" code="CERT_VAULT" subtitle="Verified security, cloud, and developer credentials" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificationsData.map((cert) => (
          <GlassCard
            key={cert.id}
            headerText={`CREDENTIAL_BLOCK: ${cert.id.toUpperCase()}`}
            className="h-full justify-between hover:border-primary/40 group relative overflow-hidden"
          >
            {/* Holographic background lock grid icon */}
            <LockKeyhole
              className="absolute right-4 bottom-4 text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none"
              size={120}
            />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded border border-primary/20 text-primary group-hover:bg-primary/25 transition-all">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-sans text-white uppercase group-hover:text-primary transition-colors leading-snug">
                    {cert.name}
                  </h3>
                  <p className="text-[10px] font-mono text-muted">{cert.issuer}</p>
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-[10px] text-slate-300">
                <div className="flex justify-between border-b border-primary/5 pb-1">
                  <span className="text-muted">ISSUED:</span>
                  <span className="text-slate-200">{cert.date}</span>
                </div>
                {cert.expiry && (
                  <div className="flex justify-between border-b border-primary/5 pb-1">
                    <span className="text-muted">EXPIRES:</span>
                    <span className="text-slate-200">{cert.expiry}</span>
                  </div>
                )}
                {cert.credentialId && (
                  <div className="flex justify-between border-b border-primary/5 pb-1">
                    <span className="text-muted">CRED_ID:</span>
                    <span className="text-slate-200 truncate max-w-[120px]" title={cert.credentialId}>
                      {cert.credentialId}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-primary/10 flex items-center justify-between z-10">
              {cert.verifyUrl ? (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary text-[#050816] hover:bg-white text-[10px] font-mono font-bold uppercase transition-all duration-300 cursor-pointer"
                >
                  <ExternalLink size={10} />
                  VERIFY_CREDENTIAL
                </a>
              ) : (
                <StatusBadge status="ACADEMIC_PASS" type="neutral" />
              )}
              
              <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                <ShieldCheck size={12} />
                <span>AUTHENTIC</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
