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
          audios: {
            pomodoro: "/assets/sounds/bell.mp3",
            istirahat: "/assets/sounds/saatnyaistirahat.mp3",
          },
          volumeAlarm: 0.5,
          cycles: 4,
          currentCycle: 0,
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
