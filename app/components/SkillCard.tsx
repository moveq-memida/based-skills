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
        {skill.verified && <span className="skill-verified">VERIFIED</span>}
      </div>
      <div className="skill-main">
        <h3 className="skill-name">{skill.name}</h3>
        <p className="skill-description">{skill.description}</p>
      </div>
      <div className="skill-footer">
        <span className="skill-price">
          {skill.price}<span className="skill-price-currency"> ETH</span>
        </span>
        <div className="skill-downloads">{skill.downloads} DOWNLOADS</div>
      </div>
    </Link>
  );
}
