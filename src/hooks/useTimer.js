import { useEffect, useRef, useState } from 'react';

export function useTimer(initialSeconds, onExpire, deps = []) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    setTimeLeft(initialSeconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (!running) return undefined;
    if (timeLeft <= 0) {
      setRunning(false);
      onExpireRef.current?.();
      return undefined;
    }
    const id = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running, timeLeft]);

  return {
    timeLeft,
    running,
    start: () => setRunning(true),
    pause: () => setRunning(false),
    reset: (to = initialSeconds) => {
      setRunning(false);
      setTimeLeft(to);
    },
  };
}
