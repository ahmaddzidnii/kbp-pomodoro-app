import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa6";

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
    initialTime:
      state.timerType === "pomodoro"
        ? state.timers.pomodoro
        : state.timers.istirahat,
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
        ? (state.audios.istirahat ?? "/assets/sounds/saatnyaistirahat.mp3")
        : (state.audios.pomodoro ?? "/assets/sounds/bell.mp3");
    audio.volume = state.volumeAlarm;
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
    <section className="flex h-[240px] items-center justify-center rounded-md bg-[#307BA9] text-foreground shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-x-2 font-bold md:gap-x-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              disabled={state.timerType === tab.id}
              className={cn(
                "rounded-md px-1.5 py-2",
                state.timerType === tab.id && "bg-[#26ACFF]",
              )}
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
            className="text-[42px] font-extrabold tracking-[3px] lg:text-[64px]"
          >
            {formatCountdown(timeLeft)}
          </p>
        </div>

        <div className="flex items-center justify-center gap-x-3">
          {isActive ? (
            <button
              onClick={handlePause}
              className="inline-flex items-center rounded-md border-2 border-black bg-[#1D4C6A] px-4 py-2 font-bold text-foreground shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[#1D4C6A]/80"
            >
              <FaPause className="size-6" />
              <span className="ml-3 hidden md:block">Pause</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="inline-flex items-center rounded-md border-2 border-black bg-[#1D4C6A] px-4 py-2 font-bold text-foreground shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[#1D4C6A]/80"
            >
              <FaPlay className="size-6" />
              <span className="ml-3 hidden md:block">Mulai</span>
            </button>
          )}
          <button
            onClick={handleReset}
            className="rounded-md border-2 border-black bg-[#1D4C6A] px-4 py-2 font-bold text-foreground shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[#1D4C6A]/80"
          >
            <GrPowerReset className="size-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
