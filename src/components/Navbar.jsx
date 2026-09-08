import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Swords,
  TrendingUp,
  PlusCircle,
  Trophy,
  Settings,
  User,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Logo from "./Logo";
import { useApp } from "../context/AppContext";
import "./Navbar.css";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/challenges", label: "Problems", icon: Swords },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/create", label: "Create", icon: PlusCircle },
  { to: "/achievements", label: "Achievements", icon: Trophy },
];

export default function Navbar() {
  const { level, progress, auth, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-inner">
        {/* Brand */}
        <NavLink to="/" className="navbar-brand" onClick={() => setMobileOpen(false)}>
          <span className="navbar-brand-icon">
            <Logo size={18} />
          </span>
          <span className="navbar-brand-text">
            Code<span className="navbar-brand-accent">Clash</span>
          </span>
        </NavLink>

        {/* Desktop nav links */}
        <ul className="navbar-links">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `navbar-link${isActive ? " navbar-link-active" : ""}`
                }
              >
                <Icon size={16} strokeWidth={2} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="navbar-right">
          <div className="navbar-meta">
            <span className="navbar-level">Lv. {level.level}</span>
            <span className="navbar-points">{progress.points.toLocaleString()} pts</span>
          </div>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `navbar-icon-btn${isActive ? " navbar-icon-btn-active" : ""}`
            }
            title="Settings"
          >
            <Settings size={18} strokeWidth={2} />
          </NavLink>

          {auth.isLoggedIn ? (
            <>
              <div className="navbar-user" title={auth.username}>
                <User size={16} strokeWidth={2} />
                <span>{auth.username}</span>
              </div>
              <button
                type="button"
                className="navbar-icon-btn"
                onClick={logout}
                title="Log out"
              >
                <LogOut size={18} strokeWidth={2} />
              </button>
            </>
          ) : (
            <Link to="/login" className="navbar-login-btn">
              <LogIn size={16} strokeWidth={2} />
              <span>Log In</span>
            </Link>
          )}

          {/* Mobile hamburger */}
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="navbar-mobile-menu">
          <ul className="navbar-mobile-links">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `navbar-mobile-link${isActive ? " navbar-mobile-link-active" : ""}`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={18} strokeWidth={2} />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `navbar-mobile-link${isActive ? " navbar-mobile-link-active" : ""}`
                }
                onClick={() => setMobileOpen(false)}
              >
                <Settings size={18} strokeWidth={2} />
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
          <div className="navbar-mobile-footer">
            {auth.isLoggedIn ? (
              <div className="navbar-mobile-user">
                <User size={16} />
                <span>{auth.username}</span>
                <button type="button" className="navbar-mobile-logout" onClick={() => { logout(); setMobileOpen(false); }}>
                  <LogOut size={16} /> Log out
                </button>
              </div>
            ) : (
              <Link to="/login" className="navbar-mobile-login" onClick={() => setMobileOpen(false)}>
                <LogIn size={16} /> Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
