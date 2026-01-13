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
        <div className="pt-24 pb-16">
            <div className="container-narrow">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
                        Publications
                    </h1>
                    <p className="text-xl text-[var(--foreground-muted)]">
                        Research papers, preprints, and academic publications.
                    </p>
                </header>

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
                                            className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] inline-flex items-center gap-1"
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
                                            className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] inline-flex items-center gap-1"
                                        >
                                            arXiv
                                        </a>
                                    )}
                                    {pub.codeUrl && (
                                        <a
                                            href={pub.codeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] inline-flex items-center gap-1"
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
                            href="https://scholar.google.com"
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
                                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
                            </svg>
                            ORCID
                        </a>
                        <a
                            href="https://researchgate.net"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.213 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .078.53h-.005a3.334 3.334 0 0 0 .112.438c.244.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.316-.275.554-.493.717-.218.163-.518.244-.87.244-.297 0-.554-.062-.77-.186a1.433 1.433 0 0 1-.513-.502 2.212 2.212 0 0 1-.262-.755 5.544 5.544 0 0 1-.07-.9V7.87c0-.361.014-.674.043-.935a2.232 2.232 0 0 1 .262-.755c.136-.23.318-.41.53-.54.212-.128.48-.194.8-.194.254 0 .47.06.655.178.186.117.332.27.45.458.115.186.2.395.254.618.053.223.08.453.08.69 0 .094.047.14.14.14h1.302c.094 0 .14-.046.14-.14 0-.413-.047-.814-.14-1.202a3.212 3.212 0 0 0-.48-1.07c-.22-.318-.506-.573-.86-.764-.355-.19-.783-.286-1.285-.286zm-9.793.61c-.61 0-1.12.083-1.53.25a2.093 2.093 0 0 0-.99.713 2.632 2.632 0 0 0-.488 1.07 7.464 7.464 0 0 0-.125 1.368 7.465 7.465 0 0 0 .125 1.37c.078.406.24.752.488 1.068.248.316.58.567.99.712.41.146.92.22 1.53.22h.257c.093 0 .14.046.14.14v.203c0 .328-.015.62-.048.873a2.283 2.283 0 0 1-.204.68 1.08 1.08 0 0 1-.433.456c-.18.11-.43.163-.746.163H5.9c-.093 0-.14.047-.14.14v.974c0 .094.047.14.14.14h2.143c.61 0 1.12-.082 1.53-.248a2.093 2.093 0 0 0 .99-.714c.249-.316.41-.662.489-1.068a7.464 7.464 0 0 0 .125-1.37V2.38c0-.093-.047-.14-.14-.14H9.793zm.257 1.258h.957c.094 0 .14.047.14.14v3.506c0 .094-.046.141-.14.141h-.957c-.32 0-.56-.054-.74-.163a1.074 1.074 0 0 1-.422-.456 2.231 2.231 0 0 1-.203-.68 8.116 8.116 0 0 1-.05-.873c0-.327.017-.618.05-.872.033-.254.1-.482.203-.68a1.08 1.08 0 0 1 .423-.456c.18-.11.42-.163.74-.163z" />
                            </svg>
                            ResearchGate
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
