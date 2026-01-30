import { Link } from "react-router";

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  creator: string;
  downloads: number;
  verified: boolean;
}

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link to={`/skill/${skill.id}`} className="skill-card">
      <div className="skill-card-header">
        <span className="skill-category">{skill.category}</span>
        {skill.verified && (
          <span className="skill-verified">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Verified
          </span>
        )}
      </div>
      <h3 className="skill-name">{skill.name}</h3>
      <p className="skill-description">{skill.description}</p>
      <div className="skill-footer">
        <span className="skill-price">
          {skill.price}
          <span className="skill-price-currency">ETH</span>
        </span>
        <span className="skill-downloads">{skill.downloads} downloads</span>
      </div>
    </Link>
  );
}
