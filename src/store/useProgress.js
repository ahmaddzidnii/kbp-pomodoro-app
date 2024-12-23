import { create } from "zustand";

export const useProgress = create((set) => ({
  progress: 0,
  setProgress: (value) => set({ progress: value }),
}));
