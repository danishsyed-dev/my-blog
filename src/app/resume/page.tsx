import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
    title: 'Resume',
    description: 'Download my resume and CV.',
};

export default function ResumePage() {
    return (
        <div className="pt-24 pb-16">
            <div className="container-narrow">
                {/* Header */}
                <header className="mb-12 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
                        Resume
                    </h1>
                    <p className="text-xl text-[var(--foreground-muted)]">
                        Download my latest resume to learn more about my experience and skills.
                    </p>
                </header>

                {/* Resume Preview Card */}
                <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl overflow-hidden">
                    {/* Resume Header */}
                    <div className="p-8 border-b border-[var(--border)]">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h2 className="font-serif text-2xl font-bold text-[var(--foreground)]">
                                    {siteConfig.name}
                                </h2>
                                <p className="text-[var(--accent)] mt-1">{siteConfig.about.headline}</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={siteConfig.resume.downloadUrl}
                                    download
                                    className="btn btn-primary"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download PDF
                                </a>
                                <a
                                    href={siteConfig.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Resume Content Preview */}
                    <div className="p-8 space-y-8">
                        {/* Summary */}
                        <section>
                            <h3 className="font-serif text-lg font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Summary
                            </h3>
                            <p className="text-[var(--foreground-muted)]">
                                {siteConfig.about.bio.split('\n\n')[0]}
                            </p>
                        </section>

                        {/* Focus Areas */}
                        <section>
                            <h3 className="font-serif text-lg font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                Focus Areas
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {siteConfig.about.focusAreas.map((area, index) => (
                                    <li key={index} className="flex items-center gap-2 text-[var(--foreground-muted)]">
                                        <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {area}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Technical Skills */}
                        <section>
                            <h3 className="font-serif text-lg font-semibold text-[var(--foreground)] mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                Technical Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {siteConfig.about.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm bg-[var(--background-tertiary)] text-[var(--foreground-muted)] rounded border border-[var(--border)]"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-[var(--background-tertiary)] border-t border-[var(--border)]">
                        <p className="text-sm text-[var(--foreground-subtle)] text-center">
                            Last updated: {siteConfig.resume.lastUpdated}
                        </p>
                    </div>
                </div>

                {/* Note */}
                <div className="mt-8 p-6 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-xl">
                    <div className="flex items-start gap-4">
                        <svg className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="text-[var(--foreground)] font-medium mb-1">
                                Looking for more details?
                            </p>
                            <p className="text-[var(--foreground-muted)] text-sm">
                                Check out my <Link href="/projects" className="text-[var(--accent)] hover:underline">projects</Link> to see my work in action,
                                or <Link href="/contact" className="text-[var(--accent)] hover:underline">get in touch</Link> to discuss opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
