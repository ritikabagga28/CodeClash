import { CheckCircle2, Lock, Swords } from "lucide-react";
import "./LevelCard.css";

export default function LevelCard({ level, name, status }) {
  // status: 'complete' | 'current' | 'locked'
  return (
    <div className={`level-card level-card-${status}`}>
      <div className="level-card-icon">
        {status === "complete" && <CheckCircle2 size={18} />}
        {status === "current" && <Swords size={18} />}
        {status === "locked" && <Lock size={16} />}
      </div>
      <div className="level-card-body">
        <div className="level-card-number">Level {level}</div>
        <div className="level-card-name">{name}</div>
      </div>
      {status === "current" && <span className="level-card-tag">Current</span>}
    </div>
  );
}
