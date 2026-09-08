import { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { PartyPopper, Zap, Trophy, CheckCircle2, ArrowRight, LayoutDashboard } from "lucide-react";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import { useApp } from "../context/AppContext";
import { CHALLENGES } from "../data/challenges";
import "./LevelComplete.css";

export default function LevelComplete() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { progress, level, xpIntoLevel, xpForNextLevel, customChallenges } = useApp();
  const [celebrate, setCelebrate] = useState(false);

  const challenge = [...CHALLENGES, ...customChallenges].find((c) => c.slug === slug);
  const passedCount = location.state?.passedCount ?? progress.lastResult?.passedCount ?? 0;
  const totalCount = location.state?.totalCount ?? progress.lastResult?.totalCount ?? 0;
  const allPassed = passedCount === totalCount && totalCount > 0;

  const allChallenges = [...CHALLENGES, ...customChallenges];
  const currentIndex = allChallenges.findIndex((c) => c.slug === slug);
  const nextChallenge = allChallenges[currentIndex + 1];

  useEffect(() => {
    const t = setTimeout(() => setCelebrate(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!challenge) {
    navigate("/challenges");
    return null;
  }

  return (
    <div className="page result-page">
      <div className={`result-card${celebrate ? " result-card-in" : ""}`}>
        {allPassed ? (
          <>
            <div className="result-emoji" aria-hidden="true">
              <PartyPopper size={40} />
            </div>
            <span className="result-kicker">Level cleared</span>
          </>
        ) : (
          <span className="result-kicker result-kicker-partial">Not quite there</span>
        )}

        <h1 className="result-title">{challenge.title}</h1>

        <div className="result-rewards">
          <div className="result-reward">
            <Zap size={18} />
            <span>+{progress.lastResult?.xpEarned ?? 0} XP</span>
          </div>
          <div className="result-reward">
            <Trophy size={18} />
            <span>+{progress.lastResult?.pointsEarned ?? 0} Points</span>
          </div>
        </div>

        <div className="result-testline">
          <CheckCircle2 size={16} color={allPassed ? "var(--success)" : "var(--fail)"} />
          <span>
            {passedCount}/{totalCount} test cases passed
          </span>
        </div>

        <div className="result-level-block">
          <span className="result-level-label">Current level: {level.level} — {level.name}</span>
          <ProgressBar value={xpIntoLevel} max={xpForNextLevel} tone="success" size="lg" />
        </div>

        <div className="result-actions">
          {nextChallenge && (
            <Link to={`/problem/${nextChallenge.slug}`}>
              <Button variant="primary" icon={ArrowRight}>
                Next Challenge
              </Button>
            </Link>
          )}
          <Link to="/dashboard">
            <Button variant="ghost" icon={LayoutDashboard}>
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
