'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { BlogCard } from '@/components';
import { blogPosts, getAllTags } from '@/data/blog';

function BlogContent() {
    const searchParams = useSearchParams();
    const activeTag = searchParams.get('tag');

    const allTags = getAllTags();
    const filteredPosts = activeTag
        ? blogPosts.filter(post => post.tags.includes(activeTag))
        : blogPosts;

    return (
        <div>
            {/* ── Page Hero Banner ── */}
            <div className="page-hero-banner pt-24" style={{
                background: 'linear-gradient(135deg, #0d1f2d 0%, #1a3a4a 35%, #1f0a2d 65%, #2d1a0e 100%)'
            }}>
                {/* Background image overlay */}
                <img 
                    src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop"
                    alt=""
                    aria-hidden="true"
                    className="page-hero-bg-image"
                />
                {/* Noise overlay */}
                <div className="page-hero-noise" />
                {/* Big decorative glyph */}
                <div className="page-hero-glyph" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                {/* Shimmer line */}
                <div className="page-hero-shimmer" />
                <div className="container-main">
                    <div className="page-hero-content">
                        <span className="page-hero-eyebrow">Writing</span>
                        <h1 className="page-hero-title">Technical Blog</h1>
                        <p className="page-hero-subtitle">
                            Deep dives into AI/ML concepts, implementation details, and lessons learned
                            from building data-driven systems.
                        </p>
                        <div className="page-hero-meta">
                            <span>{blogPosts.length} articles</span>
                            <span className="page-hero-dot" />
                            <span>AI · ML · Engineering</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Page Body ── */}
            <div className="pb-16">
                <div className="container-main pt-10">

                    {/* Tags */}
                    <div className="mb-10">
                        <h2 className="text-sm font-medium text-[var(--foreground-subtle)] uppercase tracking-wider mb-4">
                            Browse by Topic
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href="/blog"
                                className={`tag transition-colors ${!activeTag ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10' : 'hover:border-[var(--accent)] hover:text-[var(--accent)]'}`}
                            >
                                All
                            </Link>
                            {allTags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                                    className={`tag transition-colors ${activeTag === tag ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10' : 'hover:border-[var(--accent)] hover:text-[var(--accent)]'}`}
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Active filter indicator */}
                    {activeTag && (
                        <div className="mb-6 flex items-center gap-2">
                            <span className="text-sm text-[var(--foreground-muted)]">
                                Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} tagged
                            </span>
                            <span className="tag border-[var(--accent)] text-[var(--accent)]">
                                {activeTag}
                            </span>
                            <Link
                                href="/blog"
                                className="text-sm text-[var(--foreground-subtle)] hover:text-[var(--accent)] ml-2"
                            >
                                ✕ Clear
                            </Link>
                        </div>
                    )}

                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post, i) => (
                            <BlogCard key={post.id} post={post} index={i} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredPosts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-[var(--foreground-muted)] mb-4">
                                No posts found for this topic.
                            </p>
                            <Link href="/blog" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
                                View all posts →
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default function BlogPage() {
    return (
        <Suspense fallback={
            <div className="pt-24 pb-16">
                <div className="container-main">
                    <div className="text-center py-20 text-[var(--foreground-muted)]">Loading...</div>
                </div>
            </div>
        }>
            <BlogContent />
        </Suspense>
    );
}
