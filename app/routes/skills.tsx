import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Explore Skills | Based Skills" },
    { name: "description", content: "Browse and buy AI agent skills on Base." },
  ];
};

export default function Skills() {
  return (
    <div>
      <h1>Explore Skills</h1>
      <p>Coming soon...</p>
    </div>
  );
}
