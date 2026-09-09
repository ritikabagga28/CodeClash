import { Sun, Moon } from "lucide-react";
import { useApp } from "../context/AppContext";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={toggleTheme}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      <span className={`theme-toggle-label ${!isDark ? "active" : ""}`}>LIGHT</span>
      <span className="theme-toggle-track">
        <span className={`theme-toggle-thumb ${isDark ? "dark" : "light"}`}>
          {isDark ? <Moon size={12} strokeWidth={2.5} /> : <Sun size={12} strokeWidth={2.5} />}
        </span>
      </span>
      <span className={`theme-toggle-label ${isDark ? "active" : ""}`}>DARK</span>
    </button>
  );
}
