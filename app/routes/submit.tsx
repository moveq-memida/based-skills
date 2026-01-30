import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Submit Skill | Based Skills" },
    { name: "description", content: "List your AI agent skill on Based Skills marketplace." },
  ];
};

export default function Submit() {
  return (
    <div>
      <h1>Submit Your Skill</h1>
      <p>Coming soon...</p>
    </div>
  );
}
