import type { MetaFunction } from "react-router";
import { useParams } from "react-router";
import { Header } from "../components/Header";

export const meta: MetaFunction = () => {
  return [{ title: "Skill Details | Based Skills" }];
};

const MOCK_SKILL = {
  id: "1",
  name: "Weather Skill",
  description: "Get current weather and forecasts for any location worldwide. Supports multiple weather providers and customizable output formats.",
  longDescription: `## Overview

The Weather Skill provides real-time weather data and forecasts for any location on Earth.

## Features

• Current weather conditions
• 7-day forecasts
• Hourly forecasts up to 48 hours
• Weather alerts and warnings
• Multiple unit systems

## Usage

Get weather for [location]
What's the forecast for [location]?
Will it rain tomorrow?`,
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
            <div className="skill-detail-badge">
              <span className="skill-category">{MOCK_SKILL.category}</span>
              {MOCK_SKILL.verified && (
                <span className="skill-verified">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Verified
                </span>
              )}
            </div>
            <h1 className="skill-detail-title">{MOCK_SKILL.name}</h1>
            <p className="skill-detail-description">{MOCK_SKILL.description}</p>

            <div className="skill-tags">
              {MOCK_SKILL.tags.map((tag) => (
                <span key={tag} className="skill-tag">{tag}</span>
              ))}
            </div>

            <pre className="skill-readme">{MOCK_SKILL.longDescription}</pre>
          </div>

          <aside className="skill-detail-sidebar">
            <div className="purchase-card">
              <div className="purchase-price">
                {MOCK_SKILL.price}
                <span className="purchase-price-currency"> ETH</span>
              </div>
              <button className="purchase-btn">Buy Now</button>
              <p className="purchase-note">Instant delivery to your wallet</p>
            </div>

            <div className="info-card">
              <h3 className="info-card-title">Skill Info</h3>
              <div className="info-row">
                <span className="info-label">Creator</span>
                <span className="info-value">{MOCK_SKILL.creatorName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Version</span>
                <span className="info-value">{MOCK_SKILL.version}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Downloads</span>
                <span className="info-value">{MOCK_SKILL.downloads}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Updated</span>
                <span className="info-value">{MOCK_SKILL.lastUpdated}</span>
              </div>
              <div className="info-row">
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
