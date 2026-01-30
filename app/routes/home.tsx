import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { Background3D } from "../components/Background3D";

export const meta: MetaFunction = () => {
  return [
    { title: "Based Skills | AI Agent Skill Marketplace on Base" },
    { name: "description", content: "The marketplace for AI agent skills. Buy, sell, and trade skills on Base." },
  ];
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  return (
    <div className="page">
      <Background3D />
      
      <motion.header 
        className="header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-inner">
          <Link to="/" className="logo">
            <motion.span 
              className="logo-icon"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              ⚡
            </motion.span>
            Based Skills
          </Link>
          <nav className="nav">
            <Link to="/skills" className="nav-link">Explore</Link>
            <Link to="/submit" className="nav-link">Submit</Link>
            <ConnectButton 
              chainStatus="icon"
              showBalance={false}
              accountStatus="address"
            />
          </nav>
        </div>
      </motion.header>

      <main className="main-content">
        <section className="hero">
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="hero-badge-dot"></span>
            Built on Base
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span className="hero-title-gradient" variants={fadeUp} custom={0}>
              Skills for
            </motion.span>
            <br />
            <motion.span variants={fadeUp} custom={1}>
              AI Agents
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            The marketplace for AI agent skills. 
            Create, share, and monetize capabilities that make agents smarter.
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/skills" className="btn btn-primary">
                Explore Skills →
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/submit" className="btn btn-secondary">
                Submit Skill
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="stats">
            {[
              { value: "0", label: "Skills Listed" },
              { value: "$0", label: "Total Volume" },
              { value: "0", label: "Creators" },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                className="stat"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <section className="section">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">How it works</h2>
            <p className="section-description">
              Three steps to supercharge your agent
            </p>
          </motion.div>
          
          <div className="features">
            {[
              { icon: "📝", title: "Create", desc: "Build a skill using the SKILL.md format. Define capabilities, instructions, and examples." },
              { icon: "🔗", title: "Mint", desc: "Publish your skill as an NFT on Base. Set your price and royalties." },
              { icon: "💰", title: "Earn", desc: "Get paid when others use your skill. Earn royalties on every resale." },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 20px 40px rgba(0, 82, 255, 0.2)",
                  borderColor: "rgba(0, 82, 255, 0.3)",
                }}
              >
                <motion.div 
                  className="feature-icon"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section 
          className="cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="cta-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="cta-title-dim">Just</span>{" "}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              build it.
            </motion.span>
          </motion.h2>
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/submit" className="btn btn-primary">
                Submit Your Skill →
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>

      <footer className="footer">
        <p className="footer-text">
          Built on <a href="https://base.org" className="footer-link" target="_blank" rel="noopener">Base</a>
        </p>
      </footer>
    </div>
  );
}
