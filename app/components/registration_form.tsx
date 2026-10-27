"use client";

import { useState } from "react";

export default function RegistrationForm(){ 
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        setIsSubmitting(true);
        setStatus("");
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const result = await response.json().catch(() => null);
                throw new Error(result?.error ?? "Registration could not be sent.");
            }

            const result = await response.json();
            form.reset();
            setStatus(result.message ?? "Google Apps Script responded.");
        } catch (error) {
            setStatus(error instanceof Error ? error.message : "Registration could not be sent.");
        } finally {
            setIsSubmitting(false);
        }
    }

return( 

    <form action="/api/register" method="post" onSubmit={handleSubmit}>
        <input type = "text" name = "leader_name" placeholder= "Full name" required/> 
        <input type = "email" name = "leader_email" placeholder= "Email" required/>
        <textarea name = "project_idea" placeholder= "Message" required/>

        <button type = "submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Submit"}</button>
        <p role="status" aria-live="polite">{status}</p>
    </form>
    
)

}
