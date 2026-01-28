import { Metadata } from 'next';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
    title: 'About',
    description: siteConfig.about.bio,
};

export default function AboutPage() {
    return (
        <div className="pt-24 pb-16">
            <div className="container-narrow">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
                        About
                    </h1>
                    <p className="text-xl text-[var(--accent)]">
                        {siteConfig.about.headline}
                    </p>
                </header>

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
                            <img
                                src="https://orcid.org/sites/default/files/images/orcid_16x16.png"
                                style={{ width: '1em' }}
                                alt="ORCID iD icon"
                            />
                            ORCID
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
