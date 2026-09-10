import { useState, useCallback } from "react";
import { Zap, Flame } from "lucide-react";
import "./SwordClashVisual.css";

export default function SwordClashVisual({ className = "" }) {
  const [isClashing, setIsClashing] = useState(false);
  const [isOverdrive, setIsOverdrive] = useState(false);
  const [clashCount, setClashCount] = useState(0);

  const triggerClash = useCallback(() => {
    setIsClashing(true);
    setClashCount((prev) => prev + 1);
    setTimeout(() => {
      setIsClashing(false);
    }, 500);
  }, []);

  const toggleOverdrive = (e) => {
    e.stopPropagation();
    setIsOverdrive((prev) => !prev);
    triggerClash();
  };

  return (
    <div className={`sword-clash-container ${className}`}>
      {/* Dynamic Atmospheric Glow Layer */}
      <div className={`sword-backdrop-glow ${isOverdrive ? "overdrive" : ""}`} />

      {/* Main Interactive Visual Canvas */}
      <div
        className={`sword-clash-interactive-area ${isClashing ? "clashing" : ""}`}
        onClick={triggerClash}
        title="Click to unleash the clash!"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && triggerClash()}
      >
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sword-svg"
        >
          <defs>
            {/* Glow Filters */}
            <filter id="crimsonGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation={isOverdrive ? "7" : "4"} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="celestialGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation={isOverdrive ? "6" : "3.5"} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="coreBlastFilter" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="9" result="blur1" />
              <feGaussianBlur stdDeviation="3" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Blade 1 (Crimson Infernal Flame) Gradients */}
            <linearGradient id="bladeFacetLeft1" x1="60" y1="60" x2="300" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="15%" stopColor="#E2E8F0" />
              <stop offset="55%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            <linearGradient id="bladeFacetRight1" x1="60" y1="60" x2="300" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="25%" stopColor="#64748B" />
              <stop offset="70%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            <linearGradient id="runeGlowGrad1" x1="75" y1="75" x2="285" y2="285" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF1F2" />
              <stop offset="30%" stopColor={isOverdrive ? "#FF1744" : "#EF4444"} />
              <stop offset="75%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>

            {/* Blade 2 (Celestial Azure Spirit) Gradients */}
            <linearGradient id="bladeFacetLeft2" x1="340" y1="60" x2="100" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="20%" stopColor="#E0F2FE" />
              <stop offset="60%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            <linearGradient id="bladeFacetRight2" x1="340" y1="60" x2="100" y2="300" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="35%" stopColor="#38BDF8" />
              <stop offset="75%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#082F49" />
            </linearGradient>

            <linearGradient id="runeGlowGrad2" x1="325" y1="75" x2="115" y2="285" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F0FDFA" />
              <stop offset="30%" stopColor={isOverdrive ? "#38BDF8" : "#06B6D4"} />
              <stop offset="75%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            {/* Crossguard & Pommel Gradients */}
            <linearGradient id="goldGuardGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="silverGuardGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Clash Flare Radial Gradients */}
            <radialGradient id="clashCoreBurst" cx="200" cy="200" r="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="20%" stopColor={isOverdrive ? "#FBBF24" : "#F87171"} stopOpacity="0.9" />
              <stop offset="50%" stopColor={isOverdrive ? "#EF4444" : "#DC2626"} stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Tech Radar Orbit Gradient */}
            <linearGradient id="techGridGrad" x1="50" y1="50" x2="350" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* ================================================================
              LAYER 1: Rotating Runic Seals & Technical Arena Coordinates
              ================================================================ */}
          <g className="rune-ring-cw">
            <circle
              cx="200"
              cy="200"
              r="155"
              stroke="url(#techGridGrad)"
              strokeWidth="1.2"
              strokeDasharray="4 10"
              opacity="0.5"
            />
            <circle
              cx="200"
              cy="200"
              r="125"
              stroke="var(--silver-dark)"
              strokeWidth="1"
              strokeDasharray="1 7"
              opacity="0.35"
            />
            {/* Arena Compass Nodes */}
            <circle cx="200" cy="45" r="3" fill="#EF4444" opacity="0.8" />
            <circle cx="355" cy="200" r="3" fill="#06B6D4" opacity="0.8" />
            <circle cx="200" cy="355" r="3" fill="#EF4444" opacity="0.8" />
            <circle cx="45" cy="200" r="3" fill="#06B6D4" opacity="0.8" />
            {/* Degree Coordinate Labels */}
            <text x="200" y="38" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">000°</text>
            <text x="370" y="203" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">090°</text>
            <text x="200" y="372" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">180°</text>
            <text x="30" y="203" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">270°</text>
          </g>

          <g className="rune-ring-ccw">
            {/* Inscribed Sacred Octagram Diamond */}
            <polygon
              points="200,85 281,119 315,200 281,281 200,315 119,281 85,200 119,119"
              stroke="var(--border-subtle)"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            <polygon
              points="200,105 267,133 295,200 267,267 200,295 133,267 105,200 133,133"
              stroke="var(--copper)"
              strokeWidth="0.75"
              strokeDasharray="5 5"
              fill="none"
              opacity="0.4"
            />
          </g>

          {/* ================================================================
              LAYER 2: Dynamic Shockwaves radiating from Clash Epicenter
              ================================================================ */}
          <circle cx="200" cy="200" r="20" stroke={isOverdrive ? "#FBBF24" : "#FF4D4D"} strokeWidth="2" fill="none" className="shockwave-wave-1" />
          <circle cx="200" cy="200" r="35" stroke={isOverdrive ? "#FF2E43" : "#38BDF8"} strokeWidth="1.5" fill="none" className="shockwave-wave-2" />

          {/* ================================================================
              LAYER 3: BLADE 1 — Crimson Infernal Flame Longsword
              (Top-Left to Bottom-Right: 45° angle)
              ================================================================ */}
          <g className="blade-group-1">
            {/* Outer Flame Spirit Aura (Glowing) */}
            <path
              d="M 52 52 L 60 44 L 290 274 L 282 282 Z"
              fill={isOverdrive ? "#FF1744" : "#EF4444"}
              opacity={isOverdrive ? "0.6" : "0.35"}
              filter="url(#crimsonGlowFilter)"
            />

            {/* Left Blade Facet (Upper/Light catching side) */}
            <polygon
              points="58,58 288,278 285,285 58,58"
              fill="url(#bladeFacetLeft1)"
            />
            {/* Right Blade Facet (Lower/Shadowed bevel) */}
            <polygon
              points="58,58 285,285 278,288 58,58"
              fill="url(#bladeFacetRight1)"
            />

            {/* Tapered Blade Ridge Spine (Center Line) */}
            <line
              x1="58"
              y1="58"
              x2="285"
              y2="285"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Glowing Runic Fuller Channel */}
            <line
              x1="90"
              y1="90"
              x2="265"
              y2="265"
              stroke="url(#runeGlowGrad1)"
              strokeWidth="2.8"
              strokeLinecap="round"
              filter="url(#crimsonGlowFilter)"
            />

            {/* Engraved Code Runes along Crimson Blade */}
            <g filter="url(#crimsonGlowFilter)">
              <circle cx="120" cy="120" r="2" fill="#FFF1F2" />
              <polygon points="150,147 153,150 150,153 147,150" fill="#FFF1F2" />
              <line x1="176" y1="172" x2="180" y2="176" stroke="#FFF1F2" strokeWidth="1.5" />
              <circle cx="230" cy="230" r="2" fill="#FFF1F2" />
            </g>

            {/* Ornate Crossguard 1 (Golden & Crimson Inlaid Quillons) */}
            <g>
              {/* Main crossguard bar */}
              <polygon
                points="266,304 304,266 312,274 274,312"
                fill="url(#goldGuardGrad)"
                stroke="#78350F"
                strokeWidth="1"
              />
              {/* Wing Tips */}
              <polygon points="266,304 258,300 262,314" fill="#F59E0B" />
              <polygon points="304,266 300,258 314,262" fill="#F59E0B" />
              {/* Guard Gemstone */}
              <circle cx="288" cy="288" r="4.5" fill="#DC2626" stroke="#FEF08A" strokeWidth="1" filter="url(#crimsonGlowFilter)" />
            </g>

            {/* Leather Wrapped Grip 1 */}
            <line x1="288" y1="288" x2="330" y2="330" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
            {/* Grip Cord Bindings */}
            <line x1="295" y1="293" x2="293" y2="295" stroke="#D97706" strokeWidth="2" />
            <line x1="303" y1="301" x2="301" y2="303" stroke="#D97706" strokeWidth="2" />
            <line x1="311" y1="309" x2="309" y2="311" stroke="#D97706" strokeWidth="2" />
            <line x1="319" y1="317" x2="317" y2="319" stroke="#D97706" strokeWidth="2" />

            {/* Pommel 1 (Heavy Octagonal Counterweight with Power Core) */}
            <polygon
              points="330,324 336,330 330,336 324,330"
              fill="url(#goldGuardGrad)"
              stroke="#78350F"
              strokeWidth="1"
            />
            <circle cx="334" cy="334" r="6" fill="url(#goldGuardGrad)" stroke="#451A03" strokeWidth="1" />
            <circle cx="334" cy="334" r="3" fill="#EF4444" filter="url(#crimsonGlowFilter)" />
          </g>

          {/* ================================================================
              LAYER 4: BLADE 2 — Celestial Azure Spirit Katana/Broadsword
              (Top-Right to Bottom-Left: 135° angle)
              ================================================================ */}
          <g className="blade-group-2">
            {/* Outer Cyan Spirit Aura (Glowing) */}
            <path
              d="M 348 52 L 340 44 L 110 274 L 118 282 Z"
              fill={isOverdrive ? "#38BDF8" : "#06B6D4"}
              opacity={isOverdrive ? "0.6" : "0.35"}
              filter="url(#celestialGlowFilter)"
            />

            {/* Right Blade Facet (Upper/Specular catching side) */}
            <polygon
              points="342,58 112,278 115,285 342,58"
              fill="url(#bladeFacetLeft2)"
            />
            {/* Left Blade Facet (Lower/Shadowed bevel) */}
            <polygon
              points="342,58 115,285 122,288 342,58"
              fill="url(#bladeFacetRight2)"
            />

            {/* Tapered Blade Ridge Spine */}
            <line
              x1="342"
              y1="58"
              x2="115"
              y2="285"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Glowing Runic Fuller Channel */}
            <line
              x1="310"
              y1="90"
              x2="135"
              y2="265"
              stroke="url(#runeGlowGrad2)"
              strokeWidth="2.8"
              strokeLinecap="round"
              filter="url(#celestialGlowFilter)"
            />

            {/* Engraved Code Runes along Celestial Blade */}
            <g filter="url(#celestialGlowFilter)">
              <circle cx="280" cy="120" r="2" fill="#F0FDFA" />
              <polygon points="250,147 247,150 250,153 253,150" fill="#F0FDFA" />
              <line x1="224" y1="172" x2="220" y2="176" stroke="#F0FDFA" strokeWidth="1.5" />
              <circle cx="170" cy="230" r="2" fill="#F0FDFA" />
            </g>

            {/* Ornate Crossguard 2 (Silvered Steel & Sapphire Inlay) */}
            <g>
              <polygon
                points="134,304 96,266 88,274 126,312"
                fill="url(#silverGuardGrad)"
                stroke="#334155"
                strokeWidth="1"
              />
              {/* Wing Tips */}
              <polygon points="134,304 142,300 138,314" fill="#94A3B8" />
              <polygon points="96,266 100,258 86,262" fill="#94A3B8" />
              {/* Guard Gemstone */}
              <circle cx="112" cy="288" r="4.5" fill="#0284C7" stroke="#E0F2FE" strokeWidth="1" filter="url(#celestialGlowFilter)" />
            </g>

            {/* Leather Wrapped Grip 2 */}
            <line x1="112" y1="288" x2="70" y2="330" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />
            {/* Grip Cord Bindings */}
            <line x1="105" y1="293" x2="107" y2="295" stroke="#38BDF8" strokeWidth="2" />
            <line x1="97" y1="301" x2="99" y2="303" stroke="#38BDF8" strokeWidth="2" />
            <line x1="89" y1="309" x2="91" y2="311" stroke="#38BDF8" strokeWidth="2" />
            <line x1="81" y1="317" x2="83" y2="319" stroke="#38BDF8" strokeWidth="2" />

            {/* Pommel 2 */}
            <polygon
              points="70,324 64,330 70,336 76,330"
              fill="url(#silverGuardGrad)"
              stroke="#334155"
              strokeWidth="1"
            />
            <circle cx="66" cy="334" r="6" fill="url(#silverGuardGrad)" stroke="#1E293B" strokeWidth="1" />
            <circle cx="66" cy="334" r="3" fill="#06B6D4" filter="url(#celestialGlowFilter)" />
          </g>

          {/* ================================================================
              LAYER 5: THE CLASH EPICENTER & EXPLOSIVE SPARK BURST
              (Point of contact: (200, 200))
              ================================================================ */}
          {/* Central Radial Plasma Glow */}
          <circle cx="200" cy="200" r={isOverdrive ? "65" : "48"} fill="url(#clashCoreBurst)" filter="url(#coreBlastFilter)" />

          {/* Diamond Flare Core */}
          <polygon
            points="200,168 206,194 232,200 206,206 200,232 194,206 168,200 194,194"
            fill="#FFFFFF"
            filter="url(#coreBlastFilter)"
          />
          <polygon
            points="200,180 203,197 220,200 203,203 200,220 197,203 180,200 197,197"
            fill={isOverdrive ? "#FDE68A" : "#FEF08A"}
          />

          {/* Radiating Spark Rays & Lightning Arcs */}
          <g filter="url(#coreBlastFilter)">
            {/* Diagonal clash sparks */}
            <line x1="184" y1="184" x2="152" y2="152" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" className="spark-flicker-item" />
            <line x1="216" y1="184" x2="248" y2="152" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" className="spark-flicker-item delay-1" />
            <line x1="184" y1="216" x2="152" y2="248" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" className="spark-flicker-item delay-2" />
            <line x1="216" y1="216" x2="248" y2="248" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" className="spark-flicker-item delay-3" />

            {/* Extra cross sparks */}
            <line x1="200" y1="175" x2="200" y2="155" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" className="spark-flicker-item delay-1" />
            <line x1="200" y1="225" x2="200" y2="245" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" className="spark-flicker-item delay-3" />
            <line x1="175" y1="200" x2="155" y2="200" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" className="spark-flicker-item delay-2" />
            <line x1="225" y1="200" x2="245" y2="200" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" className="spark-flicker-item" />
          </g>

          {/* Floating Embers / Spirit Motes rising from clash */}
          <circle cx="195" cy="180" r="1.5" fill="#FBBF24" className="ember-dot" style={{ animationDelay: "0.2s" }} />
          <circle cx="210" cy="170" r="2" fill="#EF4444" className="ember-dot" style={{ animationDelay: "0.8s" }} />
          <circle cx="185" cy="190" r="1.8" fill="#38BDF8" className="ember-dot" style={{ animationDelay: "1.4s" }} />
          <circle cx="215" cy="195" r="1.5" fill="#FFFFFF" className="ember-dot" style={{ animationDelay: "2.1s" }} />
          <circle cx="205" cy="160" r="2.2" fill="#F59E0B" className="ember-dot" style={{ animationDelay: "2.6s" }} />

          {/* Epicenter Pure White Core Center */}
          <circle cx="200" cy="200" r="4" fill="#FFFFFF" />
          <circle cx="200" cy="200" r="7" stroke="#FEF08A" strokeWidth="1.2" opacity="0.9" />
        </svg>
      </div>

      {/* Interactive Spirit Controller Bar */}
      <div className="sword-spirit-controller">
        <span className="spirit-indicator-pulse" />
        <span className="spirit-controller-text">
          {isOverdrive ? "🔥 OVERDRIVE AWAKENED" : "⚔️ BLADES IN HARMONY"}
          {clashCount > 0 && ` (${clashCount})`}
        </span>
        <button
          type="button"
          className={`spirit-strike-btn ${isOverdrive ? "active" : ""}`}
          onClick={toggleOverdrive}
          title="Toggle blade spirit intensity"
        >
          {isOverdrive ? <Flame size={12} /> : <Zap size={12} />}
          <span>{isOverdrive ? "OVERDRIVE" : "IGNITE SPIRIT"}</span>
        </button>
      </div>
    </div>
  );
}
