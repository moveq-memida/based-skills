import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { useEffect, useState, useRef } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const meta: MetaFunction = () => {
  return [{ title: "Based Skills" }];
};

export default function Home() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hue, setHue] = useState(0);
  const [entered, setEntered] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHue((e.clientX + e.clientY) % 360);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!entered) {
    return (
      <div 
        className="portal"
        style={{ "--hue": hue } as React.CSSProperties}
        onClick={() => setEntered(true)}
      >
        <div className="portal-bg" style={{ left: pos.x, top: pos.y }} />
        <div className={`portal-text ${glitch ? "glitch" : ""}`}>
          <span data-text="BASED">BASED</span>
          <span data-text="SKILLS">SKILLS</span>
        </div>
        <div className="portal-hint">click anywhere</div>
      </div>
    );
  }

  return (
    <div className="world" style={{ "--hue": hue } as React.CSSProperties}>
      <div className="world-gradient" style={{ left: pos.x, top: pos.y }} />
      
      <nav className="world-nav">
        <ConnectButton chainStatus="none" showBalance={false} accountStatus="avatar" />
      </nav>

      <div className="world-content">
        <div className="world-card">
          <Link to="/skills" className="world-link">
            <span className="world-link-num">01</span>
            <span className="world-link-text">EXPLORE</span>
            <span className="world-link-arrow">→</span>
          </Link>
        </div>
        
        <div className="world-card">
          <Link to="/submit" className="world-link">
            <span className="world-link-num">02</span>
            <span className="world-link-text">CREATE</span>
            <span className="world-link-arrow">→</span>
          </Link>
        </div>
        
        <div className="world-stats">
          <div>
            <span className="stat-n">0</span>
            <span className="stat-l">skills</span>
          </div>
          <div>
            <span className="stat-n">0</span>
            <span className="stat-l">creators</span>
          </div>
        </div>
      </div>

      <div className="world-footer">
        <span>BASED SKILLS</span>
        <span>ON BASE</span>
      </div>
    </div>
  );
}
