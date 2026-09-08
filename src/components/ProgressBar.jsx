import "./ProgressBar.css";

/**
 * value / max drive fill width. `tone` selects the gradient:
 * xp (amber, default) or success (green, used on the result screen).
 */
export default function ProgressBar({ value, max, tone = "xp", label, showNumbers = true, size = "md" }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div className="progress-block">
      {(label || showNumbers) && (
        <div className="progress-labels">
          {label && <span className="progress-label">{label}</span>}
          {showNumbers && (
            <span className="progress-numbers">
              {value.toLocaleString()} / {max.toLocaleString()}
            </span>
          )}
        </div>
      )}
      <div className={`progress-track progress-${size}`}>
        <div
          className={`progress-fill progress-fill-${tone}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
