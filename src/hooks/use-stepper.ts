import { useEffect, useRef, useState } from "react";

export function useStepper(totalSteps: number, speed: number, autoStartOff = true) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(!autoStartOff);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const delay = 800 / speed;
    ref.current = window.setTimeout(() => {
      setStep((s) => {
        if (s >= totalSteps - 1) { setPlaying(false); return s; }
        return s + 1;
      });
    }, delay);
    return () => { if (ref.current) window.clearTimeout(ref.current); };
  }, [playing, step, speed, totalSteps]);

  return {
    step, setStep, playing,
    play: () => { if (step >= totalSteps - 1) setStep(0); setPlaying(true); },
    pause: () => setPlaying(false),
    reset: () => { setPlaying(false); setStep(0); },
    next: () => setStep((s) => Math.min(totalSteps - 1, s + 1)),
    prev: () => setStep((s) => Math.max(0, s - 1)),
  };
}
