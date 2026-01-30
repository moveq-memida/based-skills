import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => {
  return [
    { title: "Based Skills" },
    { name: "description", content: "Skills for AI agents on Base." },
  ];
};

export default function Home() {
  return (
    <>
      <div className="noise" />
      
      <nav className="topnav">
        <Link to="/" className="wordmark">Based Skills</Link>
        <div className="topnav-right">
          <Link to="/skills">Skills</Link>
          <Link to="/submit">Submit</Link>
          <ConnectButton chainStatus="none" showBalance={false} accountStatus="avatar" />
        </div>
      </nav>

      <main>
        <section className="intro">
          <motion.div 
            className="intro-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <h1>
              <span className="line1">SKILLS</span>
              <span className="line2">FOR</span>
              <span className="line3">AGENTS</span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Create. Trade. Earn.
          </motion.p>

          <motion.div 
            className="intro-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Link to="/skills" className="cta-link">
              <span>Enter</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>
        </section>

        <section className="marquee-section">
          <div className="marquee">
            <div className="marquee-content">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i}>WEATHER • CODE REVIEW • TRANSLATION • IMAGE GEN • CALENDAR • SOCIAL • DeFi • NFT • </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bento">
          <motion.div 
            className="bento-card bento-main"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="bento-label">01</span>
            <h2>Build skills<br/>your way</h2>
            <p>Simple SKILL.md format. Drop it in, your agent learns it.</p>
          </motion.div>
          
          <motion.div 
            className="bento-card bento-side"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="bento-label">02</span>
            <h3>Mint on Base</h3>
            <p>Own it onchain.</p>
          </motion.div>
          
          <motion.div 
            className="bento-card bento-side"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="bento-label">03</span>
            <h3>Earn forever</h3>
            <p>Royalties on every resale.</p>
          </motion.div>
        </section>

        <section className="numbers">
          <div className="number-item">
            <span className="number-value">000</span>
            <span className="number-label">skills</span>
          </div>
          <div className="number-item">
            <span className="number-value">$0</span>
            <span className="number-label">volume</span>
          </div>
          <div className="number-item">
            <span className="number-value">000</span>
            <span className="number-label">creators</span>
          </div>
        </section>

        <section className="final">
          <h2>
            <motion.span
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Just
            </motion.span>
            {" "}
            <motion.span
              className="highlight"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              build
            </motion.span>
          </h2>
          <Link to="/submit" className="final-cta">Submit a skill →</Link>
        </section>
      </main>

      <footer className="bottomfooter">
        <span>Built on Base</span>
        <span>2026</span>
      </footer>
    </>
  );
}
