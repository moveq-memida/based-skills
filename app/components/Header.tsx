import { Link } from "react-router";

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">BASED SKILLS</Link>
      <nav className="nav">
        <Link to="/skills">Explore</Link>
        <Link to="/submit">Submit</Link>
        <button className="connect-button">Connect Wallet</button>
      </nav>
    </header>
  );
}
