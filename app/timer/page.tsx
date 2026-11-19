import type { Metadata } from "next";
import Timer from "@/components/Timer";

export const metadata: Metadata = {
  title: "Timer | Malfunction 2026",
};

export default function TimerPage() {
  return <Timer defaultTarget="17:00" />;
}