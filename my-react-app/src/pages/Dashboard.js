import { useAppStore } from '../store/useAppStore';
import KPICard from '../components/KPICard';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

export default function Dashboard() {
  const { member, kpis, trends } = useAppStore();

  return (
    <motion.div
      key={member.id}
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-white">Welcome, {member.name}</h1>
        <p className="text-slate-400 mt-1">Snapshot of your current health and performance momentum.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <h2 className="text-xl font-bold text-white mb-1">{member.persona.archetype}</h2>
        <p className="text-slate-400 mb-4">{member.persona.summary}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-slate-200 mb-2">Goals</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              {member.persona.goals.map(goal => <li key={goal}>{goal}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-2">Challenges</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              {member.persona.challenges.map(c => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
        {kpis.map((k) => (
          <motion.div key={k.key} variants={itemVariants}>
            <KPICard label={k.label} value={k.value} delta={k.delta} hint={k.hint} />
          </motion.div>
        ))}
      </motion.div>
      
      {/* (Add Trend charts here if desired, following the same pattern) */}
    </motion.div>
  );
}