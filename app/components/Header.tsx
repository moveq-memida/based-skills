import { Link } from "react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">Based Skills</Link>
        <nav className="nav">
          <Link to="/skills" className="nav-link">Skills</Link>
          <Link to="/submit" className="nav-link">Submit</Link>
          <ConnectButton chainStatus="none" showBalance={false} accountStatus="avatar" />
        </nav>
      </div>
    </header>
  );
}
