import { Metadata } from 'next';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
    title: 'About',
    description: siteConfig.about.bio,
};

export default function AboutPage() {
    return (
        <div>
            {/* ── Page Hero Banner ── */}
            <div className="page-hero-banner pt-24" style={{
                background: 'linear-gradient(135deg, #2b1a0e 0%, #4a2c14 35%, #7a3a1a 60%, #3d1f10 100%)'
            }}>
                {/* Background image overlay */}
                <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
                    alt=""
                    aria-hidden="true"
                    className="page-hero-bg-image"
                />
                <div className="page-hero-noise" />
                <div className="page-hero-glyph" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div className="page-hero-shimmer" />
                <div className="container-narrow">
                    <div className="page-hero-content">
                        <span className="page-hero-eyebrow">Identity</span>
                        <h1 className="page-hero-title">About</h1>
                        <p className="page-hero-subtitle">
                            {siteConfig.about.headline}
                        </p>
                        <div className="page-hero-meta">
                            <span>{siteConfig.about.focusAreas.length} focus areas</span>
                            <span className="page-hero-dot" />
                            <span>{siteConfig.about.skills.length} technologies</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Page Body ── */}
            <div className="pb-16">
                <div className="container-narrow pt-12">

                    {/* Bio */}
                    <section className="mb-16">
                        <div className="prose max-w-none">
                            {siteConfig.about.bio.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="text-lg text-[var(--foreground-muted)] mb-4 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </section>

                    {/* Focus Areas */}
                    <section className="mb-16">
                        <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-6">
                            Focus Areas
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {siteConfig.about.focusAreas.map((area, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-4 bg-[var(--background-secondary)] border border-[var(--border)] rounded-lg"
                                >
                                    <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-[var(--foreground)]">{area}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="mb-16">
                        <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-6">
                            Technical Skills
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {siteConfig.about.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-[var(--background-tertiary)] text-[var(--foreground-muted)] rounded-lg border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Contact CTA */}
                    <section className="p-8 bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl text-center">
                        <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-3">
                            Want to work together?
                        </h2>
                        <p className="text-[var(--foreground-muted)] mb-6">
                            I&apos;m open to research collaborations and interesting projects.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href={`mailto:${siteConfig.social.email}`} className="btn btn-primary">
                                Email Me
                            </a>
                            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                LinkedIn
                            </a>
                            <a
                                id="cy-effective-orcid-url"
                                href={siteConfig.social.orcid}
                                target="_blank"
                                rel="me noopener noreferrer"
                                className="btn btn-secondary inline-flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 24C5.373 24 0 18.627 0 12 0 5.373 5.373 0 12 0c6.627 0 12 5.373 12 12 0 6.627-5.373 12-12 12zM9.92 18.847c0 .355-.288.643-.643.643H6.55c-.355 0-.643-.288-.643-.643V8.898c0-.355.288-.643.643-.643h2.727c.355 0 .643.288.643.643v9.949zm-1.36-11.38c-.85 0-1.537-.687-1.537-1.537 0-.85.687-1.537 1.537-1.537.85 0 1.537.687 1.537 1.537 0 .85-.687 1.537-1.537 1.537zm6.757 11.38c0 .355-.288.643-.643.643h-2.727c-.355 0-.643-.288-.643-.643V9.873c0-.355.288-.643.643-.643h2.727c.355 0 .643.288.643.643v8.974zm1.905-9.45c0 .355-.288.643-.643.643h-2.727c-.355 0-.643-.288-.643-.643V5.597c0-.355.288-.643.643-.643h2.727c.355 0 .643.288.643.643v3.32z" />
                                </svg>
                                ORCID
                            </a>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
