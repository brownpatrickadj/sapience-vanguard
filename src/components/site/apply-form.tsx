"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/site/job-card";
import type { JobOpening } from "@/lib/types";

type Status = "idle" | "submitting" | "success" | "error";

function randomToken(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function ApplyForm({ jobs }: { jobs: JobOpening[] }) {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedJob = jobs.find((j) => j.id === selectedJobId) ?? null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim()) {
      setErrorMessage("Name and email are required.");
      return;
    }
    if (!file) {
      setErrorMessage("Please attach your resume (PDF or Word doc, up to 10MB).");
      return;
    }

    setStatus("submitting");
    const supabase = createClient();

    try {
      const safeExt = file.name.split(".").pop()?.toLowerCase() || "pdf";
      const path = `${new Date().toISOString().slice(0, 10)}/${randomToken()}.${safeExt}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(path, file, { contentType: file.type });

      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase.from("sv_applications").insert({
        job_opening_id: selectedJob?.id ?? null,
        position_title: selectedJob?.title ?? "General application",
        applicant_name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        resume_path: path,
        cover_note: coverNote.trim() || null,
      });

      if (insertError) throw insertError;

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        "Something went wrong submitting your application. Please try again in a moment."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-canvas-panel p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-ink">
          Application received
        </h3>
        <p className="mt-2 text-sm text-ink-muted">
          Thanks, {name.split(" ")[0]}. We&apos;ll review your application and
          reach out if it&apos;s a fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {jobs.length > 0 && (
        <div>
          <label className="text-sm font-medium text-ink">
            Which role are you applying for?
          </label>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setSelectedJobId(null)}
              className={`rounded-xl border px-5 py-4 text-left text-sm transition-colors ${
                selectedJobId === null
                  ? "border-accent bg-canvas-raised text-ink"
                  : "border-line bg-canvas-panel text-ink-muted hover:border-line/60"
              }`}
            >
              General application
              <p className="mt-1 text-xs text-ink-faint">
                Don&apos;t see the right fit yet? Apply anyway.
              </p>
            </button>
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                selected={selectedJobId === job.id}
                onSelect={() => setSelectedJobId(job.id)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Full name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-line bg-canvas-panel px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            placeholder="Jordan Rivera"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-lg border border-line bg-canvas-panel px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            placeholder="jordan@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium text-ink">
          Phone <span className="text-ink-faint">(optional)</span>
        </label>
        <input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-2 w-full rounded-lg border border-line bg-canvas-panel px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none sm:max-w-xs"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="resume" className="text-sm font-medium text-ink">
          Resume
        </label>
        <input
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
          className="mt-2 w-full cursor-pointer rounded-lg border border-dashed border-line bg-canvas-panel px-4 py-3 text-sm text-ink-muted file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-medium file:text-accent-ink focus:border-accent focus:outline-none"
        />
        <p className="mt-1.5 text-xs text-ink-faint">PDF or Word doc, up to 10MB.</p>
      </div>

      <div>
        <label htmlFor="cover" className="text-sm font-medium text-ink">
          Anything else we should know? <span className="text-ink-faint">(optional)</span>
        </label>
        <textarea
          id="cover"
          value={coverNote}
          onChange={(e) => setCoverNote(e.target.value)}
          rows={4}
          className="mt-2 w-full resize-none rounded-lg border border-line bg-canvas-panel px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
          placeholder="A quick note, portfolio link, or anything relevant."
        />
      </div>

      {errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit application"}
      </Button>
    </form>
  );
}
