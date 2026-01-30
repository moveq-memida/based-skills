import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { useEffect, useState, useRef } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const meta: MetaFunction = () => {
  return [{ title: "BASED SKILLS" }];
};

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

function scramble(text: string, progress: number) {
  return text.split("").map((char, i) => {
    if (i < progress) return char;
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }).join("");
}

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const [entered, setEntered] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [scrambleText, setScrambleText] = useState({ explore: 0, create: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const tick = () => setTime(t => t + 1);
    const id = setInterval(tick, 50);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (hover === "explore") {
      const id = setInterval(() => {
        setScrambleText(s => ({ ...s, explore: Math.min(s.explore + 1, 7) }));
      }, 30);
      return () => clearInterval(id);
    } else {
      setScrambleText(s => ({ ...s, explore: 0 }));
    }
  }, [hover]);

  useEffect(() => {
    if (hover === "create") {
      const id = setInterval(() => {
        setScrambleText(s => ({ ...s, create: Math.min(s.create + 1, 6) }));
      }, 30);
      return () => clearInterval(id);
    } else {
      setScrambleText(s => ({ ...s, create: 0 }));
    }
  }, [hover]);

  const rot = Math.sin(time * 0.02) * 3;
  const scale = 1 + Math.sin(time * 0.03) * 0.02;

  if (!entered) {
    return (
      <div className="gate" onClick={() => setEntered(true)}>
        <div className="gate-grid">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i} 
              className="gate-cell"
              style={{
                opacity: Math.random() > 0.7 ? 1 : 0.1,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="gate-content">
          <div 
            className="gate-title"
            style={{ 
              transform: `rotate(${rot}deg) scale(${scale})`,
            }}
          >
            <span style={{ transform: `translateX(${Math.sin(time * 0.05) * 10}px)` }}>B</span>
            <span style={{ transform: `translateY(${Math.cos(time * 0.04) * 8}px)` }}>A</span>
            <span style={{ transform: `rotate(${Math.sin(time * 0.03) * 5}deg)` }}>S</span>
            <span style={{ transform: `translateX(${Math.cos(time * 0.05) * 10}px)` }}>E</span>
            <span style={{ transform: `translateY(${Math.sin(time * 0.04) * 8}px)` }}>D</span>
          </div>
          <div className="gate-sub">SKILLS</div>
        </div>
        <div 
          className="gate-cursor"
          style={{ left: mouse.x, top: mouse.y }}
        />
        <div className="gate-hint">[ ENTER ]</div>
      </div>
    );
  }

  return (
    <div className="void">
      <div 
        className="void-blob"
        style={{
          left: mouse.x,
          top: mouse.y,
          transform: `translate(-50%, -50%) rotate(${time}deg)`,
        }}
      />

      <div className="void-nav">
        <div className="void-logo">BS/</div>
        <ConnectButton chainStatus="none" showBalance={false} accountStatus="avatar" />
      </div>

      <div className="void-main">
        <Link 
          to="/skills" 
          className="void-option"
          onMouseEnter={() => setHover("explore")}
          onMouseLeave={() => setHover(null)}
          style={{ transform: hover === "explore" ? `translateX(20px) skewX(-2deg)` : "none" }}
        >
          <span className="void-num">01/</span>
          <span className="void-text">{scramble("EXPLORE", scrambleText.explore)}</span>
          <span className="void-arrow">→</span>
        </Link>

        <Link 
          to="/submit" 
          className="void-option"
          onMouseEnter={() => setHover("create")}
          onMouseLeave={() => setHover(null)}
          style={{ transform: hover === "create" ? `translateX(20px) skewX(-2deg)` : "none" }}
        >
          <span className="void-num">02/</span>
          <span className="void-text">{scramble("CREATE", scrambleText.create)}</span>
          <span className="void-arrow">→</span>
        </Link>
      </div>

      <div className="void-data">
        <div className="void-stat">
          <span className="void-stat-v" style={{ transform: `skewX(${Math.sin(time * 0.02) * 5}deg)` }}>
            {String(Math.floor(time / 10) % 1000).padStart(3, "0")}
          </span>
          <span className="void-stat-l">SKILLS</span>
        </div>
        <div className="void-stat">
          <span className="void-stat-v" style={{ transform: `skewX(${Math.cos(time * 0.02) * 5}deg)` }}>
            ${(time % 10000).toLocaleString()}
          </span>
          <span className="void-stat-l">VOLUME</span>
        </div>
      </div>

      <div className="void-footer">
        <span>BASED_SKILLS</span>
        <span className="void-time">{new Date().toISOString()}</span>
        <span>ON_BASE</span>
      </div>
    </div>
  );
}
