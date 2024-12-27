import { useEffect, useRef, useState } from "react";

export const useCountDown = ({
  initialTime = 1,
  onEnd = () => {},
  autoStart = false,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime * 60);
  const [isActive, setIsActive] = useState(autoStart);

  const onEndRef = useRef(onEnd);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsActive(false);
            onEndRef.current();
            return 0;
          }
          return prevTime - 1;
        });
      }, [1000]);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const start = () => {
    setIsActive(true);
  };

  const pause = () => {
    setIsActive(false);
  };

  const reset = (time = initialTime * 60) => {
    setTimeLeft(time);
  };

  return { timeLeft, start, pause, reset, isActive };
};
