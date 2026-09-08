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
  Coffee,
  ChevronLeft,
  ChevronRight,
  LogIn,
  LogOut,
} from "lucide-react";
import Logo from "./Logo";
import { useApp } from "../context/AppContext";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/challenges", label: "Challenges", icon: Swords },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/create", label: "Create Problem", icon: PlusCircle },
  { to: "/achievements", label: "Achievements", icon: Trophy },
];

export default function Sidebar() {
  const { level, progress, auth, logout } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className={`sidebar${collapsed ? " sidebar-collapsed" : ""}`} aria-label="Main navigation">
      <div className="sidebar-top">
        <NavLink to="/" className="sidebar-brand">
          <span className="sidebar-brand-icon">
            <Logo size={18} />
          </span>
          <span className="sidebar-brand-text">
            Code<span style={{ color: "var(--accent-light)" }}>Clash</span>
          </span>
        </NavLink>

        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      <div className="sidebar-level">
        <span className="sidebar-level-tag">Lv. {level.level}</span>
        <span className="sidebar-level-name">{level.name}</span>
      </div>

      <ul className="sidebar-nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) => `sidebar-link${isActive ? " sidebar-link-active" : ""}`}
              title={collapsed ? label : undefined}
            >
              <Icon size={19} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <NavLink
          to="/settings"
          className={({ isActive }) => `sidebar-link${isActive ? " sidebar-link-active" : ""}`}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings size={18} strokeWidth={2} />
          <span>Settings</span>
        </NavLink>

        {auth.isLoggedIn ? (
          <>
            <div className="sidebar-link sidebar-link-static sidebar-profile" title={collapsed ? auth.username : undefined}>
              <User size={18} strokeWidth={2} />
              <span>{auth.username}</span>
            </div>
            <button
              type="button"
              className="sidebar-link sidebar-link-static"
              onClick={logout}
              title={collapsed ? "Log out" : undefined}
            >
              <LogOut size={18} strokeWidth={2} />
              <span>Log out</span>
            </button>
          </>
        ) : (
          <Link to="/login" className="sidebar-link sidebar-link-static" title={collapsed ? "Log In" : undefined}>
            <LogIn size={18} strokeWidth={2} />
            <span>Log In</span>
          </Link>
        )}

        <div className="sidebar-points">
          <span>{progress.points.toLocaleString()}</span> pts
        </div>
      </div>
    </nav>
  );
}
