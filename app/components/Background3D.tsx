"use client";

import { useEffect, useState } from "react";

export function Background3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-container">
      <div className="bg-gradient" />
      <div className="bg-grid" />
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-particles">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="bg-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      <style>{`
        .bg-container {
          position: fixed;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          background: #000;
        }
        
        .bg-gradient {
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translateX(-50%);
          width: 150%;
          height: 100%;
          background: radial-gradient(ellipse at center, rgba(0, 82, 255, 0.15) 0%, transparent 60%);
          animation: pulse-glow 8s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
        }
        
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%);
        }
        
        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 20s ease-in-out infinite;
        }
        
        .bg-orb-1 {
          width: 600px;
          height: 600px;
          background: rgba(0, 82, 255, 0.3);
          top: -20%;
          left: -10%;
          animation-delay: 0s;
        }
        
        .bg-orb-2 {
          width: 400px;
          height: 400px;
          background: rgba(139, 92, 246, 0.2);
          top: 40%;
          right: -10%;
          animation-delay: -7s;
        }
        
        .bg-orb-3 {
          width: 300px;
          height: 300px;
          background: rgba(0, 82, 255, 0.2);
          bottom: -10%;
          left: 30%;
          animation-delay: -14s;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(5deg); }
          50% { transform: translate(-20px, 20px) rotate(-5deg); }
          75% { transform: translate(20px, 30px) rotate(3deg); }
        }
        
        .bg-particles {
          position: absolute;
          inset: 0;
        }
        
        .bg-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(0, 82, 255, 0.6);
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
