"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import StatusBadge from "../ui/StatusBadge";
import { personalInfo } from "@/data/portfolio";
import { Mail, Phone, MapPin, Send } from "lucide-react";

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

export default function ContactConsole() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"STANDBY" | "TRANSMITTING" | "SUCCESS" | "ERROR">("STANDBY");
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("ERROR");
      setStatusMsg("PAYLOAD ERROR: Empty parameters detected.");
      return;
    }

    setStatus("TRANSMITTING");
    setStatusMsg("TRANSMITTING SECURE DATA PACKETS...");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_placeholder";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_placeholder";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "key_placeholder";

    // If environment variables are placeholders, fall back to native mailto client redirect
    if (
      !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
      serviceId === "service_placeholder" ||
      templateId === "template_placeholder" ||
      publicKey === "key_placeholder"
    ) {
      setTimeout(() => {
        setStatus("SUCCESS");
        setStatusMsg("[REDIRECT] OPENING LOCAL COMMS CLIENT...");
        
        const subject = encodeURIComponent(`SOC Inquiry from ${formData.name}`);
        const body = encodeURIComponent(
          `Sender Name: ${formData.name}\nSender Email: ${formData.email}\n\nMessage Payload:\n${formData.message}`
        );
        
        window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
        
        setFormData({ name: "", email: "", message: "" });
      }, 1000);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        publicKey
      );
      setStatus("SUCCESS");
      setStatusMsg("[200 OK] SECURE CORRESPONDENCE REAPED.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setStatus("ERROR");
      setStatusMsg(`[500 ERROR] PACKET COLLISION: ${err.text || "Transmission failed."}`);
    }
  };

  return (
    <section id="contact" className="w-full py-6">
      <SectionHeader title="Contact Console" code="COMM_HUB" subtitle="Establish secure terminal socket connections" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Terminal Contact Form: 3 columns */}
        <div className="md:col-span-3">
          <GlassCard headerText="TRANSMISSION_FORM" className="h-full">
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-muted block uppercase">operator_name_id:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. AGENT SMITH"
                  className="w-full bg-primary/5 border border-primary/20 rounded p-2 text-white focus:outline-none focus:border-primary transition-all text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted block uppercase">return_address_email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. agent.smith@matrix.com"
                  className="w-full bg-primary/5 border border-primary/20 rounded p-2 text-white focus:outline-none focus:border-primary transition-all text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted block uppercase">message_payload_bytes:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Insert secure correspondence details here..."
                  className="w-full bg-primary/5 border border-primary/20 rounded p-2 text-white focus:outline-none focus:border-primary transition-all text-xs resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Form Status Telemetry */}
                <div className="flex-1 min-h-[24px] flex items-center">
                  {status !== "STANDBY" && (
                    <div
                      className={`text-[10px] uppercase font-bold tracking-widest ${
                        status === "TRANSMITTING"
                          ? "text-yellow-400 animate-pulse"
                          : status === "SUCCESS"
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {statusMsg}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "TRANSMITTING"}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-primary text-[#050816] font-bold uppercase text-xs tracking-widest hover:bg-white hover:shadow-[0_0_15px_rgba(0,245,212,0.3)] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send size={12} />
                  DISPATCH_PACKET
                </button>
              </div>
            </form>
          </GlassCard>
        </div>

        {/* Contact Coordinates: 2 columns */}
        <div className="md:col-span-2">
          <GlassCard headerText="COMMS_COORDINATES" className="h-full justify-between gap-6">
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Initiate a query regarding cloud infrastructure design, cryptographic architectures, database validation testing, or full-stack software development.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-slate-300 hover:text-primary transition-colors group cursor-pointer"
                >
                  <span className="p-2 bg-primary/10 rounded border border-primary/15 text-primary group-hover:bg-primary/20 shrink-0">
                    <Mail size={14} />
                  </span>
                  <span>{personalInfo.email}</span>
                </a>

                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 text-slate-300 hover:text-primary transition-colors group cursor-pointer"
                >
                  <span className="p-2 bg-primary/10 rounded border border-primary/15 text-primary group-hover:bg-primary/20 shrink-0">
                    <Phone size={14} />
                  </span>
                  <span>{personalInfo.phone}</span>
                </a>

                <div className="flex items-center gap-3 text-slate-300">
                  <span className="p-2 bg-primary/10 rounded border border-primary/15 text-primary shrink-0">
                    <MapPin size={14} />
                  </span>
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="border-t border-primary/10 pt-4 flex gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-primary/20 hover:border-primary text-slate-400 hover:text-primary rounded transition-all cursor-pointer"
                title="GitHub Profile"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-primary/20 hover:border-primary text-slate-400 hover:text-primary rounded transition-all cursor-pointer"
                title="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
              </a>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
