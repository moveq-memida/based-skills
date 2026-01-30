import type { MetaFunction } from "react-router";
import { useParams } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Profile | Based Skills" },
  ];
};

export default function Profile() {
  const { address } = useParams();
  
  return (
    <div>
      <h1>Profile</h1>
      <p>Address: {address}</p>
      <p>Coming soon...</p>
    </div>
  );
}
