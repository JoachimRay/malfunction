import Image from "next/image";
import { EVENT } from "@/lib/event";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="footer">
      <Reveal className="wrap footer__inner">
        <div className="footer__brand">
          <Image src="/idea-logo.png" alt="iDE.A" width={1660} height={536} className="logo logo--footer" />
          <p className="footer__text">
            Malfunction {EVENT.year}
          </p>
        </div>
        <div className="footer__contact">
          <p className="footer__label">Find us</p>
          <p className="footer__text">{EVENT.venueOneLine}</p>
          <a className="footer__email" href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a>
        </div>
        <div className="footer__social">
          <p className="footer__label">Follow iDE.A</p>
          <nav className="socials" aria-label="iDE.A social media">
            {EVENT.socials.map((social) => (
              <a key={social.name} className="socials__link" href={social.href} target="_blank" rel="noreferrer" aria-label={`Visit iDE.A on ${social.name}`} title={social.name}>
                <SocialIcon name={social.name} />
              </a>
            ))}
          </nav>
        </div>
      </Reveal>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "Facebook") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" fill="currentColor" /></svg>;
  if (name === "Instagram") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.7" cy="6.5" r="1.1" fill="currentColor" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.8 3h-3.4v11.5a2.4 2.4 0 1 1-2.1-2.4c.4 0 .8.1 1.1.3V9a6 6 0 1 0 4.4 5.8V9a8 8 0 0 0 4.2 1.2V6.8a4.9 4.9 0 0 1-4.2-3.8Z" fill="currentColor" /></svg>;
}
