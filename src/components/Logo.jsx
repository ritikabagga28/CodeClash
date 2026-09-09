export default function Logo({ size = 22, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {/* Code Brackets */}
      <path
        d="M 7 9 L 2 14 L 7 19"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path
        d="M 21 9 L 26 14 L 21 19"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />

      {/* Crossed Sword Blades */}
      <line
        x1="8"
        y1="6"
        x2="20"
        y2="22"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="21"
        x2="21"
        y2="18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />

      <line
        x1="20"
        y1="6"
        x2="8"
        y2="22"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <line
        x1="7"
        y1="18"
        x2="10"
        y2="21"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />

      {/* Subtle Clash Intersection Point */}
      <circle cx="14" cy="14" r="1.5" fill="var(--crimson, #C62828)" />
    </svg>
  );
}
