import { Link } from "react-router-dom";
import { ArrowRight, Code2, Swords, Zap, Target, CheckCircle2, TrendingUp, Unlock, Terminal } from "lucide-react";
import Button from "../components/Button";
import StatCard from "../components/StatCard";
import ChallengeCard from "../components/ChallengeCard";
import { useApp } from "../context/AppContext";
import { CHALLENGES, LEVELS } from "../data/challenges";
import "./Home.css";

const HOW_IT_WORKS = [
  { icon: Target, title: "Choose a challenge", text: "Pick a problem that matches your level — from warm-ups to real algorithm puzzles." },
  { icon: Code2, title: "Write your code", text: "Solve it in real Java, right in the browser editor." },
  { icon: Terminal, title: "Run against test cases", text: "Your code runs on a real online Java compiler against real inputs." },
  { icon: Zap, title: "Earn XP & level up", text: "Every clean solve earns XP and points toward your next level." },
  { icon: Unlock, title: "Unlock new challenges", text: "Progress through levels to access harder, more rewarding problems." },
];

export default function Home() {
  const { progress, customChallenges } = useApp();
  const allChallenges = [...CHALLENGES, ...customChallenges];
  const totalXpAvailable = allChallenges.reduce((sum, c) => sum + c.xp, 0);
  const completionPct = Math.round((progress.completedChallengeIds.length / allChallenges.length) * 100) || 0;

  const isCompleted = (c) => progress.completedChallengeIds.includes(c.id);
  const popularProblems = CHALLENGES.slice(0, 5);

  return (
    <div className="page home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-copy">
          <h1 className="hero-title">
            Sharpen Your Skills.
            <br />
            <span className="hero-title-accent">Conquer Every Challenge.</span>
          </h1>
          <p className="hero-subtitle">
            CodeClash is the competitive programming platform for Java developers. Solve real
            problems, run real test cases, and track your progress as you level up.
          </p>
          <div className="hero-actions">
            <Link to="/dashboard">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Start Coding
              </Button>
            </Link>
            <Link to="/challenges">
              <Button variant="ghost" size="lg" icon={Swords}>
                Explore Problems
              </Button>
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-header">
            <div className="hero-panel-dots">
              <span className="hero-panel-dot hero-dot-red" />
              <span className="hero-panel-dot hero-dot-yellow" />
              <span className="hero-panel-dot hero-dot-green" />
            </div>
            <span className="hero-panel-name">Main.java</span>
          </div>
          <pre className="hero-panel-code">{`public class Main {
    public static String
      reverseString(String str) {

      // your move.

    }
}`}</pre>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-grid">
        <StatCard icon={Swords} tone="violet" value={allChallenges.length} label="Challenges" />
        <StatCard icon={TrendingUp} tone="blue" value={LEVELS.length} label="Levels" />
        <StatCard icon={Zap} tone="xp" value={`${totalXpAvailable} XP`} label="Available" />
        <StatCard icon={CheckCircle2} tone="success" value={`${completionPct}%`} label="Your completion" />
      </section>

      {/* Popular Problems */}
      <section className="home-popular">
        <div className="home-popular-header">
          <h2 className="section-title">Popular Problems</h2>
          <Link to="/challenges" className="home-popular-link">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="home-popular-list">
          {popularProblems.map((c, i) => (
            <ChallengeCard
              key={c.id}
              challenge={c}
              isCompleted={isCompleted(c)}
              isLocked={false}
              index={i + 1}
            />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="section-title">How it works</h2>
        <div className="how-steps">
          {HOW_IT_WORKS.map(({ icon: Icon, title, text }, i) => (
            <div className="how-step" key={title}>
              <div className="how-step-header">
                <div className="how-step-icon">
                  <Icon size={18} strokeWidth={2} />
                </div>
                <span className="how-step-number">{i + 1}</span>
              </div>
              <h3 className="how-step-title">{title}</h3>
              <p className="how-step-text">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
