import { Link } from "react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">⚡</span>
          Based Skills
        </Link>
        <nav className="nav">
          <Link to="/skills" className="nav-link">Explore</Link>
          <Link to="/submit" className="nav-link">Submit</Link>
          <ConnectButton 
            chainStatus="icon"
            showBalance={false}
            accountStatus="address"
          />
        </nav>
      </div>
    </header>
  );
}
