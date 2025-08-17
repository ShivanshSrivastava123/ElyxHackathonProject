import { create } from "zustand";

// This is the initial state when no member is selected.
const initialState = {
  member: null,
  kpis: [],
  trends: {},
  events: [],
  chats: [],
};

export const useAppStore = create((set) => ({
  ...initialState,
  // This function will be called with the data fetched from your database
  setAllData: (data) => set({
    member: data.member || null,
    kpis: data.kpis || [],
    trends: data.trends || {},
    events: data.events || [],
    chats: data.chats || [],
  }),
  // This function clears the data when no member is selected
  clearData: () => set(initialState),
}));