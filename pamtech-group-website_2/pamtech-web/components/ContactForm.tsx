'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { businessLineNav, emails } from '@/lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Contact form — PRD §6.6, backed by Netlify Forms.
 *
 * There is no API route. Submissions POST into /__forms.html, the static
 * declaration Netlify's build-time parser reads to learn the field names
 * (a React-rendered form is not reliably detected on its own). Netlify
 * stores each submission, emails a notification, and runs its own spam
 * filtering — so rate limiting, validation-for-abuse and mail delivery
 * are all handled off our side of the line.
 *
 * The honeypot field is named `bot-field` because that is what the
 * declaration's data-netlify-honeypot attribute points at. Renaming it
 * here without renaming it there silently disables the trap.
 *
 * ⚠️  Adding a field here means adding it to public/__forms.html too,
 * or Netlify drops it from every submission without erroring.
 *
 * Reads ?enquiry=<slug> so the seven business line CTAs ("Book a
 * service", "Request bulk supply") arrive with the right line already
 * selected, rather than dumping people on a blank form and making them
 * re-state what they just clicked.
 */
export default function ContactForm() {
  const params = useSearchParams();
  const enquiry = params.get('enquiry') ?? '';
  const [status, setStatus] = useState<Status>('idle');

  const preselected = businessLineNav.some((l) => l.slug === enquiry)
    ? enquiry
    : '';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;

    try {
      // Netlify expects urlencoded, not multipart or JSON.
      // Built explicitly because FormData values are File | string, and
      // casting that to a string record is a lie the compiler can catch.
      const params = new URLSearchParams();
      new FormData(form).forEach((value, key) => {
        if (typeof value === 'string') params.append(key, value);
      });
      const body = params.toString();

      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!res.ok) throw new Error();

      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-lg bg-subtle p-10 text-center">
        <h3 className="text-2xl font-semibold">Message received</h3>
        <p className="mt-3 text-muted">
          We reply within one working day, Monday to Saturday.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-medium underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="grid gap-5 sm:grid-cols-2"
    >
      {/* Netlify routes the submission by this value. */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot — hidden from people, tempting to bots. Chosen over a
          CAPTCHA, which adds friction for every legitimate visitor and
          loads a third-party script onto a page that should stay light. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="bot-field">Do not fill this in</label>
        <input id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label="Full name" name="name" required autoComplete="name" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />

      <label className="block text-sm">
        <span className="font-medium">Business line</span>
        <select
          name="enquiry"
          defaultValue={preselected}
          className="mt-2 w-full rounded border border-ink/15 bg-surface px-4 py-3 text-base"
        >
          <option value="">General enquiry</option>
          {businessLineNav.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
        </select>
      </label>

      <div className="sm:col-span-2">
        <Field label="Subject" name="subject" />
      </div>

      <label className="block text-sm sm:col-span-2">
        <span className="font-medium">
          Message <span className="text-muted">(required)</span>
        </span>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={5000}
          className="mt-2 w-full rounded border border-ink/15 bg-surface px-4 py-3 text-base"
        />
      </label>

      {status === 'error' && (
        // Says what happened and gives a route through, rather than
        // stranding someone with a message they just typed.
        <p role="alert" className="text-sm text-[#B8442E] sm:col-span-2">
          That did not send. Please try again, or email us directly at{' '}
          <a href={`mailto:${emails.primary}`} className="underline">
            {emails.primary}
          </a>
          .
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full bg-accent px-8 py-4 font-semibold text-ink transition-colors duration-200 ease-brand hover:bg-accent-deep hover:text-white disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium">
        {label} {required && <span className="text-muted">(required)</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded border border-ink/15 bg-surface px-4 py-3 text-base"
      />
    </label>
  );
}
