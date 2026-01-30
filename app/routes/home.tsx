import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => {
  return [
    { title: "Based Skills" },
    { name: "description", content: "Skills for AI agents." },
  ];
};

export default function Home() {
  return (
    <div className="home">
      <header className="home-nav">
        <Link to="/" className="home-logo">Based Skills</Link>
        <div className="home-nav-right">
          <Link to="/skills" className="home-nav-link">Skills</Link>
          <Link to="/submit" className="home-nav-link">Submit</Link>
          <ConnectButton chainStatus="none" showBalance={false} accountStatus="avatar" />
        </div>
      </header>

      <section className="home-hero">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Skills
          <br />
          <span className="home-hero-accent">for agents</span>
        </motion.h1>
        
        <motion.p 
          className="home-hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Build. Trade. Earn.
        </motion.p>
        
        <motion.div 
          className="home-hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/skills" className="home-btn-primary">
            Explore
          </Link>
          <Link to="/submit" className="home-btn-ghost">
            Submit skill
          </Link>
        </motion.div>
      </section>

      <section className="home-scroll-text">
        <div className="home-scroll-track">
          <span>UTILITY • DEVELOPER • CREATIVE • SOCIAL • DEFI • NFT • GAMING • </span>
          <span>UTILITY • DEVELOPER • CREATIVE • SOCIAL • DEFI • NFT • GAMING • </span>
        </div>
      </section>

      <section className="home-features">
        <div className="home-feature">
          <span className="home-feature-num">01</span>
          <h2>Create</h2>
          <p>Build skills with SKILL.md. Simple format, infinite possibilities.</p>
        </div>
        <div className="home-feature">
          <span className="home-feature-num">02</span>
          <h2>Mint</h2>
          <p>Own your skills onchain. Set your price, keep your rights.</p>
        </div>
        <div className="home-feature">
          <span className="home-feature-num">03</span>
          <h2>Earn</h2>
          <p>Get paid on every sale. Royalties on every resale.</p>
        </div>
      </section>

      <section className="home-stats">
        <div className="home-stat">
          <span className="home-stat-num">000</span>
          <span className="home-stat-label">skills</span>
        </div>
        <div className="home-stat">
          <span className="home-stat-num">$0</span>
          <span className="home-stat-label">volume</span>
        </div>
        <div className="home-stat">
          <span className="home-stat-num">000</span>
          <span className="home-stat-label">creators</span>
        </div>
      </section>

      <section className="home-cta-final">
        <motion.h2
          initial={{ opacity: 0.2 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Make something.
        </motion.h2>
        <Link to="/submit" className="home-btn-primary">
          Start building →
        </Link>
      </section>

      <footer className="home-footer">
        <span>© 2026</span>
        <span>Built on Base</span>
      </footer>
    </div>
  );
}
