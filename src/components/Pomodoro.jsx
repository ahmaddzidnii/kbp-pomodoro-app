import { usePomodoroState } from "../store/usePomodoroState";
import { cn } from "../utils/cn";
import { Countdown } from "../utils/countdown";

const tabs = [
  {
    id: "pomodoro",
    label: "Pomodoro",
  },
  {
    id: "shortBreak",
    label: "Short break",
  },
  {
    id: "longBreak",
    label: "Long break",
  },
];

export const Pomodoro = () => {
  const { state, setState } = usePomodoroState();
  return (
    <section className="bg-[#307BA9] text-foreground rounded-md  h-[240px] shadow-[3px_3px_0_0_rgba(0,0,0,1)] flex justify-center items-center">
      <div className="text-center space-y-2">
        <div className="flex gap-x-2 md:gap-x-5 items-center font-bold">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              disabled={state.timerType === tab.id}
              className={cn("rounded-md px-1.5 py-2", state.timerType === tab.id && "bg-[#26ACFF]")}
              onClick={() => {
                setState({
                  timerType: tab.id,
                });
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
            01:23:45
          </p>
        </div>
        <div className="flex gap-x-3 items-center justify-center">
          <button className="bg-[#1D4C6A] text-foreground rounded-md font-bold px-4 py-2 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[#1D4C6A]/80">
            Start
          </button>
          <button className="bg-[#1D4C6A] text-foreground rounded-md font-bold px-4 py-2 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[#1D4C6A]/80">
            Stop
          </button>
        </div>
      </div>
    </section>
  );
};
