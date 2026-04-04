import { useCountdown } from "../hooks/useCountdown";

interface CooldownBadgeProps {
  seconds: number;
}

export function CooldownBadge({ seconds }: CooldownBadgeProps) {
  const { display, isReady } = useCountdown(seconds);

  if (isReady) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-accent-green/25 bg-accent-green/10 px-4 py-2 font-mono text-[13px] text-accent-green">
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent-green" />
        Ready to Claim
      </div>
    );
  }

  return (
    <div className="ui-panel-soft flex items-center gap-4 border-accent-gold/25 bg-accent-gold/5 px-5 py-4">
      <div>
        <div className="section-title mb-1">Cooldown Active</div>
        <div className="font-mono text-xl font-bold text-accent-gold">{display}</div>
      </div>
    </div>
  );
}
