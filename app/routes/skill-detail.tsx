import type { MetaFunction } from "react-router";
import { useParams } from "react-router";
import { Header } from "../components/Header";

export const meta: MetaFunction = () => {
  return [{ title: "Skill | Based Skills" }];
};

const MOCK_SKILL = {
  id: "1",
  name: "Weather Skill",
  description: "Get current weather and forecasts for any location worldwide. Supports multiple providers.",
  longDescription: `## Overview

Real-time weather data and forecasts for any location.

## Features

• Current conditions
• 7-day forecasts
• Weather alerts
• Multiple units

## Usage

Get weather for [location]
What's the forecast?`,
  category: "Utility",
  price: "0.001",
  creatorName: "WeatherDAO",
  downloads: 156,
  verified: true,
  version: "1.2.0",
  lastUpdated: "2026-01-15",
  license: "MIT",
  tags: ["weather", "forecast", "api"],
};

export default function SkillDetail() {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <div className="skill-detail">
        <div>
          <div className="skill-detail-badge">
            <span className="skill-category">{MOCK_SKILL.category}</span>
            {MOCK_SKILL.verified && <span className="skill-verified">✓ Verified</span>}
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
              {MOCK_SKILL.price}<span className="purchase-price-currency"> ETH</span>
            </div>
            <button className="purchase-btn">Buy Now</button>
            <p className="purchase-note">Instant delivery</p>
          </div>
          
          <div className="info-card">
            <h3 className="info-card-title">Info</h3>
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
              <span className="info-label">License</span>
              <span className="info-value">{MOCK_SKILL.license}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
