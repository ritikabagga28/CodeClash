export default function Logo({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {/* Blade 1 (Top-Right to Bottom-Left) */}
      <line
        x1="20"
        y1="4"
        x2="8"
        y2="16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Guard 1 */}
      <line
        x1="6"
        y1="14"
        x2="10"
        y2="18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Handle 1 */}
      <line
        x1="8"
        y1="16"
        x2="5"
        y2="19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Pommel 1 */}
      <circle cx="4" cy="20" r="1" fill="currentColor" />

      {/* Blade 2 (Top-Left to Bottom-Right) */}
      <line
        x1="4"
        y1="4"
        x2="16"
        y2="16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Guard 2 */}
      <line
        x1="14"
        y1="18"
        x2="18"
        y2="14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Handle 2 */}
      <line
        x1="16"
        y1="16"
        x2="19"
        y2="19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Pommel 2 */}
      <circle cx="20" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}
