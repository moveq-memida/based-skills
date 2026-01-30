import { Link } from "react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">BASED SKILLS</Link>
      <nav className="nav">
        <Link to="/skills">Explore</Link>
        <Link to="/submit">Submit</Link>
        <ConnectButton 
          chainStatus="icon"
          showBalance={false}
          accountStatus="address"
        />
      </nav>
    </header>
  );
}
