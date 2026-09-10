import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import Logo from "../components/Logo";
import { useApp } from "../context/AppContext";
import { registerUser, authenticateUser } from "../services/authService";
import "./Login.css";

export default function Login({ initialMode = "login" }) {
  const { auth, login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const isSignUp = location.pathname === "/signup" || initialMode === "signup";

  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error and status states
  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // If user is already authenticated, redirect to destination or dashboard
  useEffect(() => {
    if (auth.isLoggedIn) {
      const destination = location.state?.from?.pathname || "/dashboard";
      navigate(destination, { replace: true });
    }
  }, [auth.isLoggedIn, navigate, location.state]);

  function switchMode(newMode) {
    setLoginErrors({});
    setSignupErrors({});
    if (newMode === "signup") {
      setSignupSuccess("");
      navigate("/signup", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }

  // Handle Login submission
  async function handleLoginSubmit(e) {
    e.preventDefault();
    setLoginErrors({});
    setSubmitting(true);

    const email = loginForm.email.trim();
    const password = loginForm.password;

    const errors = {};
    if (!email) {
      errors.email = "Email is required.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      setSubmitting(false);
      return;
    }

    try {
      const result = await authenticateUser({ email, password });

      if (!result.success) {
        if (result.field) {
          setLoginErrors({ [result.field]: result.error, general: result.error });
        } else {
          setLoginErrors({ general: result.error || "Authentication failed." });
        }
        setSubmitting(false);
        return;
      }

      // Successful login
      login(result.user);
      const destination = location.state?.from?.pathname || "/dashboard";
      navigate(destination, { replace: true });
    } catch {
      setLoginErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  // Handle Signup submission
  async function handleSignupSubmit(e) {
    e.preventDefault();
    setSignupErrors({});
    setSignupSuccess("");
    setSubmitting(true);

    try {
      const result = await registerUser(signupForm);

      if (!result.success) {
        setSignupErrors(result.errors || { general: "Registration failed." });
        setSubmitting(false);
        return;
      }

      // Successful registration: do NOT auto-login.
      // Pre-fill email in login form and switch to login tab with success message.
      setLoginForm((prev) => ({ ...prev, email: signupForm.email.trim().toLowerCase(), password: "" }));
      setSignupForm({ name: "", email: "", password: "", confirmPassword: "" });
      setSignupSuccess("Account created successfully! Please sign in with your credentials.");
      navigate("/login", { replace: true });
    } catch {
      setSignupErrors({ general: "An unexpected error occurred during registration." });
    } finally {
      setSubmitting(false);
    }
  }

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
            onClick={() => switchMode("login")}
            role="tab"
            aria-selected={!isSignUp}
          >
            SIGN IN
          </button>
          <button
            type="button"
            className={`login-tab-item ${isSignUp ? "active" : ""}`}
            onClick={() => switchMode("signup")}
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
            ? "Create your verified competitor profile to join the official championship."
            : "Sign in with your registered credentials to access your battleground."}
        </p>

        {/* Success Alert */}
        {!isSignUp && signupSuccess && (
          <div className="login-alert-banner success" role="alert">
            <CheckCircle2 size={16} />
            <span>{signupSuccess}</span>
          </div>
        )}

        {/* General Error Alerts */}
        {!isSignUp && loginErrors.general && (
          <div className="login-alert-banner error" role="alert">
            <AlertCircle size={16} />
            <span>{loginErrors.general}</span>
          </div>
        )}

        {isSignUp && signupErrors.general && (
          <div className="login-alert-banner error" role="alert">
            <AlertCircle size={16} />
            <span>{signupErrors.general}</span>
          </div>
        )}

        {/* ===================== SIGN IN FORM ===================== */}
        {!isSignUp ? (
          <form className="login-form-group" onSubmit={handleLoginSubmit} noValidate>
            <label className={`login-input-label ${loginErrors.email ? "has-error" : ""}`}>
              <span>COMPETITOR EMAIL</span>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => {
                  setLoginForm({ ...loginForm, email: e.target.value });
                  if (loginErrors.email) setLoginErrors((prev) => ({ ...prev, email: "", general: "" }));
                }}
                placeholder="ada@codeclash.dev"
                autoComplete="email"
                disabled={submitting}
                required
              />
              {loginErrors.email && (
                <span className="login-field-error">
                  <AlertCircle size={12} />
                  {loginErrors.email}
                </span>
              )}
            </label>

            <label className={`login-input-label ${loginErrors.password ? "has-error" : ""}`}>
              <span>PASSWORD</span>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => {
                  setLoginForm({ ...loginForm, password: e.target.value });
                  if (loginErrors.password) setLoginErrors((prev) => ({ ...prev, password: "", general: "" }));
                }}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={submitting}
                required
              />
              {loginErrors.password && (
                <span className="login-field-error">
                  <AlertCircle size={12} />
                  {loginErrors.password}
                </span>
              )}
            </label>

            <button type="submit" className="btn-primary-clash full-width" disabled={submitting}>
              <span>{submitting ? "AUTHENTICATING..." : "ENTER THE CLASH"}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        ) : (
          /* ===================== SIGN UP FORM ===================== */
          <form className="login-form-group" onSubmit={handleSignupSubmit} noValidate>
            <label className={`login-input-label ${signupErrors.name ? "has-error" : ""}`}>
              <span>COMPETITOR NAME</span>
              <input
                type="text"
                value={signupForm.name}
                onChange={(e) => {
                  setSignupForm({ ...signupForm, name: e.target.value });
                  if (signupErrors.name) setSignupErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="Ada Lovelace"
                autoComplete="name"
                disabled={submitting}
                required
              />
              {signupErrors.name && (
                <span className="login-field-error">
                  <AlertCircle size={12} />
                  {signupErrors.name}
                </span>
              )}
            </label>

            <label className={`login-input-label ${signupErrors.email ? "has-error" : ""}`}>
              <span>EMAIL ADDRESS</span>
              <input
                type="email"
                value={signupForm.email}
                onChange={(e) => {
                  setSignupForm({ ...signupForm, email: e.target.value });
                  if (signupErrors.email) setSignupErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="ada@codeclash.dev"
                autoComplete="email"
                disabled={submitting}
                required
              />
              {signupErrors.email && (
                <span className="login-field-error">
                  <AlertCircle size={12} />
                  {signupErrors.email}
                </span>
              )}
            </label>

            <label className={`login-input-label ${signupErrors.password ? "has-error" : ""}`}>
              <span>PASSWORD (MIN 8 CHARACTERS)</span>
              <input
                type="password"
                value={signupForm.password}
                onChange={(e) => {
                  setSignupForm({ ...signupForm, password: e.target.value });
                  if (signupErrors.password) setSignupErrors((prev) => ({ ...prev, password: "" }));
                }}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={submitting}
                required
              />
              {signupErrors.password && (
                <span className="login-field-error">
                  <AlertCircle size={12} />
                  {signupErrors.password}
                </span>
              )}
            </label>

            <label className={`login-input-label ${signupErrors.confirmPassword ? "has-error" : ""}`}>
              <span>CONFIRM PASSWORD</span>
              <input
                type="password"
                value={signupForm.confirmPassword}
                onChange={(e) => {
                  setSignupForm({ ...signupForm, confirmPassword: e.target.value });
                  if (signupErrors.confirmPassword)
                    setSignupErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={submitting}
                required
              />
              {signupErrors.confirmPassword && (
                <span className="login-field-error">
                  <AlertCircle size={12} />
                  {signupErrors.confirmPassword}
                </span>
              )}
            </label>

            <button type="submit" className="btn-primary-clash full-width" disabled={submitting}>
              <span>{submitting ? "REGISTERING..." : "CREATE COMPETITOR ACCOUNT"}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        <div className="login-security-notice">
          <ShieldCheck size={14} className="text-crimson" />
          <span>Strict competitor authentication enabled. Only verified accounts can enter the clash.</span>
        </div>
      </div>
    </div>
  );
}
