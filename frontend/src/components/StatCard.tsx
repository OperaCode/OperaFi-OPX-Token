interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
}

export function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="ui-panel relative overflow-hidden p-4 animate-fade-up">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent-green/90 to-accent-blue/90" />
      <div className="section-title mb-1">{label}</div>
      <div className="break-all font-mono text-base font-bold text-text">{value}</div>
      {sub && <div className="mt-1 text-xs text-dim">{sub}</div>}
    </div>
  );
}
