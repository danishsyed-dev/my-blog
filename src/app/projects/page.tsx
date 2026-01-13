import { Metadata } from 'next';
import { ProjectCard } from '@/components';
import { projects, Project } from '@/data/projects';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Research and engineering projects in Machine Learning, NLP, Data Analytics, and Web Development.',
};

const categories: { id: Project['category'] | 'all'; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'nlp', label: 'NLP' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'web', label: 'Web Development' },
    { id: 'research', label: 'Research' },
];

export default function ProjectsPage() {
    return (
        <div className="pt-24 pb-16">
            <div className="container-main">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
                        Projects
                    </h1>
                    <p className="text-xl text-[var(--foreground-muted)] max-w-2xl">
                        A collection of research projects and engineering work spanning machine learning,
                        NLP, data analytics, and web development.
                    </p>
                </header>

                {/* Category Filter (Static for now - can be made interactive with client component) */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {categories.map((category) => (
                        <span
                            key={category.id}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${category.id === 'all'
                                    ? 'bg-[var(--accent)] text-white'
                                    : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                                }`}
                        >
                            {category.label}
                        </span>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {/* Summary Stats */}
                <div className="mt-16 p-8 bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-3xl font-serif font-bold text-[var(--foreground)]">{projects.length}</p>
                            <p className="text-sm text-[var(--foreground-muted)] mt-1">Total Projects</p>
                        </div>
                        <div>
                            <p className="text-3xl font-serif font-bold text-[var(--foreground)]">
                                {projects.filter(p => p.category === 'ml' || p.category === 'nlp').length}
                            </p>
                            <p className="text-sm text-[var(--foreground-muted)] mt-1">ML/NLP Projects</p>
                        </div>
                        <div>
                            <p className="text-3xl font-serif font-bold text-[var(--foreground)]">
                                {new Set(projects.flatMap(p => p.tools)).size}
                            </p>
                            <p className="text-sm text-[var(--foreground-muted)] mt-1">Technologies Used</p>
                        </div>
                        <div>
                            <p className="text-3xl font-serif font-bold text-[var(--foreground)]">
                                {projects.filter(p => p.featured).length}
                            </p>
                            <p className="text-sm text-[var(--foreground-muted)] mt-1">Featured</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
