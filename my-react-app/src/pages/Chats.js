import { useAppStore } from '../store/useAppStore';
import { motion } from 'framer-motion';

export default function Chats() {
  // Get both the raw text and the structured chats from the store
  const { rawPdfText, chats, member } = useAppStore();

  if (!member) {
    return <div className="text-center text-slate-500">Please select a member to view their chat history.</div>;
  }
  
  // Check if there is any chat data at all
  const hasRawText = rawPdfText && rawPdfText.length > 0;
  const hasStructuredChats = chats && chats.length > 0;

  if (!hasRawText && !hasStructuredChats) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h2 className="text-xl font-bold text-white">Chat Log</h2>
        <p className="text-slate-400 mt-2">No chat data available for this member.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-slate-900 rounded-xl p-6 border border-slate-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Conditionally render the title based on what data is available */}
      <h2 className="text-xl font-bold text-white mb-4">
        {hasRawText ? "Full PDF Chat Log" : "Key Chat Summaries"}
      </h2>
      
      {hasRawText ? (
        // If rawPdfText exists, display it
        <pre className="whitespace-pre-wrap font-sans text-sm text-slate-300 bg-slate-800/50 p-4 rounded-lg max-h-[70vh] overflow-y-auto">
          {rawPdfText}
        </pre>
      ) : (
        // Otherwise, fall back to displaying the structured chats
        <div className="space-y-4">
          {chats.map(c => (
            <div key={c.id} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-sm text-indigo-300">{c.role}</span>
                  <span className="text-xs text-slate-500">{c.date}</span>
              </div>
              <p className="text-slate-300 text-sm">{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}