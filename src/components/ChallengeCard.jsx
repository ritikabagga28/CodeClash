import { Link } from "react-router-dom";
import { CheckCircle2, Lock, Zap, Trophy } from "lucide-react";
import Badge from "./Badge";
import "./ChallengeCard.css";

export default function ChallengeCard({ challenge, isCompleted, isLocked, index }) {
  const diffTone = challenge.difficulty.toLowerCase();

  const row = (
    <div className={`challenge-row${isLocked ? " challenge-row-locked" : ""}${isCompleted ? " challenge-row-done" : ""}`}>
      <span className="challenge-row-num">{index != null ? index : "#"}</span>

      <div className="challenge-row-info">
        <span className="challenge-row-title">{challenge.title}</span>
        <span className="challenge-row-category">{challenge.category}</span>
      </div>

      <Badge tone={diffTone}>{challenge.difficulty}</Badge>

      <div className="challenge-row-rewards">
        <span className="challenge-row-xp">
          <Zap size={12} /> {challenge.xp}
        </span>
        <span className="challenge-row-pts">
          <Trophy size={12} /> {challenge.points}
        </span>
      </div>

      <span className="challenge-row-status">
        {isCompleted && <CheckCircle2 size={16} className="challenge-status-done" />}
        {isLocked && <Lock size={15} className="challenge-status-locked" />}
        {!isCompleted && !isLocked && <span className="challenge-status-unsolved">—</span>}
      </span>
    </div>
  );

  if (isLocked) {
    return <div className="challenge-row-link">{row}</div>;
  }

  return (
    <Link to={`/problem/${challenge.slug}`} className="challenge-row-link">
      {row}
    </Link>
  );
}
