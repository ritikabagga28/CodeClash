import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ArrowRight, User, LogOut, Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useApp } from "../context/AppContext";
import "./Navbar.css";

export default function Navbar() {
  const { auth, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <NavLink to="/" className="navbar-brand" onClick={() => setMobileOpen(false)}>
            <span className="navbar-brand-icon">
              <Logo size={24} />
            </span>
            <span className="navbar-brand-text">
              CODE <span className="navbar-brand-accent">CLASH</span>
            </span>
          </NavLink>

          {/* Center Navigation Links */}
          <ul className="navbar-links">
            <li>
              <NavLink
                to="/challenges"
                className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
              >
                Challenges
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
              >
                Leaderboard
              </NavLink>
            </li>
            <li>
              <a href="/#how-it-works" className="navbar-link">
                How It Works
              </a>
            </li>
            <li>
              <NavLink
                to="/progress"
                className={({ isActive }) => `navbar-link${isActive ? " active" : ""}`}
              >
                Progress
              </NavLink>
            </li>
          </ul>

          {/* Right Action Bar */}
          <div className="navbar-right">
            <ThemeToggle />

            {auth.isLoggedIn ? (
              <div className="navbar-user-group">
                <span className="navbar-username" title={auth.username}>
                  <User size={14} />
                  <span>{auth.username}</span>
                </span>
                <button
                  type="button"
                  className="navbar-logout-btn"
                  onClick={logout}
                  title="Log out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="navbar-cta-btn">
                <span>ENTER CLASH</span>
                <ArrowRight size={14} />
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="navbar-hamburger"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="navbar-mobile-menu">
            <ul className="navbar-mobile-links">
              <li>
                <NavLink to="/challenges" onClick={() => setMobileOpen(false)}>
                  Challenges
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" onClick={() => setMobileOpen(false)}>
                  Leaderboard
                </NavLink>
              </li>
              <li>
                <a href="/#how-it-works" onClick={() => setMobileOpen(false)}>
                  How It Works
                </a>
              </li>
              <li>
                <NavLink to="/progress" onClick={() => setMobileOpen(false)}>
                  Progress
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" onClick={() => setMobileOpen(false)}>
                  Settings
                </NavLink>
              </li>
            </ul>
            <div className="navbar-mobile-actions">
              {auth.isLoggedIn ? (
                <button
                  type="button"
                  className="navbar-mobile-logout"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                >
                  Log out ({auth.username})
                </button>
              ) : (
                <Link
                  to="/login"
                  className="navbar-cta-btn full-width"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>ENTER CLASH</span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
