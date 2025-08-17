import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Journey from './pages/Journey';
import Decisions from './pages/Decisions';
import Chats from './pages/Chats';
import Welcome from './components/Welcome';
import AddMemberPage from './pages/AddMemberPage';
import { useAppStore } from './store/useAppStore';

export default function App() {
  const [members, setMembers] = useState([]);
  const [activeMemberId, setActiveMemberId] = useState(null);
  const { setAllData, clearData } = useAppStore();
  const navigate = useNavigate();

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/members');
      if (response.ok) {
        setMembers(await response.json());
      }
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSelectMember = async (memberId) => {
    if (!memberId) {
      clearData();
      setActiveMemberId(null);
      navigate('/');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/api/members/${memberId}`);
      const data = await response.json();
      setAllData(data); // Put fetched data into the central store
      setActiveMemberId(memberId);
      navigate('/'); // Go to the dashboard for the selected member
    } catch (error) {
      console.error("Failed to fetch member data:", error);
    }
  };
  
  const onMemberAdded = async (newMemberId) => {
    await fetchMembers();
    await handleSelectMember(newMemberId);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      <Sidebar
        members={members}
        activeMemberId={activeMemberId}
        onSelectMember={handleSelectMember}
      />
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={!activeMemberId ? <Welcome /> : <Dashboard />} />
          <Route path="/journey" element={activeMemberId ? <Journey /> : <Welcome />} />
          <Route path="/decisions" element={activeMemberId ? <Decisions /> : <Welcome />} />
          <Route path="/chats" element={activeMemberId ? <Chats /> : <Welcome />} />
          <Route path="/add" element={<AddMemberPage onMemberAdded={onMemberAdded} />} />
        </Routes>
      </main>
    </div>
  );
}