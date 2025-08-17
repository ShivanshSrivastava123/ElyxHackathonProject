import React from 'react';

export default function MemberStack({ member, isActive, onClick }) {
  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <button
      onClick={onClick}
      className={`group w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ease-in-out
        ${isActive ? 'bg-indigo-500 scale-110' : 'bg-slate-700 hover:bg-slate-600'}`}
    >
      <div className={`font-bold text-lg ${isActive ? 'text-white' : 'text-slate-300'}`}>
        {getInitials(member.member.name)}
      </div>
      <span className={`text-xs mt-1 truncate w-full px-1 ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
        {member.member.name}
      </span>
    </button>
  );
}