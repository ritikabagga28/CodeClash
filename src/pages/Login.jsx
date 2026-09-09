import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";
import Logo from "../components/Logo";
import { useApp } from "../context/AppContext";
import "./Login.css";

export default function Login({ initialMode = "login" }) {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState(
    location.pathname === "/signup" || initialMode === "signup" ? "signup" : "login"
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (location.pathname === "/signup") {
      setMode("signup");
    } else if (location.pathname === "/login") {
      setMode("login");
    }
  }, [location.pathname]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      login(username);
      navigate("/dashboard");
    }, 400);
  }

  function handleGuest() {
    login("Guest");
    navigate("/dashboard");
  }

  const isSignUp = mode === "signup";

  return (
    <div className="login-page-container">
      <div className="login-card-editorial">
        {/* Brand Header */}
        <div className="login-brand-badge">
          <Logo size={28} />
          <span className="login-brand-title">
            CODE <span className="text-crimson">CLASH</span>
          </span>
        </div>

        {/* Auth Mode Tabs */}
        <div className="login-tab-bar" role="tablist">
          <button
            type="button"
            className={`login-tab-item ${!isSignUp ? "active" : ""}`}
            onClick={() => setMode("login")}
            role="tab"
            aria-selected={!isSignUp}
          >
            SIGN IN
          </button>
          <button
            type="button"
            className={`login-tab-item ${isSignUp ? "active" : ""}`}
            onClick={() => setMode("signup")}
            role="tab"
            aria-selected={isSignUp}
          >
            SIGN UP
          </button>
        </div>

        <h1 className="login-card-headline">
          {isSignUp ? "Enter the Arena" : "Welcome Back"}
        </h1>
        <p className="login-card-sub">
          {isSignUp
            ? "Create your competitor profile to join the official championship."
            : "Sign in to access your battleground and track active streak points."}
        </p>

        <form className="login-form-group" onSubmit={handleSubmit}>
          <label className="login-input-label">
            <span>COMPETITOR USERNAME / EMAIL</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ada.lovelace"
              autoComplete="username"
              required
            />
          </label>

          <label className="login-input-label">
            <span>PASSWORD</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
            />
          </label>

          <button type="submit" className="btn-primary-clash full-width" disabled={submitting}>
            <span>{submitting ? "VERIFYING..." : isSignUp ? "CREATE COMPETITOR ACCOUNT" : "ENTER THE CLASH"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="login-divider-line">
          <span>OR</span>
        </div>

        <button type="button" className="btn-secondary-clash full-width" onClick={handleGuest}>
          <User size={14} />
          <span>CONTINUE AS GUEST</span>
        </button>

        <p className="login-disclaimer">
          Prototype Mode — enter any credentials to access the Code Clash platform.
        </p>
      </div>
    </div>
  );
}
