import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";

import { cn } from "../utils/cn";
import { useProgress } from "../store/useProgress";
import { useCountDown } from "../hooks/useCountDown";
import { formatCountdown } from "../utils/formatCountdown";
import { usePomodoroState } from "../store/usePomodoroState";

const tabs = [
  {
    id: "pomodoro",
    label: "Pomodoro",
  },
  {
    id: "istirahat",
    label: "Istirahat",
  },
];

export const Pomodoro = () => {
  const { setProgress } = useProgress();
  const { state, setState } = usePomodoroState();

  const [isManual, setIsManual] = useState(true);

  const { timeLeft, isActive, start, pause, reset } = useCountDown({
    initialTime: state.timerType === "pomodoro" ? state.timers.pomodoro : state.timers.istirahat,
    onEnd: () => {
      setTimeout(() => {
        playSound();
        setIsManual(false);
        setState({
          ...state,
          timerType: state.timerType === "pomodoro" ? "istirahat" : "pomodoro",
        });
      });
    },
  });

  useEffect(() => {
    setProgress(timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    reset(state.timers[state.timerType] * 60);

    if (!isManual) {
      start();
    }
  }, [state.timerType, state.timers, isManual]);

  const handleStart = () => {
    start();
  };

  const handlePause = () => {
    pause();
  };

  const handleReset = () => {
    pause();
    reset();
  };

  function playSound() {
    const audio = document.createElement("audio");
    audio.src =
      state.timerType === "pomodoro"
        ? "/assets/sounds/saatnyaistirahat.mp3"
        : "/assets/sounds/bell-172780.mp3";
    audio.play();
  }

  const handleTabChange = (tabId) => {
    // pause countdown saat user navigasi ke tab lain secara manual
    pause();
    setIsManual(true);
    setState({
      ...state,
      timerType: tabId,
    });
  };

  return (
    <section className="bg-[#307BA9] text-foreground rounded-md  h-[240px] shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex justify-center items-center">
      <div className="text-center space-y-2">
        <div className="flex gap-x-2 md:gap-x-5 items-center justify-center font-bold">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              disabled={state.timerType === tab.id}
              className={cn("rounded-md px-1.5 py-2", state.timerType === tab.id && "bg-[#26ACFF]")}
              onClick={() => {
                handleTabChange(tab.id);
              }}
            >
              <span className="text-sm md:text-base">{tab.label}</span>
            </button>
          ))}
        </div>
        <div>
          <p
            style={{ fontFamily: "Arial, sans-serif" }}
            className="text-[42px] lg:text-[64px] font-extrabold tracking-[3px]"
          >
            {formatCountdown(timeLeft)}
          </p>
        </div>

        <div className="flex gap-x-3 items-center justify-center">
          {isActive ? (
            <button
              onClick={handlePause}
              className="bg-[#1D4C6A] text-foreground rounded-md font-bold px-4 py-2 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[#1D4C6A]/80"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="bg-[#1D4C6A] text-foreground rounded-md font-bold px-4 py-2 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[#1D4C6A]/80"
            >
              Start
            </button>
          )}
          <button
            onClick={handleReset}
            className="bg-[#1D4C6A] text-foreground rounded-md font-bold px-4 py-2 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[#1D4C6A]/80"
          >
            <GrPowerReset className="size-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
