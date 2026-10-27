import { SCHEDULE } from "@/lib/event";
import Reveal from "./Reveal";

export default function Schedule() {
  return (
    <section id="schedule" className="schedule">
      <div className="wrap section">
        <Reveal className="stack">
          <p className="eyebrow">02 / Schedule</p>
          <h2 className="h2">Run of show</h2>
        </Reveal>
        <Reveal delay={0.1}>
        <ol className="rows list-reset">
          {SCHEDULE.map((s, i) => (
            <li key={i} className="rows__item">
              <span className="rows__time">{s.time}</span>
              <span className="rows__title">{s.title}</span>
            </li>
          ))}
        </ol>
        </Reveal>
      </div>
    </section>
  );
}
