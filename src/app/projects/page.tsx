'use client';

import { useSearchParams } from 'next/navigation';
import { ProjectCard } from '@/components';
import { projects, Project } from '@/data/projects';

const categories: { id: Project['category'] | 'all'; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'nlp', label: 'NLP' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'web', label: 'Web Development' },
    { id: 'research', label: 'Research' },
];

export default function ProjectsPage() {
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get('category') || 'all';

    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

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

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {categories.map((category) => (
                        <a
                            key={category.id}
                            href={category.id === 'all' ? '/projects' : `/projects?category=${category.id}`}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${selectedCategory === category.id
                                ? 'bg-[var(--accent)]'
                                : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                                }`}
                            style={selectedCategory === category.id ? { color: 'white' } : undefined}
                        >
                            {category.label}
                        </a>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-[var(--foreground-muted)]">No projects found in this category.</p>
                    </div>
                )}

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
