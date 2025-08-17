import { useAppStore } from '../store/useAppStore'; // Correct path to your store
import Tag from '../components/Tag';
import dayjs from 'dayjs';

export default function Decisions() {
  const { events } = useAppStore();

  const tone = (t) => ({
    decision: "indigo",
    Onboarding: "indigo",
    Intervention: "pink",
    medication: "pink",
    test: "amber",
    diagnostic: "sky",
    Data: "sky"
  }[t] || "slate");

  if (!events || events.length === 0) {
    return (
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h2 className="text-xl font-bold text-white">Decision Log</h2>
            <p className="text-slate-400 mt-2">No decision or event data available for this member.</p>
        </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h2 className="text-xl font-bold text-white mb-1">Decisions & Rationale</h2>
      <p className="text-slate-400 text-sm mb-6">
        A detailed summary of all key decisions, their owners, and the rationale behind them.
      </p>
      <div className="space-y-6">
        {events.map(ev => (
          <div key={ev.id}>
            <div className="flex items-center gap-3 mb-2">
              <Tag tone={tone(ev.type)}>{ev.type}</Tag>
              <span className="text-slate-400 text-sm">{dayjs(ev.date).format("DD MMMM YYYY")}</span>
            </div>
            <h3 className="font-semibold text-lg text-slate-100 mb-1">{ev.title}</h3>
            <p className="text-slate-300 text-sm mb-2">{ev.rationale}</p>
            <div className="text-xs text-slate-500">
              Owner: <span className="text-slate-400">{ev.owner}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}