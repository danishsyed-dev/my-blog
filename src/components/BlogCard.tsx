import Link from 'next/link';
import { BlogPost } from '@/data/blog';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <article className="card group">
            {/* Cover Image */}
            {post.coverImage && (
                <div className="mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-lg">
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            {/* Meta */}
            <div className="flex items-center gap-3 mb-3 text-xs text-[var(--foreground-subtle)]">
                <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                <span>•</span>
                <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-lg font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                <Link href={`/blog/${post.id}`}>
                    {post.title}
                </Link>
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-[var(--foreground-muted)] mb-4 line-clamp-3">
                {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
                {post.tags.slice(0, 3).map((tag) => (
                    <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="text-xs px-2 py-1 bg-[var(--background-tertiary)] text-[var(--foreground-subtle)] rounded hover:text-[var(--accent)] transition-colors"
                    >
                        {tag}
                    </Link>
                ))}
                {post.tags.length > 3 && (
                    <span className="text-xs px-2 py-1 text-[var(--foreground-subtle)]">
                        +{post.tags.length - 3}
                    </span>
                )}
            </div>
        </article>
    );
}
