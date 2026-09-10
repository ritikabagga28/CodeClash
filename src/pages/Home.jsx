import { Link } from "react-router-dom";
import {
  ArrowRight,
  Trophy,
  Swords,
  Zap,
  Brain,
  Code2,
  Crown,
  Target,
  Sparkles
} from "lucide-react";
import SwordClashVisual from "../components/SwordClashVisual";
import Logo from "../components/Logo";
import { useApp } from "../context/AppContext";
import { CHALLENGES } from "../data/challenges";
import "./Home.css";

const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "ENTER",
    subtitle: "Select your division",
    desc: "Step onto the battlefield. Choose from warm-up challenges to grandmaster algorithmic battlegrounds.",
    icon: Target,
  },
  {
    step: "02",
    title: "THINK",
    subtitle: "Analyze the pressure point",
    desc: "Deconstruct time complexities, boundary conditions, and optimal data structures before writing a single line.",
    icon: Brain,
  },
  {
    step: "03",
    title: "CODE",
    subtitle: "Execute under real constraints",
    desc: "Craft clean, precise Java implementations right in the browser with live compiler feedback.",
    icon: Code2,
  },
  {
    step: "04",
    title: "CLASH",
    subtitle: "Test against hidden inputs",
    desc: "Pit your solution against edge cases, memory limits, and automated execution benchmarks.",
    icon: Swords,
  },
  {
    step: "05",
    title: "CLIMB",
    subtitle: "Claim your position",
    desc: "Earn XP, gain points, climb the global leaderboard, and forge your legacy as a champion.",
    icon: Crown,
  },
];

const MOCK_LEADERBOARD = [
  { rank: 1, name: "Ada Lovelace", score: "4,850 pts", solved: 24, time: "18m 42s", tier: "crimson", title: "Grandmaster", medal: "🥇" },
  { rank: 2, name: "Alan Turing", score: "4,620 pts", solved: 23, time: "21m 05s", tier: "copper", title: "Master", medal: "🥈" },
  { rank: 3, name: "Grace Hopper", score: "4,310 pts", solved: 21, time: "24m 12s", tier: "silver", title: "Diamond", medal: "🥉" },
  { rank: 4, name: "Linus Torvalds", score: "3,980 pts", solved: 19, time: "29m 40s", tier: "muted", title: "Platinum", medal: "4" },
  { rank: 5, name: "Margaret Hamilton", score: "3,740 pts", solved: 18, time: "31m 15s", tier: "muted", title: "Gold", medal: "5" },
];

export default function Home() {
  const { customChallenges } = useApp();
  const allChallenges = [...CHALLENGES, ...customChallenges];
  const featuredChallenges = allChallenges.slice(0, 5);

  return (
    <div className="home-page-wrapper">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        {/* Atmospheric Ambient Glows & Floating Embers */}
        <div className="hero-ambient-glow hero-glow-primary" />
        <div className="hero-ambient-glow hero-glow-secondary" />
        <div className="hero-ambient-particles">
          <span className="ambient-ember e1" />
          <span className="ambient-ember e2" />
          <span className="ambient-ember e3" />
          <span className="ambient-ember e4" />
          <span className="ambient-ember e5" />
          <span className="ambient-ember e6" />
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-badge">
                <Sparkles size={12} className="eyebrow-spark-icon" />
                <span>CODE CLASH · ARENA 2026</span>
              </span>
              <span className="hero-eyebrow-line" />
              <span className="hero-live-badge">
                <span className="pulse-dot" />
                <span>ARENA OPEN</span>
              </span>
            </div>

            <h1 className="hero-headline">
              Where logic
              <br />
              <span className="hero-headline-accent spirit-text-glow">meets pressure.</span>
            </h1>

            <p className="hero-description">
              An elite competitive programming arena for developers who perform under constraints.
              Solve complex algorithmic challenges, benchmark your solutions against hidden test cases, and forge your legacy.
            </p>

            {/* Quick Battle Feature Chips */}
            <div className="hero-feature-chips">
              <div className="hero-chip">
                <Zap size={13} className="chip-icon zap" />
                <span>Sub-millisecond Java Benchmarks</span>
              </div>
              <div className="hero-chip">
                <Swords size={13} className="chip-icon swords" />
                <span>Algorithmic Battlegrounds</span>
              </div>
              <div className="hero-chip">
                <Trophy size={13} className="chip-icon trophy" />
                <span>Global Champion Standings</span>
              </div>
            </div>

            <div className="hero-actions">
              <Link to="/login" className="btn-primary-clash heroic">
                <span className="btn-shine-sweep" />
                <Swords size={16} className="btn-sword-icon" />
                <span>ENTER THE CLASH</span>
                <ArrowRight size={16} className="btn-arrow-icon" />
              </Link>
              <Link to="/challenges" className="btn-secondary-clash heroic">
                <span>EXPLORE CHALLENGES</span>
              </Link>
            </div>

            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <span className="hero-stat-value">{allChallenges.length}</span>
                <span className="hero-stat-label">Active Challenges</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-item">
                <span className="hero-stat-value">5</span>
                <span className="hero-stat-label">Competitive Tiers</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat-item">
                <span className="hero-stat-value">750 XP</span>
                <span className="hero-stat-label">Available Points</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-wrapper">
            <SwordClashVisual />
          </div>
        </div>
      </section>

      {/* 2. THE CLASH PHILOSOPHY */}
      <section className="philosophy-section">
        <div className="section-container">
          <div className="philosophy-layout">
            <div className="philosophy-left">
              <span className="section-eyebrow">01 · PHILOSOPHY</span>
              <h2 className="philosophy-headline">
                Every problem
                <br />
                <span className="philosophy-accent">has a pressure point.</span>
              </h2>
            </div>
            <div className="philosophy-right">
              <p className="philosophy-lead">
                In Code Clash, raw syntax speed is secondary. True mastery lies in recognizing the exact mathematical lever required to solve a constraint before time expires.
              </p>
              <div className="philosophy-pillars">
                <div className="pillar-item">
                  <div className="pillar-top-row">
                    <span className="pillar-num">01</span>
                    <div className="pillar-icon-badge">
                      <Brain size={16} />
                    </div>
                  </div>
                  <h4>Participants Analyze</h4>
                  <p>Deconstruct problem constraints to identify hidden edge cases, invariant bounds, and optimal algorithmic paths.</p>
                </div>

                <div className="pillar-item">
                  <div className="pillar-top-row">
                    <span className="pillar-num">02</span>
                    <div className="pillar-icon-badge">
                      <Target size={16} />
                    </div>
                  </div>
                  <h4>They Strategize</h4>
                  <p>Choose optimal space and time complexities under strict microsecond execution benchmarks and memory ceilings.</p>
                </div>

                <div className="pillar-item">
                  <div className="pillar-top-row">
                    <span className="pillar-num">03</span>
                    <div className="pillar-icon-badge">
                      <Swords size={16} />
                    </div>
                  </div>
                  <h4>They Compete</h4>
                  <p>Clash code against automated test runners and rival programmers across the world in relentless pursuit of mastery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="how-section" id="how-it-works">
        <div className="section-container">
          <div className="how-header">
            <span className="section-eyebrow">02 · EXECUTION JOURNEY</span>
            <h2 className="section-title-editorial">How The Clash Works</h2>
          </div>

          <div className="how-timeline">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div className="how-step-node" key={step.step}>
                  <div className="how-step-top">
                    <span className="how-step-num">{step.step}</span>
                    <div className="how-step-icon-wrap">
                      <StepIcon size={16} />
                    </div>
                    {index < HOW_IT_WORKS_STEPS.length - 1 && <div className="how-step-connector" />}
                  </div>
                  <h3 className="how-step-title">{step.title}</h3>
                  <span className="how-step-sub">{step.subtitle}</span>
                  <p className="how-step-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CHALLENGES SECTION */}
      <section className="challenges-home-section">
        <div className="section-container">
          <div className="challenges-home-header">
            <div>
              <span className="section-eyebrow">03 · BATTLEGROUND</span>
              <h2 className="section-title-editorial">Featured Challenges</h2>
            </div>
            <Link to="/challenges" className="view-all-link">
              <span>VIEW ALL CHALLENGES</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="challenges-editorial-list">
            <div className="challenges-table-header">
              <span>PROBLEM</span>
              <span>CATEGORY</span>
              <span>DIFFICULTY</span>
              <span>POINTS</span>
              <span className="text-right">ACTION</span>
            </div>

            {featuredChallenges.map((c, idx) => {
              const diffLower = c.difficulty.toLowerCase();
              return (
                <div className="challenge-row-item" key={c.id}>
                  <div className="challenge-col-main">
                    <span className="challenge-index">{String(idx + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="challenge-title">{c.title}</h3>
                      <p className="challenge-snippet">{c.description?.slice(0, 75)}...</p>
                    </div>
                  </div>

                  <div className="challenge-col-cat">
                    <span className="meta-tag">{c.category}</span>
                  </div>

                  <div className="challenge-col-diff">
                    <span className={`diff-pill diff-${diffLower}`}>{c.difficulty}</span>
                  </div>

                  <div className="challenge-col-xp">
                    <span className="xp-value">+{c.xp} XP</span>
                    <span className="pts-value">{c.points} pts</span>
                  </div>

                  <div className="challenge-col-action">
                    <Link to={`/problem/${c.slug}`} className="btn-table-action">
                      <span>ENGAGE</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. LIVE LEADERBOARD */}
      <section className="leaderboard-home-section">
        <div className="section-container">
          <div className="leaderboard-header">
            <div>
              <span className="section-eyebrow">04 · STANDINGS</span>
              <h2 className="section-title-editorial">Live Tournament Leaderboard</h2>
            </div>
            <div className="live-indicator">
              <span className="pulse-dot" />
              <span>LIVE STANDINGS</span>
            </div>
          </div>

          <div className="leaderboard-table">
            <div className="lb-head-row">
              <span className="lb-col-rank">RANK</span>
              <span className="lb-col-player">COMPETITOR</span>
              <span className="lb-col-score">SCORE</span>
              <span className="lb-col-solved">SOLVED</span>
              <span className="lb-col-time text-right">TIME</span>
            </div>

            {MOCK_LEADERBOARD.map((item) => (
              <div className={`lb-data-row tier-${item.tier}`} key={item.rank}>
                <div className="lb-col-rank">
                  <span className={`rank-badge rank-${item.rank}`}>
                    {item.rank <= 3 ? item.medal : `#${item.rank}`}
                  </span>
                </div>
                <div className="lb-col-player">
                  <div className="player-info-wrap">
                    <span className="player-name">{item.name}</span>
                    <span className={`player-title-badge tier-${item.tier}`}>{item.title}</span>
                  </div>
                </div>
                <div className="lb-col-score">
                  <span className="score-text">{item.score}</span>
                </div>
                <div className="lb-col-solved">
                  <span className="solved-count">{item.solved} challenges</span>
                </div>
                <div className="lb-col-time text-right">
                  <span className="time-text">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section className="final-cta-section">
        <div className="section-container">
          <div className="final-cta-box">
            <div className="final-cta-bg-motif">
              <Logo size={280} className="motif-logo" />
            </div>
            <div className="final-cta-content">
              <span className="section-eyebrow light">ARENA AWAITS</span>
              <h2 className="final-cta-headline">
                Ready to
                <br />
                <span className="final-cta-headline-accent">enter the clash?</span>
              </h2>
              <p className="final-cta-subtitle">
                Test your code against the world's most demanding algorithmic benchmarks.
              </p>
              <div className="final-cta-buttons">
                <Link to="/login" className="btn-primary-clash lg heroic">
                  <Swords size={18} />
                  <span>ENTER THE CLASH NOW</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
