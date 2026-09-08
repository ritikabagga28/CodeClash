import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogIn, User, UserPlus } from "lucide-react";
import Button from "../components/Button";
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
    <div className="page login-page">
      <div className="login-card">
        {/* Brand Header */}
        <div className="login-brand-header">
          <div className="login-brand-icon-wrapper">
            <Logo size={28} />
          </div>
          <span className="login-brand-text">
            Code<span className="login-brand-accent">Clash</span>
          </span>
        </div>

        {/* Auth Mode Tabs */}
        <div className="login-tabs" role="tablist">
          <button
            type="button"
            className={`login-tab ${!isSignUp ? "active" : ""}`}
            onClick={() => setMode("login")}
            role="tab"
            aria-selected={!isSignUp}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`login-tab ${isSignUp ? "active" : ""}`}
            onClick={() => setMode("signup")}
            role="tab"
            aria-selected={isSignUp}
          >
            Sign Up
          </button>
        </div>

        <h1 className="login-title">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="login-subtitle">
          {isSignUp
            ? "Join CodeClash to compete, earn XP, and track your coding streak."
            : "Sign in to pick up your streak where you left off."}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span>Username or email</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ada.lovelace"
              autoComplete="username"
              required
            />
          </label>

          <label className="login-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
            />
          </label>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={isSignUp ? UserPlus : LogIn}
            loading={submitting}
            fullWidth
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <div className="login-divider">
          <span>or</span>
        </div>

        <Button variant="ghost" size="lg" icon={User} onClick={handleGuest} fullWidth>
          Continue as Guest
        </Button>

        <p className="login-note">
          This is a prototype — any username and password signs you in. Real accounts arrive in a
          later evaluation.
        </p>

        <p className="login-footer-link">
          {isSignUp ? "Already have an account? " : "New here? "}
          <button
            type="button"
            className="login-footer-action"
            onClick={() => setMode(isSignUp ? "login" : "signup")}
          >
            {isSignUp ? "Sign in to your account" : "Create an account"}
          </button>
        </p>
      </div>
    </div>
  );
}
