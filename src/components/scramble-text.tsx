"use client";

import { useState, useEffect, useRef } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/`~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SCRAMBLE_SPEED = 40;
const HOLD_DURATION = 2000;

export default function ScrambleText({words} : {words: string[]}) {

  const [displayText, setDisplayText] = useState(words[0]);
  const [isScrambling, setIsScrambling] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    const scramble = (target: string) => {
      setIsScrambling(true);
      const length = target.length;
      let frame = 0;
      const totalFrames = 18;

      return new Promise<void>((resolve) => {
        interval = setInterval(() => {
          frame++;
          let result = "";
          for (let i = 0; i < length; i++) {
            const settleAt = Math.floor((totalFrames * (i + 1)) / length);
            result += frame >= settleAt ? target[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          setDisplayText(result);
          if (frame >= totalFrames) {
            clearInterval(interval);
            setIsScrambling(false);
            resolve();
          }
        }, SCRAMBLE_SPEED);
      });
    };

    const cycle = async () => {
      while (true) {
        await new Promise((resolve) => { timeout = setTimeout(resolve, HOLD_DURATION); });
        const nextIndex = (indexRef.current + 1) % words.length;
        indexRef.current = nextIndex;
        await scramble(words[nextIndex]);
      }
    };

    cycle();

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (<span className={isScrambling ? "text-muted-foreground" : ""}>
            {displayText}
          </span>)

}