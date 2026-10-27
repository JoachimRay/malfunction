import Image from "next/image";
import { EVENT } from "@/lib/event";

export default function Hero() {
  return (
    <section id="top" className="wrap hero">
      <p className="eyebrow">{EVENT.type}</p>
      <h1 className="hero__title">
        {EVENT.name}
        <br />
        {EVENT.year}
      </h1>
      <div className="dimension" aria-hidden="true" />
      <div className="hero__row">
        <div className="hero__copy">
          <p className="hero__date">{EVENT.dateShort}</p>
          <p className="hero__venue">
            {EVENT.venueLines[0]}
            <br />
            {EVENT.venueLines[1]}
          </p>
          <p className="hero__intro">{EVENT.intro}</p>
          <div className="hero__cta">
            <a href="#register" className="btn btn--solid">Register your team</a>
            <a href="#schedule" className="btn btn--outline">View schedule</a>
          </div>
        </div>
        <Image
          src="/malfunction-poster.png"
          alt="MALFUNCTION 2026 hackathon poster"
          width={1414}
          height={2000}
          className="hero__poster"
          priority
        />
      </div>
    </section>
  );
}
