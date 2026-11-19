import { bd } from '@/lib/build';

export function SectionEyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-3">
      <span className="b-fade text-(--color-pro-muted)" style={{ fontFamily: 'var(--font-pro-mono)', ...bd(0) }}>{num}</span>
      <h2 className="b-rise m-0 text-sm font-semibold tracking-[.08em] text-(--color-pro-accent) uppercase" style={bd(0.05)}>{label}</h2>
      <span className="b-line h-px flex-1 bg-(--color-pro-line)" style={bd(0.15)} />
    </div>
  );
}
