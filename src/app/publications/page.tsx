import { Metadata } from 'next';
import Link from 'next/link';
import { publications } from '@/data/publications';

export const metadata: Metadata = {
    title: 'Publications',
    description: 'Research publications, preprints, and academic papers.',
};

export default function PublicationsPage() {
    const hasPublications = publications.length > 0;

    return (
        <div>
            {/* ── Page Hero Banner ── */}
            <div className="page-hero-banner pt-24" style={{
                background: 'linear-gradient(135deg, #0a1f2d 0%, #0d3545 35%, #183a50 60%, #0a2a3a 100%)'
            }}>
                {/* Background image overlay */}
                <img 
                    src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop"
                    alt=""
                    aria-hidden="true"
                    className="page-hero-bg-image"
                />
                <div className="page-hero-noise" />
                <div className="page-hero-glyph" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                </div>
                <div className="page-hero-shimmer" />
                <div className="container-narrow">
                    <div className="page-hero-content">
                        <span className="page-hero-eyebrow">Research</span>
                        <h1 className="page-hero-title">Publications</h1>
                        <p className="page-hero-subtitle">
                            Research papers, preprints, and academic publications in AI, Machine Learning, and Data Science.
                        </p>
                        <div className="page-hero-meta">
                            <span>{publications.length > 0 ? `${publications.length} paper${publications.length !== 1 ? 's' : ''}` : 'Peer-reviewed work'}</span>
                            <span className="page-hero-dot" />
                            <span>AI · ML · Data Science</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Page Body ── */}
            <div className="pb-16">
                <div className="container-narrow pt-12">

                    {hasPublications ? (
                        <div className="space-y-8">
                            {publications.map((pub) => (
                                <article
                                    key={pub.id}
                                    className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`text-xs font-medium px-2 py-1 rounded ${pub.status === 'published'
                                            ? 'bg-emerald-400/10 text-emerald-400'
                                            : pub.status === 'preprint'
                                                ? 'bg-blue-400/10 text-blue-400'
                                                : pub.status === 'under-review'
                                                    ? 'bg-yellow-400/10 text-yellow-400'
                                                    : 'bg-gray-400/10 text-gray-400'
                                            }`}>
                                            {pub.status.replace('-', ' ').toUpperCase()}
                                        </span>
                                        <span className="text-sm text-[var(--foreground-subtle)]">{pub.year}</span>
                                    </div>

                                    <h2 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-2">
                                        {pub.title}
                                    </h2>

                                    <p className="text-sm text-[var(--foreground-muted)] mb-3">
                                        {pub.authors.join(', ')}
                                    </p>

                                    <p className="text-sm text-[var(--accent)] mb-4">
                                        {pub.venue}
                                    </p>

                                    <p className="text-[var(--foreground-muted)] text-sm mb-4">
                                        {pub.abstract}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {pub.tags.map((tag) => (
                                            <span key={tag} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {pub.paperUrl && (
                                            <a
                                                href={pub.paperUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="pub-btn"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Paper
                                            </a>
                                        )}
                                        {pub.arxivUrl && (
                                            <a
                                                href={pub.arxivUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="pub-btn"
                                            >
                                                arXiv
                                            </a>
                                        )}
                                        {pub.ResearchGateUrl && (
                                            <a
                                                href={pub.ResearchGateUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="pub-btn"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53a9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.213 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z" />
                                                </svg>
                                                ResearchGate
                                            </a>
                                        )}
                                        {pub.codeUrl && (
                                            <a
                                                href={pub.codeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="pub-btn"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                </svg>
                                                Code
                                            </a>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        /* Coming Soon State */
                        <div className="text-center py-20">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--background-secondary)] flex items-center justify-center">
                                <svg className="w-10 h-10 text-[var(--foreground-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-3">
                                Publications Coming Soon
                            </h2>
                            <p className="text-[var(--foreground-muted)] max-w-md mx-auto mb-8">
                                Research papers and preprints will be listed here as they become available.
                                In the meantime, check out my projects to see my research work in action.
                            </p>
                            <Link href="/projects" className="btn btn-primary">
                                View Projects
                            </Link>
                        </div>
                    )}

                    {/* Academic Profiles */}
                    <div className="mt-16 p-8 bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl">
                        <h2 className="font-serif text-xl font-bold text-[var(--foreground)] mb-6 text-center">
                            Academic Profiles
                        </h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a
                                href="https://scholar.google.com/citations?user=Xt1MelQAAAAJ&hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                                </svg>
                                Google Scholar
                            </a>
                            <a
                                href="https://orcid.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 24C5.373 24 0 18.627 0 12 0 5.373 5.373 0 12 0c6.627 0 12 5.373 12 12 0 6.627-5.373 12-12 12zM9.92 18.847c0 .355-.288.643-.643.643H6.55c-.355 0-.643-.288-.643-.643V8.898c0-.355.288-.643.643-.643h2.727c.355 0 .643.288.643.643v9.949zm-1.36-11.38c-.85 0-1.537-.687-1.537-1.537 0-.85.687-1.537 1.537-1.537.85 0 1.537.687 1.537 1.537 0 .85-.687 1.537-1.537 1.537zm6.757 11.38c0 .355-.288.643-.643.643h-2.727c-.355 0-.643-.288-.643-.643V9.873c0-.355.288-.643.643-.643h2.727c.355 0 .643.288.643.643v8.974zm1.905-9.45c0 .355-.288.643-.643.643h-2.727c-.355 0-.643-.288-.643-.643V5.597c0-.355.288-.643.643-.643h2.727c.355 0 .643.288.643.643v3.32z" />
                                </svg>
                                ORCID
                            </a>
                            <a
                                href="https://www.researchgate.net/profile/Syed-Danish-Ali?ev=hdr_xprf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53a9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.213 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z" />
                                </svg>
                                ResearchGate
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
