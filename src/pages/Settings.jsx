import { useState } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, RotateCcw, ShieldAlert, Zap, Trophy, CheckCircle2 } from "lucide-react";
import Button from "../components/Button";
import { useApp } from "../context/AppContext";
import "./Settings.css";

export default function SettingsPage() {
  const { auth, logout, resetProgress, progress } = useApp();
  const [confirmingReset, setConfirmingReset] = useState(false);

  function handleResetClick() {
    if (!confirmingReset) {
      setConfirmingReset(true);
      return;
    }
    resetProgress();
    setConfirmingReset(false);
  }

  return (
    <div className="page settings-page">
      <div>
        <h1>Settings</h1>
        <p>Prototype-level controls for now — enough to demonstrate the flow, not a full account system yet.</p>
      </div>

      <section className="settings-card">
        <h2>Account</h2>
        {auth.isLoggedIn ? (
          <div className="settings-row">
            <div className="settings-row-info">
              <User size={17} />
              <span>
                Signed in as <strong>{auth.username}</strong>
              </span>
            </div>
            <Button variant="ghost" icon={LogOut} onClick={logout}>
              Log out
            </Button>
          </div>
        ) : (
          <div className="settings-row">
            <div className="settings-row-info">
              <User size={17} />
              <span>You're browsing as a guest.</span>
            </div>
            <Link to="/login">
              <Button variant="primary">Log In</Button>
            </Link>
          </div>
        )}
      </section>

      <section className="settings-card">
        <h2>Your run</h2>
        <div className="settings-stats">
          <span>
            <Zap size={14} /> {progress.xp} XP
          </span>
          <span>
            <Trophy size={14} /> {progress.points} points
          </span>
          <span>
            <CheckCircle2 size={14} /> {progress.completedChallengeIds.length} challenges cleared
          </span>
        </div>

        <div className="settings-row settings-row-danger">
          <div className="settings-row-info">
            <span>Reset all progress</span>
            <p className="settings-row-subtext">
              Clears your XP, points, level, and every challenge you've cleared. Custom problems you
              created are kept.
            </p>
          </div>
          <Button
            variant={confirmingReset ? "danger" : "ghost"}
            icon={confirmingReset ? ShieldAlert : RotateCcw}
            onClick={handleResetClick}
          >
            {confirmingReset ? "Click again to confirm" : "Reset progress"}
          </Button>
        </div>
      </section>
    </div>
  );
}
