import { Trophy, Flame, Zap, Code2, Crown, Star } from "lucide-react";
import { useApp } from "../context/AppContext";
import "./Achievements.css";

export default function Achievements() {
  const { progress, level } = useApp();
  const completedCount = progress.completedChallengeIds.length;

  const badges = [
    {
      icon: Trophy,
      name: "First Challenge",
      description: "Clear your very first challenge.",
      unlocked: completedCount >= 1,
    },
    {
      icon: Flame,
      name: "3 Day Streak",
      description: "Solve something 3 days in a row.",
      unlocked: progress.streak >= 3,
    },
    {
      icon: Zap,
      name: "500 XP",
      description: "Bank 500 total XP.",
      unlocked: progress.xp >= 500,
    },
    {
      icon: Code2,
      name: "10 Problems Solved",
      description: "Clear 10 challenges.",
      unlocked: completedCount >= 10,
    },
    {
      icon: Crown,
      name: "Level 5",
      description: "Reach Algorithm Hero.",
      unlocked: level.level >= 5,
    },
    {
      icon: Star,
      name: "Perfect Run",
      description: "Pass every test case on your first submit.",
      unlocked: progress.lastResult?.passed === true,
    },
  ];

  return (
    <div className="page achievements-page">
      <div>
        <h1>Achievements</h1>
        <p>Badges unlock automatically as your run progresses.</p>
      </div>

      <div className="achievements-grid">
        {badges.map(({ icon: Icon, name, description, unlocked }) => (
          <div key={name} className={`achievement-card${unlocked ? " achievement-unlocked" : ""}`}>
            <div className="achievement-icon">
              <Icon size={22} strokeWidth={2} />
            </div>
            <div className="achievement-name">{name}</div>
            <p className="achievement-description">{description}</p>
            {!unlocked && <span className="achievement-lock-tag">Locked</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
