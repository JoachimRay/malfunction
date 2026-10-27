"use client";

import { useState } from "react";
import { TEAM_SIZE } from "@/lib/event";

type Member = { id: number; name: string; email: string };
type Status = "idle" | "submitting" | "success" | "error";

const minRows = TEAM_SIZE.min - 1; // rows besides the leader
const maxRows = TEAM_SIZE.max - 1;

export default function RegisterForm() {
  const [members, setMembers] = useState<Member[]>(
    Array.from({ length: minRows }, (_, i) => ({ id: i + 1, name: "", email: "" }))
  );
  const [nextId, setNextId] = useState(minRows + 1);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const addMember = () => {
    if (members.length >= maxRows) return;
    setMembers([...members, { id: nextId, name: "", email: "" }]);
    setNextId(nextId + 1);
  };
  const removeMember = (id: number) => setMembers(members.filter((m) => m.id !== id));
  const updateMember = (id: number, key: "name" | "email", value: string) =>
    setMembers(members.map((m) => (m.id === id ? { ...m, [key]: value } : m)));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const payload = {
      website: get("website"), // honeypot, must stay empty
      team: { name: get("teamName"), organization: get("organization") },
      leader: { name: get("leaderName"), email: get("leaderEmail"), phone: get("leaderPhone") },
      members: members.map(({ name, email }) => ({ name: name.trim(), email: email.trim() })),
      details: { shirtSize: get("shirtSize"), dietary: get("dietary"), mentor: get("mentor") },
      consent: fd.get("consent") === "on",
    };
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("success");
      setMessage("Thanks! Your team is registered. Check your email for confirmation.");
      form.reset();
      setMembers(Array.from({ length: minRows }, (_, i) => ({ id: i + 1, name: "", email: "" })));
      setNextId(minRows + 1);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3 className="form__sub">Team</h3>
      <div className="form__pair">
        <Field id="teamName" label="Team name" required />
        <Field id="organization" label="School or organization" required />
      </div>

      <h3 className="form__sub">Team leader</h3>
      <Field id="leaderName" label="Full name" autoComplete="name" required />
      <div className="form__pair">
        <Field id="leaderEmail" label="Email" type="email" autoComplete="email" required />
        <Field id="leaderPhone" label="Mobile number" type="tel" autoComplete="tel" required />
      </div>

      <h3 className="form__sub">Team members</h3>
      {members.map((m, i) => (
        <fieldset key={m.id} className="member">
          <legend className="member__legend">Member {i + 2}</legend>
          <div className="form__pair">
            <div className="field">
              <label htmlFor={`member-${m.id}-name`}>Full name</label>
              <input id={`member-${m.id}-name`} value={m.name} required onChange={(e) => updateMember(m.id, "name", e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor={`member-${m.id}-email`}>Email</label>
              <input id={`member-${m.id}-email`} type="email" value={m.email} required onChange={(e) => updateMember(m.id, "email", e.target.value)} />
            </div>
          </div>
          {members.length > minRows && (
            <button type="button" className="btn btn--outline btn--sm" onClick={() => removeMember(m.id)}>
              Remove member {i + 2}
            </button>
          )}
        </fieldset>
      ))}
      {members.length < maxRows && (
        <button type="button" className="btn btn--outline" onClick={addMember}>+ Add another member</button>
      )}
      <p className="form__hint">Teams have {TEAM_SIZE.min} to {TEAM_SIZE.max} members, including the leader.</p>

      <h3 className="form__sub">Other details</h3>
      <Field id="mentor" label="Mentor or adviser (optional)" placeholder="Name and email" />

      {/* Honeypot: hidden from people, bots tend to fill it */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="check">
        <input id="consent" name="consent" type="checkbox" required />
        <label htmlFor="consent">I agree to the event rules and data privacy notice on behalf of my team.</label>
      </div>

      <button type="submit" className="btn btn--solid" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit registration"}
      </button>
      <p role="status" aria-live="polite" className={`form__msg form__msg--${status}`}>{message}</p>
    </form>
  );
}

function Field({ id, label, type = "text", placeholder, required, autoComplete }: {
  id: string; label: string; type?: string; placeholder?: string; required?: boolean; autoComplete?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} placeholder={placeholder} required={required} autoComplete={autoComplete} />
    </div>
  );
}
