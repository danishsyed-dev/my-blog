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

    // Process inline formatting (bold, italic, inline code)
    const processInline = (text: string): string => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--foreground)]">$1</strong>')
            .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>')
            .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-6 w-full" />')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] hover:text-[var(--accent-hover)] underline underline-offset-2">$1</a>');
    };

    // Full markdown-like rendering
    const renderContent = (content: string) => {
        const lines = content.split('\n');
        const elements: React.ReactNode[] = [];
        let currentList: string[] = [];
        let listType: 'ul' | 'ol' | null = null;
        let keyCounter = 0;

        // Code block state
        let inCodeBlock = false;
        let codeBlockLang = '';
        let codeBlockLines: string[] = [];

        // Table state
        let tableRows: string[][] = [];
        let inTable = false;

        const flushList = () => {
            if (currentList.length > 0 && listType) {
                const ListTag = listType;
                const listKey = `list-${keyCounter++}`;
                elements.push(
                    <ListTag key={listKey} className={`mb-4 pl-6 space-y-2 ${listType === 'ol' ? 'list-decimal' : 'list-disc'}`}>
                        {currentList.map((item, i) => (
                            <li
                                key={i}
                                className="text-[var(--foreground-muted)]"
                                dangerouslySetInnerHTML={{ __html: processInline(item) }}
                            />
                        ))}
                    </ListTag>
                );
                currentList = [];
                listType = null;
            }
        };

        const flushTable = () => {
            if (tableRows.length > 0) {
                const headerRow = tableRows[0];
                const bodyRows = tableRows.slice(1);
                elements.push(
                    <div key={`table-${keyCounter++}`} className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    {headerRow.map((cell, i) => (
                                        <th key={i} dangerouslySetInnerHTML={{ __html: processInline(cell.trim()) }} />
                                    ))}
                                </tr>
                            </thead>
                            {bodyRows.length > 0 && (
                                <tbody>
                                    {bodyRows.map((row, ri) => (
                                        <tr key={ri}>
                                            {row.map((cell, ci) => (
                                                <td key={ci} dangerouslySetInnerHTML={{ __html: processInline(cell.trim()) }} />
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                );
                tableRows = [];
                inTable = false;
            }
        };

        const flushCodeBlock = () => {
            if (codeBlockLines.length > 0 || codeBlockLang) {
                elements.push(
                    <div key={`code-${keyCounter++}`} className="code-block">
                        {codeBlockLang && (
                            <div className="code-block-header">
                                {codeBlockLang}
                            </div>
                        )}
                        <pre>
                            <code>{codeBlockLines.join('\n')}</code>
                        </pre>
                    </div>
                );
                codeBlockLines = [];
                codeBlockLang = '';
            }
        };

        lines.forEach((line) => {
            const trimmedLine = line.trim();

            // --- Code block handling ---
            if (trimmedLine.startsWith('```') || trimmedLine.startsWith('\\`\\`\\`')) {
                const cleanLine = trimmedLine.replace(/\\`/g, '`');
                if (!inCodeBlock) {
                    // Opening fence
                    flushList();
                    flushTable();
                    inCodeBlock = true;
                    const lang = cleanLine.slice(3).trim();
                    codeBlockLang = lang || '';
                    codeBlockLines = [];
                } else {
                    // Closing fence
                    inCodeBlock = false;
                    flushCodeBlock();
                }
                return;
            }

            if (inCodeBlock) {
                // Unescape backtick sequences inside code blocks
                codeBlockLines.push(line.replace(/\\`/g, '`'));
                return;
            }

            // --- Table handling ---
            if (trimmedLine.includes('\t') && !trimmedLine.startsWith('#')) {
                // Tab-separated table row (used in Dynamic Pricing post)
                flushList();
                if (!inTable) {
                    inTable = true;
                    tableRows = [];
                }
                tableRows.push(trimmedLine.split('\t'));
                return;
            }

            if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
                // Pipe-delimited table row
                flushList();
                // Skip separator rows like |---|---|
                if (/^\|[\s\-:|]+\|$/.test(trimmedLine)) {
                    return;
                }
                if (!inTable) {
                    inTable = true;
                    tableRows = [];
                }
                const cells = trimmedLine.slice(1, -1).split('|');
                tableRows.push(cells);
                return;
            }

            // If we were in a table and hit a non-table line, flush
            if (inTable) {
                flushTable();
            }

            // --- Headers ---
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
            // --- Horizontal rule ---
            else if (/^[-*_]{3,}$/.test(trimmedLine)) {
                flushList();
                elements.push(
                    <hr key={`hr-${keyCounter++}`} className="my-8 border-t border-[var(--border)]" />
                );
            }
            // --- List items ---
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
            // --- Image (standalone line) ---
            else if (/^!\[([^\]]*)\]\(([^)]+)\)$/.test(trimmedLine)) {
                flushList();
                const match = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                if (match) {
                    elements.push(
                        <figure key={`img-${keyCounter++}`} className="my-8">
                            <img src={match[2]} alt={match[1]} className="rounded-lg w-full" />
                            {match[1] && (
                                <figcaption className="text-center text-sm text-[var(--foreground-subtle)] mt-3">
                                    {match[1]}
                                </figcaption>
                            )}
                        </figure>
                    );
                }
            }
            // --- Paragraphs ---
            else if (trimmedLine.length > 0) {
                flushList();
                elements.push(
                    <p
                        key={`p-${keyCounter++}`}
                        className="text-[var(--foreground-muted)] leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{ __html: processInline(trimmedLine) }}
                    />
                );
            }
        });

        flushList();
        flushTable();
        if (inCodeBlock) flushCodeBlock();
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

                {/* Cover Image */}
                {post.coverImage && (
                    <div className="mb-8 rounded-xl overflow-hidden border border-[var(--border)]">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

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
                    <div className="flex flex-wrap gap-2 mb-6">
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

                    {/* Action Buttons */}
                    {(post.githubUrl || post.liveUrl) && (
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--border)]">
                            {post.githubUrl && (
                                <a
                                    href={post.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                    View on GitHub
                                </a>
                            )}
                            {post.liveUrl && (
                                <a
                                    href={post.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary text-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Live Demo
                                </a>
                            )}
                        </div>
                    )}
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
