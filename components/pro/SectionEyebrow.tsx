export function SectionEyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-3">
      <span className="text-(--color-pro-muted)" style={{ fontFamily: 'var(--font-pro-mono)' }}>{num}</span>
      <h2 className="m-0 text-sm font-semibold tracking-[.08em] text-(--color-pro-accent) uppercase">{label}</h2>
      <span className="h-px flex-1 bg-(--color-pro-line)" />
    </div>
  );
}
