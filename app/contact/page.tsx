'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/metadata';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  _hp: z.string().max(0, '').optional(),
});

type FormData = z.infer<typeof schema>;
type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (data._hp) return;

    setFormState('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Failed to send message');
      }

      setFormState('success');
      reset();
    } catch (err) {
      setFormState('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const inputClasses = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl bg-surface-2 border text-text-primary placeholder:text-text-muted text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/25 ${
      hasError
        ? 'border-red-500/50 focus:border-red-500/70'
        : 'border-border focus:border-accent'
    }`;

  const contactMethods = [
    {
      label: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      icon: (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      value: 'github.com/sujitmecwan',
      href: siteConfig.github,
      icon: (
        <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/sujitmecwan',
      href: siteConfig.linkedin,
      icon: (
        <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-16 overflow-hidden" aria-labelledby="contact-title">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,255,63,0.06) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-accent block mb-4">
            Get In Touch
          </span>
          <h1
            id="contact-title"
            className="font-display font-bold text-text-primary mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1.05' }}
          >
            Let&apos;s Work Together
          </h1>
          <p className="text-text-secondary text-lg max-w-xl">
            Have a project idea? Want to discuss an opportunity? Or just want to say hi?
            My inbox is always open.
          </p>
        </div>
      </section>

      <section className="pb-24" aria-label="Contact form and info">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-2xl p-10 text-center"
                    role="alert"
                    aria-live="polite"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
                      style={{
                        backgroundColor: 'rgba(212,255,63,0.1)',
                        border: '1px solid rgba(212,255,63,0.25)',
                      }}
                    >
                      <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="font-display font-bold text-2xl text-text-primary mb-2">
                      Message sent!
                    </h2>
                    <p className="text-text-secondary mb-6">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setFormState('idle')}
                      className="text-sm text-accent font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    aria-label="Contact form"
                    className="glass rounded-2xl p-8 space-y-5"
                  >
                    {/* Error banner */}
                    {formState === 'error' && (
                      <div
                        className="rounded-xl px-4 py-3 text-sm"
                        style={{
                          backgroundColor: 'rgba(239,68,68,0.1)',
                          color: '#fca5a5',
                          border: '1px solid rgba(239,68,68,0.2)',
                        }}
                        role="alert"
                        aria-live="assertive"
                      >
                        ⚠ {errorMessage || 'Failed to send. Please try again or email directly.'}
                      </div>
                    )}

                    {/* Honeypot */}
                    <input
                      type="text"
                      aria-hidden="true"
                      tabIndex={-1}
                      autoComplete="off"
                      className="absolute opacity-0 pointer-events-none w-0 h-0"
                      {...register('_hp')}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-semibold text-text-primary mb-1.5">
                          Name <span className="text-accent" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          placeholder="Your name"
                          {...register('name')}
                          className={inputClasses(!!errors.name)}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-xs text-red-400 mt-1" role="alert">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-semibold text-text-primary mb-1.5">
                          Email <span className="text-accent" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          placeholder="your@email.com"
                          {...register('email')}
                          className={inputClasses(!!errors.email)}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-xs text-red-400 mt-1" role="alert">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-semibold text-text-primary mb-1.5">
                        Subject <span className="text-accent" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        placeholder="What's this about?"
                        {...register('subject')}
                        className={inputClasses(!!errors.subject)}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                      />
                      {errors.subject && (
                        <p id="subject-error" className="text-xs text-red-400 mt-1" role="alert">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold text-text-primary mb-1.5">
                        Message <span className="text-accent" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={6}
                        placeholder="Tell me about your project, timeline, and budget…"
                        {...register('message')}
                        className={`${inputClasses(!!errors.message)} resize-none`}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-xs text-red-400 mt-1" role="alert">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      id="contact-submit"
                      disabled={formState === 'loading'}
                      className="btn-primary-gradient w-full py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wider disabled:opacity-60 disabled:cursor-not-allowed"
                      aria-busy={formState === 'loading'}
                    >
                      {formState === 'loading' ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </span>
                      ) : (
                        'Send Message →'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Contact info sidebar */}
            <aside className="lg:col-span-2 space-y-6" aria-label="Contact information">
              {/* Availability */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  <span
                    className="text-xs font-mono uppercase tracking-widest font-semibold"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Available for work
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Currently open to freelance projects, contracts, and full-time opportunities.
                  Response time: within 24 hours.
                </p>
              </div>

              {/* Professional SVG Contact Methods */}
              <div className="glass rounded-2xl p-6 space-y-4">
                <h2 className="font-display font-semibold text-text-primary mb-4 text-base">
                  Other ways to reach me
                </h2>
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3.5 group p-2.5 rounded-xl transition-colors hover:bg-white/[0.03]"
                    aria-label={`${method.label}: ${method.value}`}
                  >
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.08] bg-surface-2 group-hover:border-accent/40 group-hover:bg-accent/10 transition-colors"
                      aria-hidden="true"
                    >
                      {method.icon}
                    </span>
                    <div>
                      <p className="text-[11px] text-text-muted font-mono uppercase tracking-wider">{method.label}</p>
                      <p className="text-text-primary text-sm font-medium group-hover:text-accent transition-colors">
                        {method.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Location with Professional Map Pin SVG */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2.5 mb-2">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs font-mono uppercase tracking-widest text-text-muted">
                    Location
                  </span>
                </div>
                <p className="text-text-primary font-semibold">India</p>
                <p className="text-text-secondary text-xs mt-1">
                  Working remotely worldwide. All time zones welcome.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
