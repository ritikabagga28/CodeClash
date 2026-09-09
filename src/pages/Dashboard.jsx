import { Link } from "react-router-dom";
import { Zap, Trophy, CheckCircle2, Flame, ArrowRight, Shield } from "lucide-react";
import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import LevelCard from "../components/LevelCard";
import { useApp } from "../context/AppContext";
import { CHALLENGES, LEVELS } from "../data/challenges";
import "./Dashboard.css";

export default function Dashboard() {
  const { progress, level, xpIntoLevel, xpForNextLevel, customChallenges, auth } = useApp();
  const allChallenges = [...CHALLENGES, ...customChallenges];

  const continueChallenge =
    allChallenges.find((c) => !progress.completedChallengeIds.includes(c.id)) || allChallenges[0];

  return (
    <div className="page dashboard-page">
      <div className="dashboard-welcome">
        <div>
          <span className="section-eyebrow">COMPETITOR DASHBOARD</span>
          <h1 className="dashboard-title">Welcome, {auth.isLoggedIn ? auth.username : "Competitor"}</h1>
          <p className="dashboard-subtitle">Here is your current standing in the Code Clash arena.</p>
        </div>
        {continueChallenge && (
          <Link to={`/problem/${continueChallenge.slug}`} className="btn-primary-clash">
            <span>CONTINUE CLASH</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </div>

      <section className="stats-grid">
        <StatCard icon={Trophy} tone="violet" value={`Lv. ${level.level}`} label={level.name} />
        <StatCard icon={Zap} tone="xp" value={progress.xp.toLocaleString()} label="Total XP" />
        <StatCard icon={CheckCircle2} tone="success" value={progress.points.toLocaleString()} label="Points" />
        <StatCard icon={Flame} tone="blue" value={progress.completedChallengeIds.length} label="Solved" />
      </section>

      <section className="dashboard-xp-card">
        <div className="dashboard-xp-header">
          <div>
            <span className="section-eyebrow">CURRENT TIER</span>
            <h2>Level {level.level} — {level.name}</h2>
          </div>
          <span className="dashboard-streak">
            <Flame size={16} className="text-crimson" />
            {progress.streak} Day Active Streak
          </span>
        </div>
        <ProgressBar
          value={xpIntoLevel}
          max={xpForNextLevel}
          tone="xp"
          size="lg"
          label={`${progress.xp} XP total`}
        />
      </section>

      <section className="dashboard-levels-section">
        <h2 className="section-title-editorial">Tournament Divisions & Ranks</h2>
        <div className="level-grid">
          {LEVELS.map((lvl) => {
            let status = "locked";
            if (lvl.level < level.level) status = "complete";
            else if (lvl.level === level.level) status = "current";
            return <LevelCard key={lvl.level} level={lvl.level} name={lvl.name} status={status} />;
          })}
        </div>
      </section>
    </div>
  );
}
