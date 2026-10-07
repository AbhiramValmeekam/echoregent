import { useState, type FormEvent } from 'react';
import { enterprise } from '@/lib/content/enterprise';
import { mail, SUBJECTS, site } from '@/lib/content/site';

/**
 * The enterprise contact form.
 *
 * The live page posts this to `/demo/request-key`. There is no endpoint here,
 * and a form that silently discards what you typed is worse than no form at
 * all — so the fields, the labels and the volume brackets are the live site's,
 * and the submission composes the same content into an email instead.
 *
 * It is a real `<form>` with `required` fields: the browser does the validation
 * it already knows how to do, and the button stays a submit button so Enter
 * works from any field.
 */
const EMPTY = { name: '', email: '', company: '', volume: enterprise.contact.volumes[0], useCase: '' };

export function ContactForm() {
  const [values, setValues] = useState<Record<string, string>>({ ...EMPTY });
  const [sent, setSent] = useState(false);

  const set = (id: string) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [id]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${values.name}`,
      `Work email: ${values.email}`,
      `Company & role: ${values.company || '—'}`,
      `Estimated monthly API calls: ${values.volume}`,
      '',
      'Use case:',
      values.useCase,
    ].join('\n');

    window.location.href = `${mail(SUBJECTS.enterprise)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    'mt-2 w-full border-b border-ink/25 bg-transparent pb-2.5 text-[15px] text-ink outline-none transition-colors duration-300 placeholder:text-ink/70 focus:border-signal';
  const label = 'font-mono text-[10px] uppercase tracking-[0.16em] text-hush';

  return (
    <form onSubmit={onSubmit} className="mt-10 max-w-[46rem]">
      <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
        {enterprise.contact.fields.map((f) => {
          const id = `ent-${f.id}`;
          const common = {
            id,
            name: f.id,
            required: f.required,
            value: values[f.id],
            onChange: set(f.id),
            className: field,
          };

          if (f.type === 'textarea') {
            return (
              <div key={f.id} className="sm:col-span-2">
                <label className={label} htmlFor={id}>
                  {f.label}
                </label>
                <textarea {...common} rows={4} placeholder={f.placeholder} />
              </div>
            );
          }

          if (f.type === 'select') {
            return (
              <div key={f.id}>
                <label className={label} htmlFor={id}>
                  {f.label}
                </label>
                <select {...common}>
                  {enterprise.contact.volumes.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          return (
            <div key={f.id}>
              <label className={label} htmlFor={id}>
                {f.label}
              </label>
              <input {...common} type={f.type} placeholder={f.placeholder} />
            </div>
          );
        })}
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button type="submit" className="btn">
          {enterprise.contact.submit}
          <span aria-hidden="true">→</span>
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-hush">
          {enterprise.contact.direct}{' '}
          <a href={mail(SUBJECTS.enterprise)} className="link-underline text-ink">
            {site.contactEmail}
          </a>
        </p>
      </div>

      {/* The form hands off to the reader's mail client; say so, rather than
          leaving them to wonder whether anything was sent. */}
      <p aria-live="polite" className="mt-5 min-h-[1.25rem] text-[13px] leading-relaxed text-ink/70">
        {sent
          ? 'Your mail client should be opening with the details filled in. If it did not, email us directly at ' +
            site.contactEmail +
            '.'
          : ''}
      </p>
    </form>
  );
}
