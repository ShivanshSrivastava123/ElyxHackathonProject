export default function Nav() {
  return (
    <header className="border-b border-slate-800 sticky top-0 bg-slate-950/80 backdrop-blur z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold">Elyx Member Console</span>
        </div>
        <div className="text-sm text-slate-400">Beta — CRA + Tailwind</div>
      </div>
    </header>
  );
}
