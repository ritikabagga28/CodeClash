import { Link } from "react-router-dom";
import Logo from "./Logo";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">
              <Logo size={18} />
            </span>
            <span className="footer-logo-text">
              Code<span className="footer-logo-accent">Clash</span>
            </span>
          </Link>
          <p className="footer-tagline">
            The modern competitive programming platform for Java developers.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <span className="footer-col-title">Platform</span>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/challenges">Problems</Link>
            <Link to="/progress">Progress</Link>
            <Link to="/achievements">Achievements</Link>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">Account</span>
            <Link to="/login">Sign In</Link>
            <Link to="/settings">Settings</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CodeClash. Built for competitive programmers.</p>
      </div>
    </footer>
  );
}
