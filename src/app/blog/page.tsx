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
        <div className="pt-24 pb-16">
            <div className="container-main">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
                        Technical Blog
                    </h1>
                    <p className="text-xl text-[var(--foreground-muted)] max-w-2xl">
                        Deep dives into AI/ML concepts, implementation details, and lessons learned
                        from building data-driven systems.
                    </p>
                </header>

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
                    {filteredPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
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
