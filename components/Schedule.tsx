import { SCHEDULE } from "@/lib/event";

export default function Schedule() {
  return (
    <section id="schedule" className="schedule">
      <div className="wrap section">
        <div className="stack">
          <p className="eyebrow">02 / Schedule</p>
          <h2 className="h2">Run of show</h2>
        </div>
        <ol className="rows list-reset">
          {SCHEDULE.map((s, i) => (
            <li key={i} className="rows__item">
              <span className="rows__time">{s.time}</span>
              <span className="rows__title">{s.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
