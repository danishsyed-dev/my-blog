'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { BlogPost } from '@/data/blog';

interface BlogCardProps {
    post: BlogPost;
    index?: number;
}

// Category icon paths (SVG path data)
const tagIconMap: Record<string, string> = {
    'Machine Learning': 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    'NLP': 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
    'Python': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z',
    'Deep Learning': 'M9.5 14.25l-5.584 2.936 1.006-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.457 4.404 1.006 6.218',
    'Default': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
};

function getCardIcon(tags: string[]): string {
    for (const tag of tags) {
        if (tagIconMap[tag]) return tagIconMap[tag];
    }
    return tagIconMap['Default'];
}

// Default gradient for posts without one
const DEFAULT_GRADIENT = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
    const cardRef = useRef<HTMLElement>(null);
    const gradient = post.coverGradient || DEFAULT_GRADIENT;

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Check for reduced motion preference
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
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        observer.observe(card);
        return () => observer.disconnect();
    }, []);

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <article
            ref={cardRef}
            className="blog-card group relative"
            style={{ '--card-delay': `${index * 80}ms` } as React.CSSProperties}
        >
            {/* Visual Header Zone */}
            <div className="blog-card-header" style={{ background: gradient }}>
                {/* Noise texture overlay */}
                <div className="blog-card-noise" />

                {/* Geometric accent SVG */}
                <div className="blog-card-icon-bg" aria-hidden="true">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="1"
                        className="blog-card-icon-svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d={getCardIcon(post.tags)} />
                    </svg>
                </div>

                {/* Shimmer on hover */}
                <div className="blog-card-shimmer" />

                {/* Floating readTime pill */}
                <div className="blog-card-readtime">
                    <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: '10px', height: '10px' }}>
                        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2a5 5 0 110 10A5 5 0 018 3zm.5 2.5a.5.5 0 00-1 0V8a.5.5 0 00.146.354l2 2a.5.5 0 00.708-.708L8.5 7.793V5.5z" />
                    </svg>
                    {post.readTime}
                </div>

                {/* Cover image if it exists */}
                {post.coverImage && (
                    <img
                        src={post.coverImage}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="blog-card-cover-img"
                    />
                )}
            </div>

            {/* Card Body */}
            <div className="blog-card-body">
                {/* Meta row */}
                <div className="blog-card-meta">
                    <time dateTime={post.date}>{formattedDate}</time>
                    {post.featured && (
                        <span className="blog-card-featured-badge">Featured</span>
                    )}
                </div>

                {/* Title */}
                <h3 className="blog-card-title">
                    <Link href={`/blog/${post.id}`} className="blog-card-title-link">
                        {post.title}
                    </Link>
                </h3>

                {/* Excerpt */}
                <p className="blog-card-excerpt">{post.excerpt}</p>

                {/* Tags */}
                <div className="blog-card-tags">
                    {post.tags.slice(0, 3).map((tag) => (
                        <Link
                            key={tag}
                            href={`/blog?tag=${encodeURIComponent(tag)}`}
                            className="blog-card-tag"
                        >
                            {tag}
                        </Link>
                    ))}
                    {post.tags.length > 3 && (
                        <span className="blog-card-tag-more">+{post.tags.length - 3}</span>
                    )}
                </div>

                {/* Footer */}
                <div className="blog-card-footer">
                    <Link href={`/blog/${post.id}`} className="blog-card-read-link" aria-label={`Read ${post.title}`}>
                        Read article
                        <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            style={{ width: '14px', height: '14px' }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                    </Link>

                    {post.githubUrl && (
                        <a
                            href={post.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="blog-card-github-link"
                            aria-label={`GitHub for ${post.title}`}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '15px', height: '15px' }}>
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
