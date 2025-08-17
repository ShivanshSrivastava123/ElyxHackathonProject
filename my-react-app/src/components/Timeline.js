import dayjs from "dayjs";
import clsx from "clsx";

export default function Timeline({ items=[], onSelect }) {
  // expects items: [{id, date, title, type, summary}]
  const grouped = items
    .slice()
    .sort((a,b)=>dayjs(a.date).valueOf()-dayjs(b.date).valueOf())
    .reduce((acc, it)=>{
      const key = dayjs(it.date).format("MMM YYYY");
      acc[key] = acc[key] || [];
      acc[key].push(it);
      return acc;
    }, {});
  const toneFor = (t) => ({
    decision: "border-indigo-500",
    test: "border-amber-500",
    med: "border-emerald-500",
    therapy: "border-pink-500",
    note: "border-slate-600",
  }[t] || "border-slate-600");

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([month, arr]) => (
        <div key={month}>
          <div className="text-sm text-slate-400 mb-3">{month}</div>
          <ol className="relative border-s border-slate-800 pl-6">
            {arr.map(it=>(
              <li key={it.id} className="mb-6 ms-6">
                <span className={clsx(
                  "absolute -start-1.5 flex h-3 w-3 rounded-full border-2 bg-slate-950", 
                  toneFor(it.type)
                )}/>
                <button
                  onClick={() => onSelect && onSelect(it)}
                  className="text-left w-full"
                >
                  <div className="text-xs text-slate-400">{dayjs(it.date).format("DD MMM YYYY")}</div>
                  <div className="font-medium">{it.title}</div>
                  {it.summary && <div className="text-sm text-slate-300">{it.summary}</div>}
                </button>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
