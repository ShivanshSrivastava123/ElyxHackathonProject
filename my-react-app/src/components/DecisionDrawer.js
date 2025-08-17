import Tag from "./Tag";
import dayjs from "dayjs";

export default function DecisionDrawer({ open, onClose, event }) {
  if (!open || !event) return null;
  const fields = [
    ["Date", dayjs(event.date).format("DD MMM YYYY")],
    ["Type", event.type],
    ["Owner", event.owner || "—"],
    ["Pillar", event.pillar || "—"],
  ];
  return (
    <div className="fixed inset-0 z-30">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[520px] bg-slate-950 border-l border-slate-800 p-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Decision Detail</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">Close</button>
        </div>
        <div className="mt-4 space-y-2">
          {fields.map(([k,v])=>(
            <div key={k} className="text-sm flex justify-between">
              <span className="text-slate-400">{k}</span>
              <span className="text-slate-200">{v}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="text-slate-400 text-sm mb-1">Title</div>
          <div className="font-medium">{event.title}</div>
        </div>

        {event.rationale && (
          <div className="mt-6">
            <div className="text-slate-400 text-sm mb-1">Rationale</div>
            <p className="text-slate-200 whitespace-pre-wrap">{event.rationale}</p>
          </div>
        )}

        {Array.isArray(event.links) && event.links.length > 0 && (
          <div className="mt-6">
            <div className="text-slate-400 text-sm mb-1">Linked Chats</div>
            <div className="space-y-2">
              {event.links.map((c)=>(
                <div key={c.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2 mb-1">
                    <Tag tone="indigo">{c.role}</Tag>
                    <span className="text-xs text-slate-400">{c.timestamp}</span>
                  </div>
                  <div className="text-sm">{c.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {Array.isArray(event.ops) && (
          <div className="mt-6">
            <div className="text-slate-400 text-sm mb-1">Internal Ops Logged</div>
            <ul className="text-sm list-disc pl-5">
              {event.ops.map((o,i)=>(
                <li key={i}>{o.role}: {o.hours}h</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
