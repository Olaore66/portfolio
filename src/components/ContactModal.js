"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { profile, projectTypes } from "@/data/portfolio";

const EASE = [0.76, 0, 0.24, 1];
const EMPTY = { name: "", email: "", projectType: "", message: "", company: "" };

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.07 } }),
};

function Field({ label, error, index, children }) {
  return (
    <motion.label custom={index} variants={item} initial="hidden" animate="visible" className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 block text-sm font-medium text-ink"
          >
            ↳ {error}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.label>
  );
}

const inputClass =
  "w-full border-b border-ink/30 bg-transparent py-3 text-lg text-ink placeholder:text-ink/40 transition-colors focus:border-ink focus:outline-none aria-[invalid=true]:border-ink";

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const firstField = useRef(null);
  const lenis = useLenis();
  const titleId = useId();

  // Pause smooth scrolling behind the dialog, focus the first field, close on Esc.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const previous = document.activeElement;
    const focusTimer = setTimeout(() => firstField.current?.focus(), 450);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      previous?.focus?.();
    };
  }, [open, lenis, onClose]);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10) next.message = "Tell me a little more (at least 10 characters).";
    return next;
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setServerError("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  };

  const close = () => {
    onClose();
    // Reset after the exit animation so the next visitor starts fresh.
    setTimeout(() => {
      setStatus("idle");
      setErrors({});
      setServerError("");
    }, 700);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="contact-modal"
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <motion.button
            type="button"
            aria-label="Close"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 cursor-default bg-ink/85"
          />

          <motion.div
            data-lenis-prevent
            initial={{ clipPath: "inset(100% 0% 0% 0% round 24px)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }}
            exit={{ clipPath: "inset(100% 0% 0% 0% round 24px)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="scrollbar-thin relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-alabaster p-6 text-ink sm:rounded-3xl sm:p-10"
          >
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <motion.p
                  custom={-2}
                  variants={item}
                  initial="hidden"
                  animate="visible"
                  className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60"
                >
                  Start a project
                </motion.p>
                <motion.h2
                  id={titleId}
                  custom={-1}
                  variants={item}
                  initial="hidden"
                  animate="visible"
                  className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl"
                >
                  Tell me what you&apos;re building.
                </motion.h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close form"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/30 text-lg transition-[transform,background-color,color] duration-500 ease-out-expo hover:rotate-90 hover:bg-ink hover:text-alabaster"
              >
                ✕
              </button>
            </div>

            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="py-10 text-center"
                  role="status"
                >
                  <svg viewBox="0 0 52 52" className="mx-auto mb-6 h-20 w-20" aria-hidden>
                    <motion.circle
                      cx="26" cy="26" r="24" fill="none" strokeWidth="2" className="stroke-surf"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                    <motion.path
                      d="M15 27 l7 7 l15 -16" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="stroke-ink"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                    />
                  </svg>
                  <p className="font-display text-3xl">Message received.</p>
                  <p className="mx-auto mt-3 max-w-sm text-ink/70">
                    Thanks for reaching out. I&apos;ll get back to you at the email you gave, usually within a day.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-medium text-alabaster transition-colors hover:bg-surf hover:text-ink"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="space-y-7">
                  {/* Honeypot: hidden from people, tempting to bots. */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={update("company")}
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    aria-hidden
                  />

                  <div className="grid gap-7 sm:grid-cols-2">
                    <Field label="Your name" error={errors.name} index={0}>
                      <input
                        ref={firstField}
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={update("name")}
                        aria-invalid={Boolean(errors.name)}
                        placeholder="Jane Doe"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Your email" error={errors.email} index={1}>
                      <input
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={update("email")}
                        aria-invalid={Boolean(errors.email)}
                        placeholder="jane@company.com"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <motion.fieldset custom={2} variants={item} initial="hidden" animate="visible">
                    <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
                      What do you need? <span className="normal-case tracking-normal opacity-70">(optional)</span>
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => {
                        const selected = form.projectType === type;
                        return (
                          <motion.button
                            key={type}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setForm((f) => ({ ...f, projectType: selected ? "" : type }))}
                            whileTap={{ scale: 0.94 }}
                            className={`relative rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                              selected ? "border-ink text-alabaster" : "border-ink/30 hover:border-ink"
                            }`}
                          >
                            {selected && (
                              <motion.span
                                layoutId="project-type"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className="absolute inset-0 rounded-full bg-ink"
                              />
                            )}
                            <span className="relative">{type}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.fieldset>

                  <Field label="Project details" error={errors.message} index={3}>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={update("message")}
                      aria-invalid={Boolean(errors.message)}
                      placeholder="What are you building, what stage is it at, and how can I help?"
                      className={`${inputClass} resize-none`}
                    />
                  </Field>

                  <AnimatePresence>
                    {serverError && (
                      <motion.p
                        role="alert"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="rounded-2xl border border-ink/30 px-4 py-3 text-sm"
                      >
                        {serverError}{" "}
                        <a href={`mailto:${profile.email}`} className="font-medium underline underline-offset-2">
                          {profile.email}
                        </a>
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.div
                    custom={4}
                    variants={item}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap items-center justify-between gap-4 pt-2"
                  >
                    <p className="text-sm text-ink/60">I usually reply within a day.</p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group relative overflow-hidden rounded-full bg-ink px-7 py-4 text-sm font-medium text-alabaster disabled:cursor-wait"
                    >
                      <span className="absolute inset-0 origin-bottom scale-y-0 bg-skin transition-transform duration-500 ease-out-expo group-hover:scale-y-100 group-disabled:scale-y-0" />
                      <span className="relative flex items-center gap-2 transition-colors duration-300 group-hover:text-ink group-disabled:text-alabaster">
                        {status === "sending" ? (
                          <>
                            <motion.span
                              aria-hidden
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                              className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                            />
                            Sending…
                          </>
                        ) : (
                          <>Send message ↗</>
                        )}
                      </span>
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
