import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePomodoroState = create(
  persist(
    (set) => {
      return {
        state: {
          pomodoroTime: 25,
          shortBreakTime: 5,
          longBreakTime: 15,
          cycles: 4,
          currentCycle: 0,
          isPlaying: false,
          isPaused: false,
          isStopped: true,
          timerType: "pomodoro",
          timeLeft: 25 * 60,
          timeLeftInMinutes: 25,
          timeLeftInSeconds: 0,
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
