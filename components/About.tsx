import { EVENT, TRACKS } from "@/lib/event";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="wrap section section--split">
      <Reveal className="stack">
        <p className="eyebrow">01 / About</p>
        <h2 className="h2">What is Malfunction?</h2>
        <p className="lead about__intro">{EVENT.about}</p>
      </Reveal>
      <Reveal className="about-tracks" delay={0.12}>
        <ul className="stack stack--sm list-reset" aria-label="Challenge categories">
        {TRACKS.map((t) => (
          <li key={t.id} className="card card--row">
            <span className="card__id">{t.id}</span>
            <div className="card__copy">
              <span className="card__title">{t.title}</span>
              <p className="card__description">{t.description}</p>
            </div>
          </li>
        ))}
        </ul>
      </Reveal>
    </section>
  );
}
