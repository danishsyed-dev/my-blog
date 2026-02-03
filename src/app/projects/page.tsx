'use client';

import { Suspense, useEffect, useState } from 'react';
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

function ProjectsContent() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        // Read initial category from hash
        const hash = window.location.hash.replace('#category-', '');
        if (hash && categories.some(c => c.id === hash)) {
            setSelectedCategory(hash);
        }

        // Listen for hash changes
        const handleHashChange = () => {
            const newHash = window.location.hash.replace('#category-', '');
            if (newHash && categories.some(c => c.id === newHash)) {
                setSelectedCategory(newHash);
            } else if (!window.location.hash) {
                setSelectedCategory('all');
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId);
        if (categoryId === 'all') {
            // Remove hash for 'all'
            history.pushState(null, '', window.location.pathname);
        } else {
            window.location.hash = `category-${categoryId}`;
        }
    };

    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    return (
        <>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-10">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${selectedCategory === category.id
                            ? 'bg-[var(--accent)]'
                            : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                            }`}
                        style={selectedCategory === category.id ? { color: 'white' } : undefined}
                    >
                        {category.label}
                    </button>
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
        </>
    );
}

function ProjectsLoading() {
    return (
        <>
            {/* Category Filter Skeleton */}
            <div className="flex flex-wrap gap-3 mb-10">
                {categories.map((category) => (
                    <span
                        key={category.id}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)]"
                    >
                        {category.label}
                    </span>
                ))}
            </div>

            {/* Projects Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </>
    );
}

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

                <Suspense fallback={<ProjectsLoading />}>
                    <ProjectsContent />
                </Suspense>

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
