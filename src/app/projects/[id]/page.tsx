import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProjectById } from '@/data/projects';

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const project = getProjectById(resolvedParams.id);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: project.title,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const resolvedParams = await params;
    const project = getProjectById(resolvedParams.id);

    if (!project) {
        notFound();
    }

    const categoryColors: Record<string, string> = {
        ml: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
        nlp: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
        analytics: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
        web: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
        research: 'text-pink-400 border-pink-400/30 bg-pink-400/10',
    };

    const categoryLabels: Record<string, string> = {
        ml: 'Machine Learning',
        nlp: 'NLP',
        analytics: 'Analytics',
        web: 'Web Development',
        research: 'Research',
    };

    return (
        <div className="pt-24 pb-16">
            <div className="container-narrow">
                {/* Back Link */}
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors mb-8"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Projects
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <span className={`tag ${categoryColors[project.category]}`}>
                            {categoryLabels[project.category]}
                        </span>
                        <span className="text-sm text-[var(--foreground-subtle)]">{project.date}</span>
                    </div>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                        {project.title}
                    </h1>
                    <p className="text-lg text-[var(--foreground-muted)]">
                        {project.description}
                    </p>
                </header>

                {/* Links */}
                <div className="flex flex-wrap gap-4 mb-12 pb-12 border-b border-[var(--border)]">
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        View on GitHub
                    </a>
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Demo
                        </a>
                    )}
                    {project.datasetUrl && (
                        <a
                            href={project.datasetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                            </svg>
                            Dataset
                        </a>
                    )}
                    {project.paperUrl && (
                        <a
                            href={project.paperUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Paper
                        </a>
                    )}
                </div>

                {/* Problem Statement */}
                <section className="mb-10">
                    <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-4">
                        Problem Statement
                    </h2>
                    <p className="text-[var(--foreground-muted)] leading-relaxed">
                        {project.problemStatement}
                    </p>
                </section>

                {/* Methodology */}
                <section className="mb-10">
                    <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-4">
                        Methodology
                    </h2>
                    <p className="text-[var(--foreground-muted)] leading-relaxed">
                        {project.methodology}
                    </p>
                </section>

                {/* Results */}
                <section className="mb-10">
                    <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-4">
                        Results
                    </h2>
                    <p className="text-[var(--foreground-muted)] leading-relaxed">
                        {project.results}
                    </p>
                </section>

                {/* Tools & Technologies */}
                <section className="mb-12">
                    <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-4">
                        Tools & Technologies
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {project.tools.map((tool) => (
                            <span
                                key={tool}
                                className="px-4 py-2 bg-[var(--background-tertiary)] text-[var(--foreground-muted)] rounded-lg border border-[var(--border)]"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Navigation */}
                <div className="pt-8 border-t border-[var(--border)]">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        View All Projects
                    </Link>
                </div>
            </div>
        </div>
    );
}
