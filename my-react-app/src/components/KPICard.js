export default function KPICard({ label, value, delta, hint }) {
  const up = delta && delta.startsWith("+");
  return (
    <div className="bg-slate-900 rounded-xl p-4 shadow-card border border-slate-800">
      <div className="text-slate-400 text-xs uppercase tracking-wide">{label}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {delta && (
        <div className={`mt-1 text-sm ${up ? "text-emerald-400" : "text-rose-400"}`}>
          {delta}
        </div>
      )}
      {hint && <div className="mt-2 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}
