import type { MetaFunction } from "react-router";
import { useParams } from "react-router";
import { Header } from "../components/Header";
import { SkillCard, type Skill } from "../components/SkillCard";

export const meta: MetaFunction = () => {
  return [{ title: "Profile | Based Skills" }];
};

const MOCK_USER = {
  address: "0x1234567890abcdef1234567890abcdef12345678",
  name: "WeatherDAO",
  bio: "Building skills for AI agents.",
  stats: { skills: 3, sales: 156, earned: "0.156" },
};

const USER_SKILLS: Skill[] = [
  {
    id: "1",
    name: "Weather Skill",
    description: "Get current weather and forecasts.",
    category: "Utility",
    price: "0.001",
    creator: "0x1234...5678",
    downloads: 156,
    verified: true,
  },
  {
    id: "7",
    name: "Air Quality",
    description: "Real-time air quality data.",
    category: "Utility",
    price: "0.0015",
    creator: "0x1234...5678",
    downloads: 42,
    verified: true,
  },
];

export default function Profile() {
  const { address } = useParams();

  return (
    <div>
      <Header />
      <div className="profile-header">
        <div className="profile-avatar">{MOCK_USER.name.charAt(0)}</div>
        <div>
          <h1 className="profile-name">{MOCK_USER.name}</h1>
          <p className="profile-address">{MOCK_USER.address}</p>
          <p className="profile-bio">{MOCK_USER.bio}</p>
        </div>
      </div>
      
      <div className="profile-stats">
        <div>
          <div className="profile-stat-value">{MOCK_USER.stats.skills}</div>
          <div className="profile-stat-label">Skills</div>
        </div>
        <div>
          <div className="profile-stat-value">{MOCK_USER.stats.sales}</div>
          <div className="profile-stat-label">Sales</div>
        </div>
        <div>
          <div className="profile-stat-value">{MOCK_USER.stats.earned} ETH</div>
          <div className="profile-stat-label">Earned</div>
        </div>
      </div>
      
      <div className="profile-skills">
        <h2 className="profile-skills-title">Published</h2>
        <div className="skills-grid">
          {USER_SKILLS.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
