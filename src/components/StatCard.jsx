import "./StatCard.css";

export default function StatCard({ icon: Icon, value, label, tone = "violet" }) {
  return (
    <div className={`stat-card stat-tone-${tone}`}>
      <div className="stat-icon">{Icon && <Icon size={18} strokeWidth={2.25} />}</div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}
