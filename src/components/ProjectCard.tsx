'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
    project: Project;
    variant?: 'default' | 'featured';
    index?: number;
}

const categoryColors: Record<Project['category'], string> = {
    ml: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-400/10 dark:border-emerald-400/30',
    nlp: 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-400/10 dark:border-blue-400/30',
    analytics: 'text-purple-700 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-400/10 dark:border-purple-400/30',
    web: 'text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-400/10 dark:border-orange-400/30',
    research: 'text-pink-700 bg-pink-50 border-pink-200 dark:text-pink-400 dark:bg-pink-400/10 dark:border-pink-400/30',
};

const categoryLabels: Record<Project['category'], string> = {
    ml: 'Machine Learning',
    nlp: 'NLP',
    analytics: 'Analytics',
    web: 'Web Development',
    research: 'Research',
};

// Category-specific glyphs for the background SVG pattern
const categoryGlyphs: Record<Project['category'], string> = {
    ml: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v10m0 0h10m-10 0H5m10 0a2 2 0 002-2v-4m0 0V7m0 6V7m0 0H9',
    nlp: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    analytics: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    web: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    research: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
};

const DEFAULT_GRADIENT = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';

export default function ProjectCard({ project, variant = 'default', index = 0 }: ProjectCardProps) {
    const cardRef = useRef<HTMLElement>(null);
    const isFeatured = variant === 'featured';
    const gradient = project.coverGradient || DEFAULT_GRADIENT;

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('card-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
        );

        observer.observe(card);
        return () => observer.disconnect();
    }, []);

    return (
        <article
            ref={cardRef}
            className={`project-card group relative ${isFeatured ? 'md:col-span-2' : ''}`}
            style={{ '--card-delay': `${index * 80}ms` } as React.CSSProperties}
        >
            {/* Visual Header Strip */}
            <div className="project-card-header" style={{ background: gradient }}>
                {/* Noise overlay */}
                <div className="project-card-noise" />

                {/* Big background glyph */}
                <div className="project-card-glyph" aria-hidden="true">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                        className="project-card-glyph-svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d={categoryGlyphs[project.category]} />
                    </svg>
                </div>

                {/* Shimmer sweep */}
                <div className="project-card-shimmer" />

                {/* Category badge — top left */}
                <div className={`project-card-cat-badge ${categoryColors[project.category]}`}>
                    {categoryLabels[project.category]}
                </div>

                {/* Date — top right */}
                <span className="project-card-date">{project.date}</span>

                {/* Cover image if it exists */}
                {project.image && (
                    <img
                        src={project.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="blog-card-cover-img"
                    />
                )}
            </div>

            {/* Card Body */}
            <div className="project-card-body">
                {/* Title */}
                <h3 className="project-card-title">
                    <Link href={`/projects/${project.id}`} className="project-card-title-link">
                        {project.title}
                    </Link>
                </h3>
                {project.subtitle && (
                    <p className="project-card-subtitle">{project.subtitle}</p>
                )}

                {/* Description */}
                <p className="project-card-desc">{project.description}</p>

                {/* Tools */}
                <div className="project-card-tools">
                    {project.tools.slice(0, 5).map((tool) => (
                        <span key={tool} className="project-card-tool">{tool}</span>
                    ))}
                    {project.tools.length > 5 && (
                        <span className="project-card-tool-more">+{project.tools.length - 5}</span>
                    )}
                </div>

                {/* Footer Links */}
                <div className="project-card-footer">
                    <Link
                        href={`/projects/${project.id}`}
                        className="project-card-detail-link"
                    >
                        View Details
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '13px', height: '13px' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                    </Link>

                    <div className="project-card-external-links">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-card-icon-link"
                                aria-label={`GitHub for ${project.title}`}
                                title="GitHub"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '15px', height: '15px' }}>
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-card-icon-link"
                                aria-label={`Live demo for ${project.title}`}
                                title="Live Demo"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '15px', height: '15px' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                        {project.huggingFaceUrl && (
                            <a
                                href={project.huggingFaceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-card-icon-link"
                                aria-label={`Hugging Face for ${project.title}`}
                                title="Hugging Face"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '15px', height: '15px' }}>
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                                </svg>
                            </a>
                        )}
                        {project.paperUrl && (
                            <a
                                href={project.paperUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-card-icon-link"
                                aria-label={`Paper for ${project.title}`}
                                title="Published Paper"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '15px', height: '15px' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
