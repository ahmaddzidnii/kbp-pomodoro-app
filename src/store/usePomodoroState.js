import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePomodoroState = create(
  persist(
    (set) => {
      return {
        state: {
          timers: {
            pomodoro: 5,
            istirahat: 1,
          },
          cycles: 4,
          currentCycle: 0,
          isPlaying: false,
          isPaused: false,
          timerType: "pomodoro",
        },

        setState: (newState) => {
          set((state) => ({
            state: {
              ...state.state,
              ...newState,
            },
          }));
        },
      };
    },
    {
      name: "pomodoro-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
