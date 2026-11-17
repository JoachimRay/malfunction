import Reveal from "./Reveal";

export default function Register() {
  return (
    <section id="register" className="wrap section register-closed">
      <Reveal className="stack">
        <p className="eyebrow">03 / Registration</p>
        <h2 className="h2">Applications are closed.</h2>
        <p className="lead register-closed__copy">The teams are set, the ideas are wonderfully unhelpful, and we’re ready to make some malfunctions. See you on November 21!</p>
      </Reveal>
      <Reveal className="register-closed__stamp" delay={0.12}>
        <span className="register-closed__mark" aria-hidden="true">✳</span>
        <p className="register-closed__label">The countdown is on</p>
        <p className="register-closed__date">See you there.</p>
      </Reveal>
    </section>
  );
}
