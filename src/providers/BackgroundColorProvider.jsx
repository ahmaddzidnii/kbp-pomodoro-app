import { useMemo } from "react";
import { Helmet } from "react-helmet-async";

import { usePomodoroState } from "../store/usePomodoroState";

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
        className="min-h-screen px-2 lg:px-0 transition-colors duration-500"
        style={{
          backgroundColor: state.timerType === "pomodoro" ? "#7FCEFF" : "#5EBA7D",
        }}
      >
        {children}
      </div>
    </>
  );
};
