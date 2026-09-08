import "./Button.css";

/**
 * Reusable button. `variant` controls color language:
 * primary (violet, main actions), success (green, run/pass actions),
 * ghost (outline, secondary actions), danger (red, destructive).
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  disabled = false,
  loading = false,
  type = "button",
  onClick,
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size}${fullWidth ? " btn-full" : ""}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : (
        Icon && <Icon size={16} strokeWidth={2.25} />
      )}
      <span>{loading ? "Working…" : children}</span>
    </button>
  );
}
