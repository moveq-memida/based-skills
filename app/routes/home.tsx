import type { MetaFunction } from "react-router";
import styles from "./home.module.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Based Skills - AI Agent Skill Marketplace on Base" },
    { name: "description", content: "Buy, sell, and trade AI agent skills as NFTs on Base blockchain." },
  ];
};

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>BASED SKILLS</div>
        <nav className={styles.nav}>
          <a href="/skills">Explore</a>
          <a href="/submit">Submit</a>
          <button className={styles.connectButton}>Connect Wallet</button>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            The Marketplace for
            <br />
            <span className={styles.highlight}>AI Agent Skills</span>
          </h1>
          <p className={styles.subtitle}>
            Buy, sell, and trade skills as NFTs on Base.
            <br />
            Give your agent new abilities.
          </p>
          <div className={styles.heroActions}>
            <a href="/skills" className={styles.primaryButton}>
              Explore Skills
            </a>
            <a href="/submit" className={styles.secondaryButton}>
              List Your Skill
            </a>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Skills Listed</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Total Sales</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Creators</span>
          </div>
        </section>

        <section className={styles.featured}>
          <h2 className={styles.sectionTitle}>Featured Skills</h2>
          <div className={styles.skillGrid}>
            <div className={styles.emptyState}>
              No skills listed yet. Be the first to list!
            </div>
          </div>
        </section>

        <section className={styles.howItWorks}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3>Create</h3>
              <p>Build a skill for AI agents using SKILL.md format</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>Mint</h3>
              <p>Upload and mint your skill as an NFT on Base</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>Earn</h3>
              <p>Get paid when others buy your skill. Earn royalties on resales.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Built on Base</p>
      </footer>
    </div>
  );
}
