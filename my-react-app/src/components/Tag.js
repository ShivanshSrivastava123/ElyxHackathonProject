import clsx from "clsx";
export default function Tag({ children, tone="slate" }) {
  const tones = {
    slate: "bg-slate-800 text-slate-200",
    blue: "bg-blue-800/50 text-blue-200",
    green: "bg-emerald-800/50 text-emerald-200",
    yellow: "bg-amber-800/50 text-amber-200",
    pink: "bg-pink-800/50 text-pink-200",
    red: "bg-rose-800/50 text-rose-200",
    indigo: "bg-indigo-800/50 text-indigo-200",
  };
  return (
    <span className={clsx("px-2 py-0.5 text-xs rounded-md", tones[tone])}>
      {children}
    </span>
  );
}
