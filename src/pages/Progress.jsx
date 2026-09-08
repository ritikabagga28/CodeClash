import ProgressBar from "../components/ProgressBar";
import { useApp } from "../context/AppContext";
import { CHALLENGES, LEVELS } from "../data/challenges";
import "./Progress.css";

export default function ProgressPage() {
  const { progress, level, xpIntoLevel, xpForNextLevel, customChallenges } = useApp();
  const allChallenges = [...CHALLENGES, ...customChallenges];

  const categories = Array.from(new Set(allChallenges.map((c) => c.category)));
  const byCategory = categories.map((category) => {
    const inCategory = allChallenges.filter((c) => c.category === category);
    const done = inCategory.filter((c) => progress.completedChallengeIds.includes(c.id)).length;
    return { category, done, total: inCategory.length };
  });

  return (
    <div className="page progress-page">
      <div>
        <h1>Your progress</h1>
        <p>A closer look at how your run is shaping up.</p>
      </div>

      <section className="progress-card">
        <h2>Level {level.level} — {level.name}</h2>
        <ProgressBar value={xpIntoLevel} max={xpForNextLevel} tone="xp" size="lg" label="XP to next level" />
      </section>

      <section className="progress-card">
        <h2>By category</h2>
        <div className="progress-categories">
          {byCategory.map(({ category, done, total }) => (
            <div key={category} className="progress-category-row">
              <ProgressBar value={done} max={total} tone="success" label={category} />
            </div>
          ))}
        </div>
      </section>

      <section className="progress-card">
        <h2>Levels cleared</h2>
        <div className="progress-level-list">
          {LEVELS.map((lvl) => {
            const inLevel = allChallenges.filter((c) => c.level === lvl.level);
            const done = inLevel.filter((c) => progress.completedChallengeIds.includes(c.id)).length;
            return (
              <div key={lvl.level} className="progress-level-row">
                <span>Level {lvl.level} — {lvl.name}</span>
                <span className="progress-level-count">
                  {done}/{inLevel.length}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
