import { Helmet } from "react-helmet";

import { usePomodoroState } from "../store/usePomodoroState";
import { cn } from "../utils/cn";
import { useMemo } from "react";

export const BackgroundColorProvider = ({ children }) => {
  const { state } = usePomodoroState();

  const title = useMemo(() => {
    switch (state.timerType) {
      case "pomodoro":
        return "Waktunya Fokus - Ahmad Zidni Hidayat";
      case "shortBreak":
        return "Istirahat Sebentar - Ahmad Zidni Hidayat";
      case "longBreak":
        return "Selamat Istirahat - Ahmad Zidni Hidayat";
      default:
        return "Pomodoro App - Ahmad Zidni Hidayat";
    }
  }, [state.timerType]);
  return (
    <>
      <Helmet>
        <title>{`${title}`}</title>
      </Helmet>
      <div
        className={cn(
          "min-h-screen px-2 lg:px-0 transition-colors duration-500",
          state.timerType === "pomodoro" && "bg-primary",
          state.timerType === "shortBreak" && "bg-[#6FB1FC]",
          state.timerType === "longBreak" && "bg-[#5EBA7D]"
        )}
      >
        {children}
      </div>
    </>
  );
};
