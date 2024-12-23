import { useMemo } from "react";
import { Helmet } from "react-helmet-async";

import { usePomodoroState } from "../store/usePomodoroState";
import { cn } from "../utils/cn";

export const BackgroundColorProvider = ({ children }) => {
  const { state } = usePomodoroState();

  const title = useMemo(() => {
    switch (state.timerType) {
      case "pomodoro":
        return "Waktunya Fokus";
      case "istirahat":
        return "Istirahat Sebentar";
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
          state.timerType === "istirahat" && "bg-[#5EBA7D]"
        )}
      >
        {children}
      </div>
    </>
  );
};
