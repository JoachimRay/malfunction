import { EVENT } from "@/lib/event";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <section id="register" className="wrap section section--split section--top">
      <div className="stack">
        <p className="eyebrow">03 / Register</p>
        <h2 className="h2">Register your team</h2>
        <p className="lead">{EVENT.registerNote}</p>
      </div>
      <RegisterForm />
    </section>
  );
}
