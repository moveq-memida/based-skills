import type { MetaFunction } from "react-router";
import { Header } from "../components/Header";
import { SkillCard, type Skill } from "../components/SkillCard";

export const meta: MetaFunction = () => {
  return [
    { title: "Explore Skills - Based Skills" },
    { name: "description", content: "Browse and discover AI agent skills on Base." },
  ];
};

// Mock data for now
const MOCK_SKILLS: Skill[] = [
  {
    id: "1",
    name: "Weather Skill",
    description: "Get current weather and forecasts for any location worldwide.",
    category: "Utility",
    price: "0.001",
    creator: "0x1234...5678",
    downloads: 156,
    verified: true,
  },
  {
    id: "2",
    name: "Code Review",
    description: "Automated code review with best practices and security checks.",
    category: "Developer",
    price: "0.005",
    creator: "0xabcd...efgh",
    downloads: 89,
    verified: true,
  },
  {
    id: "3",
    name: "Image Generator",
    description: "Generate images from text prompts using AI models.",
    category: "Creative",
    price: "0.01",
    creator: "0x9876...5432",
    downloads: 234,
    verified: false,
  },
  {
    id: "4",
    name: "Twitter Bot",
    description: "Automate Twitter interactions, posting, and engagement.",
    category: "Social",
    price: "0.002",
    creator: "0xfedc...ba98",
    downloads: 67,
    verified: true,
  },
  {
    id: "5",
    name: "Calendar Manager",
    description: "Manage calendar events, scheduling, and reminders.",
    category: "Productivity",
    price: "0.003",
    creator: "0x1111...2222",
    downloads: 112,
    verified: true,
  },
  {
    id: "6",
    name: "Translation",
    description: "Real-time translation between 50+ languages.",
    category: "Utility",
    price: "0.002",
    creator: "0x3333...4444",
    downloads: 198,
    verified: true,
  },
];

const CATEGORIES = ["All", "Utility", "Developer", "Creative", "Social", "Productivity"];

export default function Skills() {
  return (
    <div className="page">
      <Header />
      <main className="main-content">
        <div className="skills-header">
          <h1>Explore Skills</h1>
          <p>Discover skills to enhance your AI agent</p>
        </div>

        <div className="skills-filters">
          <div className="category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`category-tab ${cat === "All" ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search skills..." />
          </div>
        </div>

        <div className="skills-grid">
          {MOCK_SKILLS.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </main>
    </div>
  );
}
