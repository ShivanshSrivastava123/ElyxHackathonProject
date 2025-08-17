import React from 'react';
import { motion } from 'framer-motion';

export default function Welcome() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 rounded-2xl bg-emerald-400 mb-6 flex items-center justify-center text-4xl font-bold text-slate-900">
        E
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">Welcome to Elyx</h1>
      <p className="text-slate-400 max-w-md">
        Your personal health console. Select a member from the sidebar to view their dashboard, or add a new member to begin.
      </p>
    </motion.div>
  );
}