import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const meta: MetaFunction = () => {
  return [
    { title: "Based Skills | AI Agent Skill Marketplace on Base" },
    { name: "description", content: "The marketplace for AI agent skills. Buy, sell, and trade skills on Base." },
  ];
};

export default function Home() {
  return (
    <div className="page">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">⚡</span>
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
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Built on Base
          </div>
          <h1 className="hero-title">
            <span className="hero-title-gradient">Skills for</span>
            <br />
            AI Agents
          </h1>
          <p className="hero-description">
            The marketplace for AI agent skills. 
            Create, share, and monetize capabilities that make agents smarter.
          </p>
          <div className="hero-actions">
            <Link to="/skills" className="btn btn-primary">
              Explore Skills →
            </Link>
            <Link to="/submit" className="btn btn-secondary">
              Submit Skill
            </Link>
          </div>
        </section>

        <div className="container">
          <div className="stats">
            <div className="stat">
              <div className="stat-value">0</div>
              <div className="stat-label">Skills Listed</div>
            </div>
            <div className="stat">
              <div className="stat-value">$0</div>
              <div className="stat-label">Total Volume</div>
            </div>
            <div className="stat">
              <div className="stat-value">0</div>
              <div className="stat-label">Creators</div>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">How it works</h2>
            <p className="section-description">
              Three steps to supercharge your agent
            </p>
          </div>
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">Create</h3>
              <p className="feature-description">
                Build a skill using the SKILL.md format. Define capabilities, instructions, and examples.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h3 className="feature-title">Mint</h3>
              <p className="feature-description">
                Publish your skill as an NFT on Base. Set your price and royalties.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Earn</h3>
              <p className="feature-description">
                Get paid when others use your skill. Earn royalties on every resale.
              </p>
            </div>
          </div>
        </section>

        <section className="cta">
          <h2 className="cta-title">
            <span className="cta-title-dim">Just</span> build it.
          </h2>
          <div className="hero-actions">
            <Link to="/submit" className="btn btn-primary">
              Submit Your Skill →
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">
          Built on <a href="https://base.org" className="footer-link" target="_blank" rel="noopener">Base</a>
        </p>
      </footer>
    </div>
  );
}
