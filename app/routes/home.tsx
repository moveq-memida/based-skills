import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion, useScroll, useTransform } from "framer-motion";

export const meta: MetaFunction = () => {
  return [{ title: "Based Skills" }];
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <div className="x" ref={containerRef}>
      {/* Cursor follower */}
      <div 
        className="x-cursor"
        style={{ 
          left: mousePos.x - 200, 
          top: mousePos.y - 200,
        }}
      />

      {/* Nav */}
      <nav className="x-nav">
        <span className="x-logo">BS</span>
        <div className="x-nav-links">
          <Link to="/skills">Skills</Link>
          <Link to="/submit">Submit</Link>
          <ConnectButton chainStatus="none" showBalance={false} accountStatus="avatar" />
        </div>
      </nav>

      {/* Screen 1: Title */}
      <section className="x-screen x-screen-1">
        <motion.div style={{ opacity, scale }}>
          <h1 className="x-title">
            <span className="x-title-line">SKILLS</span>
            <span className="x-title-line x-title-outline">FOR</span>
            <span className="x-title-line">AGENTS</span>
          </h1>
        </motion.div>
        <div className="x-scroll-hint">
          <span>scroll</span>
          <div className="x-scroll-line" />
        </div>
      </section>

      {/* Screen 2: Message */}
      <section className="x-screen x-screen-2">
        <motion.p 
          className="x-big-text"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
        >
          Your agent is only as smart as the skills you give it.
        </motion.p>
      </section>

      {/* Screen 3: Numbers */}
      <section className="x-screen x-screen-3">
        <div className="x-numbers">
          <motion.div 
            className="x-number"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="x-number-value">000</span>
            <span className="x-number-label">SKILLS</span>
          </motion.div>
          <motion.div 
            className="x-number"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="x-number-value">$0</span>
            <span className="x-number-label">TRADED</span>
          </motion.div>
          <motion.div 
            className="x-number"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="x-number-value">000</span>
            <span className="x-number-label">BUILDERS</span>
          </motion.div>
        </div>
      </section>

      {/* Screen 4: CTA */}
      <section className="x-screen x-screen-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="x-cta"
        >
          <Link to="/skills" className="x-cta-btn">
            <span>ENTER</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="x-footer">
        <span>Based Skills</span>
        <span>Built on Base</span>
        <span>2026</span>
      </footer>
    </div>
  );
}
