import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import ChallengeCard from "../components/ChallengeCard";
import { useApp } from "../context/AppContext";
import { CHALLENGES, LEVELS } from "../data/challenges";
import "./Challenges.css";

const FILTERS = ["All", "Easy", "Medium", "Hard", "Completed", "Locked"];

export default function Challenges() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { progress, level, customChallenges } = useApp();

  const allChallenges = useMemo(() => [...CHALLENGES, ...customChallenges], [customChallenges]);

  const isLocked = (challenge) => challenge.level > level.level;
  const isCompleted = (challenge) => progress.completedChallengeIds.includes(challenge.id);

  const filtered = allChallenges.filter((c) => {
    // Filter
    if (activeFilter === "Completed" && !isCompleted(c)) return false;
    if (activeFilter === "Locked" && !isLocked(c)) return false;
    if (["Easy", "Medium", "Hard"].includes(activeFilter) && c.difficulty !== activeFilter) return false;

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.difficulty.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const byLevel = useMemo(() => {
    const groups = {};
    for (const c of filtered) {
      groups[c.level] = groups[c.level] || [];
      groups[c.level].push(c);
    }
    return groups;
  }, [filtered]);

  let globalIndex = 0;

  return (
    <div className="page challenges-page">
      <div className="challenges-header">
        <div>
          <h1>Problems</h1>
          <p>Browse challenges by difficulty, category, or search for a specific problem.</p>
        </div>
      </div>

      <div className="challenges-controls">
        <div className="challenges-search">
          <Search size={16} className="challenges-search-icon" />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="challenges-search-input"
          />
        </div>

        <div className="filter-bar" role="tablist" aria-label="Challenge filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={activeFilter === f}
              className={`filter-chip${activeFilter === f ? " filter-chip-active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="challenges-empty">
          <p>No problems match your search or filter.</p>
        </div>
      )}

      {Object.entries(byLevel)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([lvl, challenges]) => {
          const section = (
            <section key={lvl} className="challenges-level-group">
              <h2 className="challenges-level-title">
                {lvl === "0" ? "Custom" : `Level ${lvl} — ${LEVELS.find((l) => String(l.level) === lvl)?.name || ""}`}
              </h2>
              <div className="challenges-list">
                {challenges.map((c) => {
                  globalIndex++;
                  return (
                    <ChallengeCard
                      key={c.id}
                      challenge={c}
                      isCompleted={isCompleted(c)}
                      isLocked={isLocked(c)}
                      index={globalIndex}
                    />
                  );
                })}
              </div>
            </section>
          );
          return section;
        })}
    </div>
  );
}
