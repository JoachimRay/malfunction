import { EVENT } from "@/lib/event";
import Reveal from "./Reveal";

const items = [
  { label: "Date", value: EVENT.dateLong },
  { label: "Location", value: EVENT.venueOneLine },
  { label: "Registration closes", value: EVENT.deadline },
];

export default function InfoStrip() {
  return (
    <section className="strip" aria-label="Event details">
      <dl className="wrap strip__grid">
        {items.map((i) => (
          <Reveal key={i.label} className="strip__item" delay={items.indexOf(i) * 0.08}>
            <dt className="eyebrow">{i.label}</dt>
            <dd className="strip__value">{i.value}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
