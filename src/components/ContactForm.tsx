'use client';

import { useState, useCallback } from 'react';
import { siteConfig } from '@/data/site';

interface FieldErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [copied, setCopied] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validateField = useCallback((name: string, value: string): string | undefined => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return undefined;
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return undefined;
            case 'subject':
                if (!value.trim()) return 'Subject is required';
                if (value.trim().length < 3) return 'Subject must be at least 3 characters';
                return undefined;
            case 'message':
                if (!value.trim()) return 'Message is required';
                if (value.trim().length < 10) return 'Message must be at least 10 characters';
                return undefined;
            default:
                return undefined;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const validateAll = (): boolean => {
        const errors: FieldErrors = {};
        let valid = true;
        for (const [key, value] of Object.entries(formData)) {
            const error = validateField(key, value);
            if (error) {
                errors[key as keyof FieldErrors] = error;
                valid = false;
            }
        }
        setFieldErrors(errors);
        setTouched({ name: true, email: true, subject: true, message: true });
        return valid;
    };

    const handleCopyDetails = async () => {
        const textToCopy = `Subject: ${formData.subject}\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleReset = () => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFieldErrors({});
        setTouched({});
        setStatus('idle');
        setCopied(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateAll()) return;

        setStatus('sending');

        const mailtoLink = `mailto:${siteConfig.social.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
        )}`;

        try {
            window.location.href = mailtoLink;
            setStatus('success');
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = validateField(name, value);
            setFieldErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setFieldErrors(prev => ({ ...prev, [name]: error }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        maxLength={100}
                        className={`input ${touched.name && fieldErrors.name ? 'border-[var(--error)]' : ''}`}
                        placeholder="Your name"
                        aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                        aria-invalid={touched.name && !!fieldErrors.name}
                    />
                    {touched.name && fieldErrors.name && (
                        <p id="name-error" className="mt-1.5 text-xs text-[var(--error)]" role="alert">
                            {fieldErrors.name}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        maxLength={254}
                        className={`input ${touched.email && fieldErrors.email ? 'border-[var(--error)]' : ''}`}
                        placeholder="your@email.com"
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        aria-invalid={touched.email && !!fieldErrors.email}
                    />
                    {touched.email && fieldErrors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-[var(--error)]" role="alert">
                            {fieldErrors.email}
                        </p>
                    )}
                </div>
            </div>

            {/* Subject */}
            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Subject
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    maxLength={200}
                    className={`input ${touched.subject && fieldErrors.subject ? 'border-[var(--error)]' : ''}`}
                    placeholder="Subject of your message"
                    aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
                    aria-invalid={touched.subject && !!fieldErrors.subject}
                />
                {touched.subject && fieldErrors.subject && (
                    <p id="subject-error" className="mt-1.5 text-xs text-[var(--error)]" role="alert">
                        {fieldErrors.subject}
                    </p>
                )}
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Message
                    <span className="text-[var(--foreground-subtle)] font-normal ml-2">
                        ({formData.message.length}/2000)
                    </span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    maxLength={2000}
                    className={`input ${touched.message && fieldErrors.message ? 'border-[var(--error)]' : ''}`}
                    rows={6}
                    placeholder="Describe your inquiry or project idea"
                    aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                    aria-invalid={touched.message && !!fieldErrors.message}
                />
                {touched.message && fieldErrors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-[var(--error)]" role="alert">
                        {fieldErrors.message}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            {status !== 'success' && (
                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn btn-primary w-full md:w-auto"
                >
                    {status === 'sending' ? (
                        <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                        </>
                    ) : (
                        <>
                            Send Message
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </>
                    )}
                </button>
            )}

            {/* Status Messages */}
            {status === 'success' && (
                <div className="p-5 bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-lg space-y-4">
                    <div>
                        <p className="text-sm text-[var(--success)] font-medium mb-1">
                            Email client redirect initiated!
                        </p>
                        <p className="text-xs text-[var(--foreground-muted)]">
                            Your desktop/mobile mail client should have opened with the message pre-filled.
                        </p>
                    </div>

                    <div className="pt-2 border-t border-[var(--border)]">
                        <p className="text-xs text-[var(--foreground-muted)] mb-2 font-medium">
                            If your mail client didn&apos;t open, you can copy the message details below:
                        </p>
                        <button
                            type="button"
                            onClick={handleCopyDetails}
                            className="btn btn-secondary text-xs py-1.5 px-3 w-full flex items-center justify-center gap-2 hover:bg-[var(--background-tertiary)] transition-colors"
                        >
                            {copied ? (
                                <>
                                    <svg className="w-4 h-4 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied to Clipboard!
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                    Copy Message Details
                                </>
                            )}
                        </button>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-[var(--foreground-subtle)]">
                            Direct email: <a href={`mailto:${siteConfig.social.email}`} className="text-[var(--accent)] hover:underline">{siteConfig.social.email}</a>
                        </span>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium hover:underline cursor-pointer"
                        >
                            Write New Message
                        </button>
                    </div>
                </div>
            )}
            {status === 'error' && (
                <div className="p-4 bg-[var(--error)]/10 border border-[var(--error)]/30 rounded-lg">
                    <p className="text-sm text-[var(--error)] font-medium mb-1">
                        Something went wrong.
                    </p>
                    <p className="text-xs text-[var(--foreground-muted)]">
                        Please try again or email me directly at{' '}
                        <a href={`mailto:${siteConfig.social.email}`} className="text-[var(--accent)] hover:underline">
                            {siteConfig.social.email}
                        </a>
                    </p>
                </div>
            )}
        </form>
    );
}
