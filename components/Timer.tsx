"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";

type TimerProps = {
  /** Clock time (24h "HH:MM") the timer counts down to. */
  defaultTarget?: string;
  /** Show the Fullscreen button. */
  showFullscreen?: boolean;
};

type Phase = "idle" | "running" | "paused";

const pad = (n: number) => String(n).padStart(2, "0");

function format(ms: number) {
  const s = Math.ceil(ms / 1000);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

function clockTarget(value: string, t: number) {
  const [h, m] = (value || "17:00").split(":").map(Number);
  const d = new Date(t);
  d.setHours(h || 0, m || 0, 0, 0);
  return d.getTime();
}

export default function Timer({
  defaultTarget = "17:00",
  showFullscreen = true,
}: TimerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [target, setTarget] = useState(defaultTarget); // end time, like "17:00"
  const [phase, setPhase] = useState<Phase>("idle");
  const [endAt, setEndAt] = useState(0); // when running: timestamp it ends
  const [frozen, setFrozen] = useState(0); // when paused: ms left
  const [now, setNow] = useState(0); // 0 until mounted, then the current time
  const [idleAt, setIdleAt] = useState(0); // moment the idle display was calculated (stays still)

  // Keep "now" fresh. setNow is only called from timer callbacks.
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(() => {
      tick();
      setIdleAt(Date.now()); // freeze the starting display
    }, 0);
    const id = setInterval(tick, 200);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const ready = now > 0;
  const remaining =
    phase === "running"
      ? Math.max(0, endAt - now)
      : phase === "paused"
        ? frozen
        : idleAt
          ? Math.max(0, clockTarget(target, idleAt) - idleAt) // idle: frozen, does not tick
          : 0;
  const finished = ready && phase === "running" && remaining <= 0;

  // Load the alarm sound once (file lives in public/samsung-alarm.mp3)
  useEffect(() => {
    const audio = new Audio("/samsung-alarm.mp3");
    audio.loop = true; // keeps ringing until you reset
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  // Play the alarm when the timer finishes, stop it otherwise
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (finished) {
      audio.currentTime = 0;
      void audio.play().catch(() => {});
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [finished]);

  const toggle = () => {
    if (finished) {
      setPhase("idle");
      setIdleAt(Date.now());
      return;
    }
    const t = Date.now();

    // Pause
    if (phase === "running") {
      setFrozen(Math.max(0, endAt - t));
      setPhase("paused");
      return;
    }

    // Resume from where it was paused
    if (phase === "paused") {
      setEndAt(t + frozen);
      setPhase("running");
      return;
    }

    // Start: only now do we work out how long until the end time
    const left = clockTarget(target, t) - t;
    if (left <= 0) return; // end time already passed today
    setEndAt(t + left);
    setPhase("running");
  };

  // Spacebar starts and pauses, unless an input or button has focus.
  const toggleRef = useRef(toggle);
  useEffect(() => {
    toggleRef.current = toggle;
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (e.code === "Space" && tag !== "INPUT" && tag !== "BUTTON") {
        e.preventDefault();
        toggleRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void rootRef.current?.requestFullscreen?.().catch(() => {});
    }
  };

  // Shared hover/tap animation for every button
  const press = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  return (
    <>
      <Header />
      <motion.div
        className="wrap mf-timer"
        ref={rootRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <style>{css}</style>
        <p className="eyebrow">Malfunction 2026 · Hackathon</p>

        <motion.p
          className={finished ? "mf-time mf-done" : "mf-time"}
          role="timer"
          aria-live="off"
          animate={finished ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={
            finished
              ? { duration: 1, repeat: Infinity }
              : { duration: 0.2 }
          }
        >
          {!ready ? "--:--:--" : finished ? "TIME'S UP" : format(remaining)}
        </motion.p>

        <div className="dimension mf-dim" aria-hidden="true" />

        <div className="mf-row">
          <motion.button
            type="button"
            className="btn btn--solid"
            onClick={toggle}
            {...press}
          >
            {phase === "running" && !finished
              ? "Pause"
              : phase === "paused"
                ? "Resume"
                : "Start"}
          </motion.button>
          <motion.button
            type="button"
            className="btn btn--outline"
            onClick={() => {
              setPhase("idle");
              setIdleAt(Date.now());
            }}
            {...press}
          >
            Reset
          </motion.button>
          {showFullscreen && (
            <motion.button
              type="button"
              className="btn btn--outline"
              onClick={toggleFullscreen}
              {...press}
            >
              Fullscreen
            </motion.button>
          )}
        </div>

        <motion.div
          className="mf-panel"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="mf-row">
            <span className="mf-label">Count down to</span>
            <input
              type="time"
              className="mf-clock"
              value={target}
              onChange={(e) => {
                setTarget(e.target.value);
                setIdleAt(Date.now()); // recalculate the still display
              }}
              aria-label="End time"
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

// Uses the site's global.css (colors, fonts, .btn, .eyebrow, .dimension).
// The page's grid background shows through, so there is no background here.
const css = `
.mf-timer{min-height:calc(100vh - 72px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;padding-top:48px;padding-bottom:48px;text-align:center}
.mf-timer:fullscreen{min-height:100vh;background-color:var(--bg);background-image:linear-gradient(rgba(255,255,255,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.09) 1px,transparent 1px);background-size:40px 40px}
.mf-time{margin:0;font-family:var(--font-archivo),Arial,sans-serif;font-weight:800;font-size:clamp(52px,15vw,220px);line-height:.95;letter-spacing:-.03em;text-transform:uppercase;color:var(--ink);font-variant-numeric:tabular-nums}
.mf-done{font-size:clamp(40px,10vw,150px)}
.mf-dim{width:min(100%,900px)}
.mf-row{display:flex;flex-wrap:wrap;gap:12px 16px;align-items:center;justify-content:center}
.mf-panel{width:min(100%,640px);display:flex;flex-direction:column;gap:16px;padding:24px;border:1.5px solid var(--ink);background:#000}
.mf-label{font-size:14px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--mut)}
.mf-timer input{width:84px;min-height:48px;padding:12px 14px;border:1.5px solid var(--ink);border-radius:0;background:#000;color:var(--ink);font:16px var(--font-barlow),Arial,sans-serif;text-align:center;color-scheme:dark}
.mf-timer input.mf-clock{width:150px}
@media (max-width:640px){.mf-panel{padding:16px}}
`;