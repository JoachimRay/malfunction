import { EVENT } from "@/lib/event";
import RegisterForm from "./RegisterForm";
import Reveal from "./Reveal";

export default function Register() {
  return (
    <section id="register" className="wrap section section--split section--top">
      <Reveal className="stack">
        <p className="eyebrow">03 / Register</p>
        <h2 className="h2">Register your team</h2>
        <p className="lead register__intro">{EVENT.registerNote}</p>
      </Reveal>
      <RegisterForm />
    </section>
  );
}
