"use client";

import { useState } from "react";
import { TEAM_SIZE } from "@/lib/event";

type Member = { id: number; name: string; email: string };
type Status = "idle" | "submitting" | "success" | "error";

const minRows = TEAM_SIZE.min - 1;
const maxRows = TEAM_SIZE.max - 1;
const emptyMembers = () => Array.from({ length: minRows }, (_, i) => ({ id: i + 1, name: "", email: "" }));

export default function RegisterForm() {
  const [members, setMembers] = useState<Member[]>(emptyMembers);
  const [nextId, setNextId] = useState(minRows + 1);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const addMember = () => {
    if (members.length < maxRows) {
      setMembers([...members, { id: nextId, name: "", email: "" }]);
      setNextId(nextId + 1);
    }
  };
  const removeMember = (id: number) => setMembers(members.filter((member) => member.id !== id));
  const updateMember = (id: number, key: "name" | "email", value: string) =>
    setMembers(members.map((member) => member.id === id ? { ...member, [key]: value } : member));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = (key: string) => String(formData.get(key) ?? "").trim();
    const payload = {
      website: value("website"),
      registration_type: "team",
      team_name: value("team_name"),
      organization_name: value("organization_name"),
      leader_name: value("leader_name"),
      leader_email: value("leader_email"),
      project_idea: value("project_idea"),
      mentor_name: value("mentor_name"),
      consent: formData.get("consent") === "on",
      members: members.map(({ name, email }) => ({ name: name.trim(), email: email.trim() })),
    };

    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Registration could not be sent.");
      form.reset();
      setMembers(emptyMembers());
      setNextId(minRows + 1);
      setStatus("success");
      setMessage("Registration received. Thanks for signing up!");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Registration could not be sent.");
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form__sub">Team</h3>
      <div className="form__pair">
        <Field id="team_name" label="Team name" required />
        <Field id="organization_name" label="School or organization" required />
      </div>

      <h3 className="form__sub">Team leader</h3>
      <Field id="leader_name" label="Full name" autoComplete="name" required />
      <Field id="leader_email" label="Email" type="email" autoComplete="email" required />

      <h3 className="form__sub">Team members</h3>
      {members.map((member, index) => (
        <fieldset key={member.id} className="member">
          <legend className="member__legend">Member {index + 2}</legend>
          <div className="form__pair">
            <div className="field">
              <label htmlFor={`member-${member.id}-name`}>Full name</label>
              <input id={`member-${member.id}-name`} value={member.name} required onChange={(e) => updateMember(member.id, "name", e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor={`member-${member.id}-email`}>Email</label>
              <input id={`member-${member.id}-email`} type="email" value={member.email} required onChange={(e) => updateMember(member.id, "email", e.target.value)} />
            </div>
          </div>
          {members.length > minRows && (
            <button type="button" className="btn btn--outline btn--sm" onClick={() => removeMember(member.id)}>
              Remove member {index + 2}
            </button>
          )}
        </fieldset>
      ))}
      {members.length < maxRows && (
        <button type="button" className="btn btn--outline" onClick={addMember}>+ Add another member</button>
      )}
      <p className="form__hint">Teams have {TEAM_SIZE.min} to {TEAM_SIZE.max} members, including the leader.</p>

      <h3 className="form__sub">Project</h3>
      <div className="field">
        <label htmlFor="project_idea">What do you plan to build?</label>
        <textarea id="project_idea" name="project_idea" required rows={4} />
      </div>
      <Field id="mentor_name" label="Mentor or adviser (optional)" placeholder="Name and email" />

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
