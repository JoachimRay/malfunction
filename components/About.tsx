import { EVENT, TRACKS } from "@/lib/event";

export default function About() {
  return (
    <section id="about" className="wrap section section--split">
      <div className="stack">
        <p className="eyebrow">01 / About</p>
        <h2 className="h2">What is Malfunction?</h2>
        <p className="lead">{EVENT.about}</p>
      </div>
      <ul className="stack stack--sm list-reset">
        {TRACKS.map((t) => (
          <li key={t.id} className="card card--row">
            <span className="card__id">{t.id}</span>
            <span className="card__title">{t.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
