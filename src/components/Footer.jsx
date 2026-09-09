import { Link } from "react-router-dom";
import Logo from "./Logo";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <Logo size={20} />
            <span className="footer-logo-text">
              CODE <span className="footer-logo-accent">CLASH</span>
            </span>
          </Link>
          <p className="footer-tagline">
            Where logic meets pressure. The premier championship platform for competitive programmers.
          </p>
        </div>

        <div className="footer-columns">
          <div className="footer-col">
            <span className="footer-col-title">Championship</span>
            <Link to="/challenges">Challenges</Link>
            <Link to="/dashboard">Leaderboard</Link>
            <Link to="/progress">Progress</Link>
            <Link to="/achievements">Achievements</Link>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">Platform</span>
            <Link to="/login">Enter Clash</Link>
            <Link to="/create">Create Problem</Link>
            <Link to="/settings">Settings</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-blade-line" />
        <p>© {new Date().getFullYear()} CODE CLASH · International Competitive Programming Arena</p>
      </div>
    </footer>
  );
}
