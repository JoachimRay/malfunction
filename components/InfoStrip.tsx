import { EVENT } from "@/lib/event";

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
          <div key={i.label} className="strip__item">
            <dt className="eyebrow">{i.label}</dt>
            <dd className="strip__value">{i.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
