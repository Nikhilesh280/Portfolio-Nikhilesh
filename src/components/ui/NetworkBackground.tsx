"use client";

import React, { useEffect, useRef } from "react";

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates tracker
    let mouse = { x: -1000, y: -1000, active: false };

    // Matrix hex streams setup
    const hexCodes = ["0xFA", "0x2B", "SEC", "SYS", "GCM", "PORT", "443", "AES", "RAG", "IAM", "JWT"];
    const streams: { x: number; y: number; speed: number; opacity: number; text: string }[] = [];
    const streamCount = 20;

    for (let i = 0; i < streamCount; i++) {
      streams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        text: hexCodes[Math.floor(Math.random() * hexCodes.length)],
      });
    }

    // Particles setup
    const particles: Particle[] = [];
    const particleCount = Math.min(40, Math.floor((width * height) / 40000));
    const connectionDistance = 150;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "rgba(0, 245, 212, 0.5)";
        c.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains("light");

      // Deep Space background
      ctx.fillStyle = isLight ? "#f1f5f9" : "#050816";
      ctx.fillRect(0, 0, width, height);

      // 1. Grid of Crosshairs
      const gridSpacing = 80;
      ctx.strokeStyle = isLight ? "rgba(2, 132, 199, 0.05)" : "rgba(0, 245, 212, 0.04)";
      ctx.lineWidth = 0.5;
      
      for (let x = 0; x < width; x += gridSpacing) {
        for (let y = 0; y < height; y += gridSpacing) {
          // Draw a small crosshair "+"
          ctx.beginPath();
          ctx.moveTo(x - 4, y);
          ctx.lineTo(x + 4, y);
          ctx.moveTo(x, y - 4);
          ctx.lineTo(x, y + 4);
          ctx.stroke();
        }
      }

      // 2. Hex data matrix streams
      streams.forEach((stream) => {
        ctx.fillStyle = isLight 
          ? `rgba(2, 132, 199, ${stream.opacity * 0.7})` 
          : `rgba(0, 245, 212, ${stream.opacity})`;
        ctx.font = "9px var(--font-jetbrains-mono), monospace";
        ctx.fillText(stream.text, stream.x, stream.y);

        // Move down
        stream.y += stream.speed;
        if (stream.y > height) {
          stream.y = -20;
          stream.x = Math.random() * width;
          stream.text = hexCodes[Math.floor(Math.random() * hexCodes.length)];
        }
      });

      // 3. Update & Draw particle network
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      // Connect nodes with light lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 245, 212, ${alpha})`;
            ctx.stroke();

            // Draw traveling pulse packet along line
            if (Math.random() < 0.003) {
              const pulseRatio = (Date.now() % 2000) / 2000;
              const px = particles[i].x + dx * pulseRatio;
              const py = particles[i].y + dy * pulseRatio;
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(0, 255, 255, 0.7)";
              ctx.fill();
            }
          }
        }
      }

      // 4. Mouse Interactive Targeting Reticle (HUD lock)
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        ctx.strokeStyle = isLight ? "rgba(2, 132, 199, 0.3)" : "rgba(0, 245, 212, 0.25)";
        ctx.lineWidth = 1;

        // Draw HUD circle bounds
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2);
        ctx.stroke();

        // Concentric dashed rings
        ctx.strokeStyle = isLight ? "rgba(2, 132, 199, 0.12)" : "rgba(0, 245, 212, 0.1)";
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 40, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Small center dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? "rgba(2, 132, 199, 0.6)" : "rgba(0, 245, 212, 0.6)";
        ctx.fill();

        // Cross lines pointing outwards from HUD
        ctx.strokeStyle = isLight ? "rgba(2, 132, 199, 0.06)" : "rgba(0, 245, 212, 0.05)";
        ctx.beginPath();
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, height);
        ctx.moveTo(0, mouse.y);
        ctx.lineTo(width, mouse.y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (canvas) canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none"
    />
  );
}
