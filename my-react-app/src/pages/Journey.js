import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import Timeline from "../components/Timeline";
import DecisionDrawer from "../components/DecisionDrawer";

export default function Journey() {
  const { events } = useAppStore();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <div className="mb-3">
            <h2 className="text-lg font-semibold">Member Journey</h2>
            <p className="text-slate-400 text-sm">
              Click an item to view the rationale, linked chats, and ops hours.
            </p>
          </div>
          <Timeline
            items={events}
            onSelect={(e)=>{ setCurrent(e); setOpen(true); }}
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <div className="font-semibold mb-1">Rules & Cadence</div>
          <ul className="text-sm text-slate-300 list-disc pl-5 space-y-1">
            <li>Full diagnostic panel every 3 months.</li>
            <li>Exercises updated every 2 weeks.</li>
            <li>Member travels ~1 week out of every 4.</li>
            <li>Plan adherence around ~50%, iterate accordingly.</li>
          </ul>
          {/* All per submission constraints.  */}
        </div>
      </div>

      <DecisionDrawer open={open} onClose={()=>setOpen(false)} event={current} />
    </div>
  );
}
