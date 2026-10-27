import Image from "next/image";
import { EVENT } from "@/lib/event";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="footer">
      <Reveal className="wrap footer__inner">
        <Image src="/idea-logo.png" alt="iDE.A" width={1660} height={536} className="logo logo--footer" />
        <p className="footer__text">
          {EVENT.venueOneLine}
          <br />
          {EVENT.contactEmail} / {EVENT.social}
        </p>
      </Reveal>
    </footer>
  );
}
