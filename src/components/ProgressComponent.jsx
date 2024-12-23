import { Progress } from "@nextui-org/progress";

import { useProgress } from "../store/useProgress";
import { usePomodoroState } from "../store/usePomodoroState";

export const ProgressComponent = () => {
  const { progress } = useProgress();
  const { state } = usePomodoroState();

  const TOTAL_TIME = state.timers[state.timerType] * 60;

  const value = TOTAL_TIME - progress;

  return (
    <Progress
      aria-label="progress"
      formatOptions={{
        style: "decimal",
      }}
      maxValue={TOTAL_TIME}
      classNames={{
        base: "w-full h-2",
        track: "drop-shadow-md",
        indicator: "bg-[#307BA9]",
        value: "text-foreground/60",
      }}
      value={value}
    />
  );
};
