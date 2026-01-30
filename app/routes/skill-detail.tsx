import type { MetaFunction } from "react-router";
import { useParams } from "react-router";
import { Header } from "../components/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "Skill Details - Based Skills" },
  ];
};

// Mock skill data
const MOCK_SKILL = {
  id: "1",
  name: "Weather Skill",
  description: "Get current weather and forecasts for any location worldwide. Supports multiple weather providers and customizable output formats.",
  longDescription: `
## Overview

The Weather Skill provides real-time weather data and forecasts for any location on Earth. It's designed to be simple yet powerful, with support for multiple data providers.

## Features

- Current weather conditions (temperature, humidity, wind, etc.)
- 7-day forecasts
- Hourly forecasts up to 48 hours
- Weather alerts and warnings
- Multiple unit systems (metric, imperial)
- Location auto-detection

## Usage

\`\`\`
Get weather for [location]
What's the forecast for [location]?
Will it rain tomorrow in [location]?
\`\`\`

## Requirements

- No API key required (uses free tier)
- Internet connection
  `,
  category: "Utility",
  price: "0.001",
  creator: "0x1234567890abcdef1234567890abcdef12345678",
  creatorName: "WeatherDAO",
  downloads: 156,
  verified: true,
  version: "1.2.0",
  lastUpdated: "2026-01-15",
  license: "MIT",
  tags: ["weather", "forecast", "utility", "api"],
};

export default function SkillDetail() {
  const { id } = useParams();

  return (
    <div className="page">
      <Header />
      <main className="main-content">
        <div className="skill-detail">
          <div className="skill-detail-main">
            <div className="skill-detail-header">
              <span className="skill-category">{MOCK_SKILL.category}</span>
              {MOCK_SKILL.verified && (
                <span className="skill-verified">✓ Verified</span>
              )}
            </div>
            <h1 className="skill-detail-title">{MOCK_SKILL.name}</h1>
            <p className="skill-detail-description">{MOCK_SKILL.description}</p>

            <div className="skill-tags">
              {MOCK_SKILL.tags.map((tag) => (
                <span key={tag} className="skill-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="skill-detail-content">
              <pre className="skill-readme">{MOCK_SKILL.longDescription}</pre>
            </div>
          </div>

          <aside className="skill-detail-sidebar">
            <div className="skill-purchase-card">
              <div className="skill-purchase-price">
                <span className="price-value">{MOCK_SKILL.price}</span>
                <span className="price-currency">ETH</span>
              </div>
              <button className="purchase-button">Buy Now</button>
              <p className="purchase-note">Instant delivery to your wallet</p>
            </div>

            <div className="skill-info-card">
              <h3>Skill Info</h3>
              <div className="skill-info-row">
                <span className="info-label">Creator</span>
                <span className="info-value">{MOCK_SKILL.creatorName}</span>
              </div>
              <div className="skill-info-row">
                <span className="info-label">Version</span>
                <span className="info-value">{MOCK_SKILL.version}</span>
              </div>
              <div className="skill-info-row">
                <span className="info-label">Downloads</span>
                <span className="info-value">{MOCK_SKILL.downloads}</span>
              </div>
              <div className="skill-info-row">
                <span className="info-label">Updated</span>
                <span className="info-value">{MOCK_SKILL.lastUpdated}</span>
              </div>
              <div className="skill-info-row">
                <span className="info-label">License</span>
                <span className="info-value">{MOCK_SKILL.license}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
