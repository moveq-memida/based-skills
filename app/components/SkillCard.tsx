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
        {skill.verified && <span className="skill-verified">✓ Verified</span>}
      </div>
      <h3 className="skill-name">{skill.name}</h3>
      <p className="skill-description">{skill.description}</p>
      <div className="skill-footer">
        <span className="skill-price">{skill.price} ETH</span>
        <span className="skill-downloads">{skill.downloads} downloads</span>
      </div>
    </Link>
  );
}
