import Link from 'next/link';
import { BlogPost } from '@/data/blog';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <article className="card group">
            {/* Date and Read Time */}
            <div className="flex items-center justify-between mb-3">
                <time className="text-xs text-[var(--foreground-subtle)]">
                    {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </time>
                <span className="text-xs text-[var(--foreground-subtle)]">
                    {post.readTime}
                </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl font-semibold text-[var(--foreground)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                <Link href={`/blog/${post.id}`}>
                    {post.title}
                </Link>
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-[var(--foreground-muted)] mb-4 line-clamp-3">
                {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 4).map((tag) => (
                    <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="tag hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                        {tag}
                    </Link>
                ))}
            </div>

            {/* Read More */}
            <Link
                href={`/blog/${post.id}`}
                className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium inline-flex items-center gap-1"
            >
                Read Article
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </article>
    );
}
