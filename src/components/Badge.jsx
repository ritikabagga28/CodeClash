import "./Badge.css";

const TONE_CLASS = {
  easy: "badge-easy",
  medium: "badge-medium",
  hard: "badge-hard",
  success: "badge-success",
  xp: "badge-xp",
  locked: "badge-locked",
  neutral: "badge-neutral",
  violet: "badge-violet",
};

export default function Badge({ children, tone = "neutral", icon: Icon }) {
  return (
    <span className={`badge ${TONE_CLASS[tone] || TONE_CLASS.neutral}`}>
      {Icon && <Icon size={12} strokeWidth={2.5} />}
      {children}
    </span>
  );
}
