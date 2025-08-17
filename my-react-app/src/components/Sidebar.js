import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Sidebar({ members, activeMemberId, onSelectMember }) {
  return (
    <aside className="w-64 bg-gray-900 flex flex-col border-r border-slate-800">
      <div className="p-4 border-b border-slate-800">
        <h1 className="font-bold text-xl text-white">Elyx Members</h1>
      </div>

      <div className="p-4 space-y-2">
        {members.map((m) => (
          <button
            key={m._id}
            onClick={() => onSelectMember(m._id)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200
              ${activeMemberId === m._id
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800'
              }`}
          >
            {m.member.name}
          </button>
        ))}
      </div>

      {activeMemberId && (
        <nav className="flex-1 p-4 space-y-2 border-t border-slate-800">
          {[
            ['Dashboard', '/'],
            ['Journey', '/journey'],
            ['Decisions', '/decisions'],
            ['Chats', '/chats'],
          ].map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `block w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200
                ${isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:bg-slate-800'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}

      <div className="p-4 border-t border-slate-800 mt-auto">
        <Link
          to="/add"
          className="block w-full py-2 px-3 rounded-md bg-slate-700 text-slate-200 text-sm text-center hover:bg-slate-600 transition-colors duration-200"
        >
          + Add Member
        </Link>
      </div>
    </aside>
  );
}