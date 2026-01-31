import type { MetaFunction } from "react-router";
import { useEffect, useState } from "react";
import { useReadContract, useReadContracts } from "wagmi";
import { Header } from "../components/Header";
import { SkillCard, type Skill } from "../components/SkillCard";
import { BASED_SKILLS_ADDRESS, BASED_SKILLS_ABI } from "../contracts";

export const meta: MetaFunction = () => {
  return [
    { title: "Skills | Based Skills" },
  ];
};

const CATEGORIES = ["All", "Utility", "Developer", "Creative", "Social", "Productivity", "Finance"];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [skills, setSkills] = useState<Skill[]>([]);

  // Get total supply
  const { data: totalSupply } = useReadContract({
    address: BASED_SKILLS_ADDRESS,
    abi: BASED_SKILLS_ABI,
    functionName: "totalSupply",
  });

  // Build contracts array for batch read
  const tokenIds = totalSupply ? Array.from({ length: Number(totalSupply) }, (_, i) => i) : [];
  
  const { data: skillsData } = useReadContracts({
    contracts: tokenIds.flatMap((id) => [
      {
        address: BASED_SKILLS_ADDRESS,
        abi: BASED_SKILLS_ABI,
        functionName: "getSkill",
        args: [BigInt(id)],
      },
      {
        address: BASED_SKILLS_ADDRESS,
        abi: BASED_SKILLS_ABI,
        functionName: "ownerOf",
        args: [BigInt(id)],
      },
      {
        address: BASED_SKILLS_ADDRESS,
        abi: BASED_SKILLS_ABI,
        functionName: "tokenURI",
        args: [BigInt(id)],
      },
    ]),
  });

  useEffect(() => {
    if (!skillsData || skillsData.length === 0) return;

    const parsedSkills: Skill[] = [];
    
    for (let i = 0; i < tokenIds.length; i++) {
      const skillResult = skillsData[i * 3];
      const ownerResult = skillsData[i * 3 + 1];

      if (skillResult.status !== "success" || !skillResult.result) continue;

      const skill = skillResult.result as any;
      const owner = ownerResult.status === "success" ? ownerResult.result as string : "";

      // V2: skill has name and description directly
      parsedSkills.push({
        id: String(i),
        name: skill.name || `Skill #${i}`,
        description: skill.description || "",
        category: skill.category || "Other",
        price: (Number(skill.price) / 1e18).toString(),
        creator: owner.slice(0, 6) + "..." + owner.slice(-4),
        downloads: Number(skill.totalSales),
        verified: skill.isListed,
      });
    }

    setSkills(parsedSkills);
  }, [skillsData, tokenIds.length]);

  const filteredSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  return (
    <div className="page-skills">
      <Header />
      <div className="skills-header">
        <h1><span>ALL</span><span>SKILLS</span></h1>
        <p>BROWSE / DISCOVER / ACQUIRE</p>
      </div>
      
      <div className="skills-filters">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat} 
            className={`filter-btn ${cat === activeCategory ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="skills-grid">
        {skills.length === 0 ? (
          <div style={{ padding: '48px 32px', color: '#666', textAlign: 'center' }}>
            {totalSupply === undefined ? "Loading..." : "No skills yet. Be the first to submit!"}
          </div>
        ) : filteredSkills.length === 0 ? (
          <div style={{ padding: '48px 32px', color: '#666', textAlign: 'center' }}>
            No skills in this category
          </div>
        ) : (
          filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))
        )}
      </div>
    </div>
  );
}
