import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("skills", "routes/skills.tsx"),
  route("skill/:id", "routes/skill-detail.tsx"),
  route("submit", "routes/submit.tsx"),
  route("profile/:address", "routes/profile.tsx"),
] satisfies RouteConfig;
