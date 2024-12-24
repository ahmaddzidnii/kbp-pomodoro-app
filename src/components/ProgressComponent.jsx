import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Progress } from "@nextui-org/progress";

import { useProgress } from "../store/useProgress";
import { formatCountdown } from "../utils/formatCountdown";
import { usePomodoroState } from "../store/usePomodoroState";

export const ProgressComponent = () => {
  const { progress } = useProgress();
  const { state } = usePomodoroState();

  const TOTAL_TIME = state.timers[state.timerType] * 60;

  const value = TOTAL_TIME - progress;

  const title = useMemo(() => {
    switch (state.timerType) {
      case "pomodoro":
        return ` ${formatCountdown(progress)} - Waktunya Fokus`;
      case "istirahat":
        return ` ${formatCountdown(progress)} - Waktunya Istirahat`;
      default:
        return "Pomodoro App - Ahmad Zidni Hidayat";
    }
  }, [state.timerType, progress]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Progress
        aria-label="progress"
        formatOptions={{
          style: "decimal",
        }}
        maxValue={TOTAL_TIME}
        classNames={{
          base: "w-full h-1",
          track: "drop-shadow-md",
          indicator: "bg-[#307BA9]",
          value: "text-foreground/60",
        }}
        value={value}
      />
    </>
  );
};
