import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Flame, Swords, Shield, Zap } from "lucide-react";
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
  },
  {
    step: "02",
    title: "THINK",
    subtitle: "Analyze the pressure point",
    desc: "Deconstruct time complexities, boundary conditions, and optimal data structures before writing a single line.",
  },
  {
    step: "03",
    title: "CODE",
    subtitle: "Execute under real constraints",
    desc: "Craft clean, precise Java implementations right in the browser with live compiler feedback.",
  },
  {
    step: "04",
    title: "CLASH",
    subtitle: "Test against hidden inputs",
    desc: "Pit your solution against edge cases, memory limits, and automated execution benchmarks.",
  },
  {
    step: "05",
    title: "CLIMB",
    subtitle: "Claim your position",
    desc: "Earn XP, gain points, climb the global leaderboard, and forge your legacy as a champion.",
  },
];

const MOCK_LEADERBOARD = [
  { rank: 1, name: "Ada Lovelace", score: "4,850 pts", solved: 24, time: "18m 42s", tier: "crimson" },
  { rank: 2, name: "Alan Turing", score: "4,620 pts", solved: 23, time: "21m 05s", tier: "copper" },
  { rank: 3, name: "Grace Hopper", score: "4,310 pts", solved: 21, time: "24m 12s", tier: "silver" },
  { rank: 4, name: "Linus Torvalds", score: "3,980 pts", solved: 19, time: "29m 40s", tier: "muted" },
  { rank: 5, name: "Margaret Hamilton", score: "3,740 pts", solved: 18, time: "31m 15s", tier: "muted" },
];

export default function Home() {
  const { progress, customChallenges } = useApp();
  const allChallenges = [...CHALLENGES, ...customChallenges];
  const featuredChallenges = allChallenges.slice(0, 5);

  return (
    <div className="home-page-wrapper">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-badge">CODE CLASH · 2026</span>
              <span className="hero-eyebrow-line" />
            </div>

            <h1 className="hero-headline">
              Where logic
              <br />
              <span className="hero-headline-accent">meets pressure.</span>
            </h1>

            <p className="hero-description">
              An elite competitive programming arena for developers who perform under constraints.
              Solve complex algorithmic challenges, benchmark your solutions against hidden test cases, and climb the international leaderboard.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="btn-primary-clash">
                <span>ENTER THE CLASH</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/challenges" className="btn-secondary-clash">
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
                  <span className="pillar-num">01</span>
                  <h4>Participants Analyze</h4>
                  <p>Deconstruct problem constraints to identify hidden edge cases and optimization paths.</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-num">02</span>
                  <h4>They Strategize</h4>
                  <p>Choose optimal space and time complexities under strict execution benchmarks.</p>
                </div>
                <div className="pillar-item">
                  <span className="pillar-num">03</span>
                  <h4>They Compete</h4>
                  <p>Clash code against automated test runners and rival programmers across the world.</p>
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
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div className="how-step-node" key={step.step}>
                <div className="how-step-top">
                  <span className="how-step-num">{step.step}</span>
                  {index < HOW_IT_WORKS_STEPS.length - 1 && <div className="how-step-connector" />}
                </div>
                <h3 className="how-step-title">{step.title}</h3>
                <span className="how-step-sub">{step.subtitle}</span>
                <p className="how-step-desc">{step.desc}</p>
              </div>
            ))}
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
                  <span className={`rank-badge rank-${item.rank}`}>#{item.rank}</span>
                </div>
                <div className="lb-col-player">
                  <span className="player-name">{item.name}</span>
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
              <Logo size={240} className="motif-logo" />
            </div>
            <div className="final-cta-content">
              <span className="section-eyebrow light">ARENA AWAITS</span>
              <h2 className="final-cta-headline">
                Ready to
                <br />
                <span className="final-cta-headline-accent">enter the clash?</span>
              </h2>
              <p className="final-cta-subtitle">
                Test your code against the world's most demanding benchmarks.
              </p>
              <div className="final-cta-buttons">
                <Link to="/login" className="btn-primary-clash lg">
                  <span>ENTER THE CLASH NOW</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
