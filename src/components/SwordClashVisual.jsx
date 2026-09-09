export default function SwordClashVisual({ className = "" }) {
  return (
    <div className={`sword-clash-visual ${className}`}>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="sword-svg"
      >
        <defs>
          {/* Metallic Blade Gradients */}
          <linearGradient id="bladeGrad1" x1="50" y1="50" x2="350" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--silver-light, #E2E8F0)" />
            <stop offset="50%" stopColor="var(--silver, #C9D0D4)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--border, #2A364F)" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="bladeGrad2" x1="350" y1="50" x2="50" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--silver-light, #E2E8F0)" />
            <stop offset="50%" stopColor="var(--silver, #C9D0D4)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--border, #2A364F)" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="clashGlow" cx="200" cy="200" r="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--crimson, #C62828)" stopOpacity="0.8" />
            <stop offset="40%" stopColor="var(--copper, #B87333)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Minimal Technical Orbit / Framework Lines */}
        <circle cx="200" cy="200" r="160" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="110" stroke="var(--border-subtle)" strokeWidth="1" />
        <line x1="200" y1="20" x2="200" y2="380" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />
        <line x1="20" y1="200" x2="380" y2="200" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />

        {/* Blade 1 (Top-Left to Bottom-Right) */}
        {/* Main Blade Core Line */}
        <line x1="60" y1="60" x2="330" y2="330" stroke="url(#bladeGrad1)" strokeWidth="3" strokeLinecap="round" />
        {/* Blade Spine Parallel Line */}
        <line x1="63" y1="57" x2="327" y2="321" stroke="var(--silver-light)" strokeWidth="1" opacity="0.6" />
        {/* Crossguard 1 */}
        <line x1="290" y1="310" x2="310" y2="290" stroke="var(--silver)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Handle & Pommel 1 */}
        <line x1="310" y1="310" x2="340" y2="340" stroke="var(--copper)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="343" cy="343" r="3" fill="var(--copper)" />

        {/* Blade 2 (Top-Right to Bottom-Left) */}
        {/* Main Blade Core Line */}
        <line x1="340" y1="60" x2="70" y2="330" stroke="url(#bladeGrad2)" strokeWidth="3" strokeLinecap="round" />
        {/* Blade Spine Parallel Line */}
        <line x1="337" y1="57" x2="73" y2="321" stroke="var(--silver-light)" strokeWidth="1" opacity="0.6" />
        {/* Crossguard 2 */}
        <line x1="110" y1="310" x2="90" y2="290" stroke="var(--silver)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Handle & Pommel 2 */}
        <line x1="90" y1="310" x2="60" y2="340" stroke="var(--copper)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="57" cy="343" r="3" fill="var(--copper)" />

        {/* Central Clash Intersection & Spark Details */}
        <circle cx="200" cy="200" r="45" fill="url(#clashGlow)" />
        <circle cx="200" cy="200" r="4" fill="var(--text-primary)" />
        <circle cx="200" cy="200" r="8" stroke="var(--crimson)" strokeWidth="1" opacity="0.8" />

        {/* Subtle Diamond Geometry at Center */}
        <polygon points="200,188 212,200 200,212 188,200" fill="none" stroke="var(--copper)" strokeWidth="1" opacity="0.7" />

        {/* Diagonal Ray Sparks (Sparing) */}
        <line x1="180" y1="180" x2="165" y2="165" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="220" y1="180" x2="235" y2="165" stroke="var(--silver-light)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="180" y1="220" x2="165" y2="235" stroke="var(--silver-light)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="220" y1="220" x2="235" y2="235" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
