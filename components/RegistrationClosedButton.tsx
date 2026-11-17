"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = { className: string; children: ReactNode };

export default function RegistrationClosedButton({ className, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("dialog-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("dialog-open");
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button ref={triggerRef} type="button" className={className} onClick={() => setIsOpen(true)}>
        {children}
      </button>
      {isOpen && (
        <div className="closed-dialog" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}>
          <section className="closed-dialog__panel" role="alertdialog" aria-modal="true" aria-labelledby="closed-dialog-title" aria-describedby="closed-dialog-copy">
            <button ref={closeRef} type="button" className="closed-dialog__x" aria-label="Close message" onClick={() => setIsOpen(false)}>×</button>
            <p className="closed-dialog__code"><span aria-hidden="true">⚠</span> SYSTEM NOTICE <span>ERR_ CLOSED</span></p>
            <h2 id="closed-dialog-title" className="closed-dialog__title">Well, this is awkward.</h2>
            <p id="closed-dialog-copy" className="closed-dialog__copy">The application window has closed. The good news? The fun part is just around the corner.</p>
            <div className="closed-dialog__ticket">
              <span>APPLICATIONS</span>
              <strong>CLOSED</strong>
              <span>EVENT DAY · 21 NOV 2026</span>
            </div>
            <p className="closed-dialog__signoff">Thanks for the interest. <b>See you there!</b></p>
            <button type="button" className="btn btn--solid closed-dialog__button" onClick={() => setIsOpen(false)}>Got it</button>
          </section>
        </div>
      )}
    </>
  );
}
