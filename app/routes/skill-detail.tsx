import type { MetaFunction } from "react-router";
import { useParams } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Skill Details | Based Skills" },
  ];
};

export default function SkillDetail() {
  const { id } = useParams();
  
  return (
    <div>
      <h1>Skill #{id}</h1>
      <p>Coming soon...</p>
    </div>
  );
}
