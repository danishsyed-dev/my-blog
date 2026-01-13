import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getPostById } from '@/data/blog';

interface BlogPostPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.id,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const post = getPostById(resolvedParams.id);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const resolvedParams = await params;
    const post = getPostById(resolvedParams.id);

    if (!post) {
        notFound();
    }

    // Simple markdown-like rendering
    const renderContent = (content: string) => {
        const lines = content.split('\n');
        const elements: React.ReactNode[] = [];
        let currentList: string[] = [];
        let listType: 'ul' | 'ol' | null = null;
        let keyCounter = 0;

        const flushList = () => {
            if (currentList.length > 0 && listType) {
                const ListTag = listType;
                const listKey = `list-${keyCounter++}`;
                elements.push(
                    <ListTag key={listKey} className="mb-4 pl-6 space-y-2">
                        {currentList.map((item, i) => (
                            <li key={i} className="text-[var(--foreground-muted)]">{item}</li>
                        ))}
                    </ListTag>
                );
                currentList = [];
                listType = null;
            }
        };

        lines.forEach((line) => {
            const trimmedLine = line.trim();

            // Headers
            if (trimmedLine.startsWith('## ')) {
                flushList();
                elements.push(
                    <h2 key={`h2-${keyCounter++}`} className="font-serif text-2xl font-bold text-[var(--foreground)] mt-8 mb-4">
                        {trimmedLine.slice(3)}
                    </h2>
                );
            } else if (trimmedLine.startsWith('### ')) {
                flushList();
                elements.push(
                    <h3 key={`h3-${keyCounter++}`} className="font-serif text-xl font-bold text-[var(--foreground)] mt-6 mb-3">
                        {trimmedLine.slice(4)}
                    </h3>
                );
            }
            // List items
            else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
                if (listType !== 'ul') {
                    flushList();
                    listType = 'ul';
                }
                currentList.push(trimmedLine.slice(2));
            }
            else if (/^\d+\. /.test(trimmedLine)) {
                if (listType !== 'ol') {
                    flushList();
                    listType = 'ol';
                }
                currentList.push(trimmedLine.replace(/^\d+\. /, ''));
            }
            // Code blocks
            else if (trimmedLine.startsWith('```')) {
                flushList();
                // Skip code block markers for now
            }
            // Bold text in paragraphs
            else if (trimmedLine.length > 0) {
                flushList();
                const processedLine = trimmedLine
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--foreground)]">$1</strong>')
                    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-[var(--background-tertiary)] text-[var(--accent)] rounded text-sm">$1</code>');

                elements.push(
                    <p
                        key={`p-${keyCounter++}`}
                        className="text-[var(--foreground-muted)] leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{ __html: processedLine }}
                    />
                );
            }
        });

        flushList();
        return elements;
    };

    return (
        <div className="pt-24 pb-16">
            <article className="container-narrow">
                {/* Back Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors mb-8"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4 text-sm text-[var(--foreground-subtle)]">
                        <time>
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <Link
                                key={tag}
                                href={`/blog?tag=${encodeURIComponent(tag)}`}
                                className="tag hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </header>

                {/* Content */}
                <div className="prose max-w-none">
                    {renderContent(post.content)}
                </div>

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t border-[var(--border)]">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent-hover)] font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            More Articles
                        </Link>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-[var(--foreground-subtle)]">Share:</span>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://danishsyed.dev/blog/${post.id}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--foreground-muted)] hover:text-[var(--accent)]"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://danishsyed.dev/blog/${post.id}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--foreground-muted)] hover:text-[var(--accent)]"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </footer>
            </article>
        </div>
    );
}
