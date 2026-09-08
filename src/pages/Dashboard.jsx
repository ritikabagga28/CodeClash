import { Link } from "react-router-dom";
import { Zap, Trophy, CheckCircle2, Flame, ArrowRight } from "lucide-react";
import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import LevelCard from "../components/LevelCard";
import Button from "../components/Button";
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
          <h1>Welcome back, {auth.isLoggedIn ? auth.username : "Coder"}!</h1>
          <p>Here's where your CodeClash run stands right now.</p>
        </div>
        {continueChallenge && (
          <Link to={`/problem/${continueChallenge.slug}`}>
            <Button variant="primary" icon={ArrowRight}>
              Continue Challenge
            </Button>
          </Link>
        )}
      </div>

      <section className="stats-grid">
        <StatCard icon={Trophy} tone="violet" value={`Lv. ${level.level}`} label={level.name} />
        <StatCard icon={Zap} tone="xp" value={progress.xp.toLocaleString()} label="Total XP" />
        <StatCard icon={CheckCircle2} tone="success" value={progress.points.toLocaleString()} label="Points" />
        <StatCard icon={Flame} tone="blue" value={progress.completedChallengeIds.length} label="Challenges done" />
      </section>

      <section className="dashboard-xp-card">
        <div className="dashboard-xp-header">
          <div>
            <h2>Level {level.level}</h2>
            <p>{level.name}</p>
          </div>
          <span className="dashboard-streak">
            <Flame size={16} />
            {progress.streak} day streak
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

      <section>
        <h2 className="section-title">Level progression</h2>
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
