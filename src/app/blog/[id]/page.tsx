import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getPostById } from '@/data/blog';
import { siteConfig } from '@/data/site';
import { CopyButton, FloatingActions, SafeHeroImage } from '@/components';

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

    const currentIndex = blogPosts.findIndex((p) => p.id === post.id);
    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

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
        const getHeaderIcon = (text: string) => {
            const lower = text.toLowerCase();
            if (lower.includes('introduction') || lower.includes('inspiration')) {
                return (
                    <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                );
            }
            if (lower.includes('problem') || lower.includes('challenge') || lower.includes('disclaimer') || lower.includes('roadblock')) {
                return (
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                );
            }
            if (lower.includes('solution') || lower.includes('conclusion') || lower.includes('takeaway') || lower.includes('lessons learned') || lower.includes('result')) {
                return (
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            }
            if (lower.includes('feature') || lower.includes('highlight')) {
                return (
                    <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                );
            }
            if (lower.includes('architecture') || lower.includes('structure') || lower.includes('flow')) {
                return (
                    <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                );
            }
            if (lower.includes('stack') || lower.includes('technology') || lower.includes('model') || lower.includes('engineering') || lower.includes('evaluated')) {
                return (
                    <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 01-6 0z" />
                    </svg>
                );
            }
            if (lower.includes('quick start') || lower.includes('install') || lower.includes('usage') || lower.includes('step-by-step') || lower.includes('run')) {
                return (
                    <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                );
            }
            return (
                <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            );
        };

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
                const codeText = codeBlockLines.join('\n');
                elements.push(
                    <div key={`code-${keyCounter++}`} className="code-block">
                        <div className="code-block-header flex justify-between items-center">
                            <span>{codeBlockLang || 'code'}</span>
                            <CopyButton text={codeText} />
                        </div>
                        <pre>
                            <code>{codeText}</code>
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
                const cleanText = trimmedLine.slice(3)
                    .replace(/[\uD800-\uDBFF\uDC00-\uDFFF]/g, '')
                    .replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '')
                    .trim();
                const lastElement = elements[elements.length - 1];
                const wasHr = lastElement && (lastElement as any).type === 'hr';
                if (elements.length > 0 && !wasHr) {
                    elements.push(
                        <hr key={`hr-pre-h2-${keyCounter++}`} className="my-8 border-t border-[var(--border)]" />
                    );
                }
                elements.push(
                    <h2 key={`h2-${keyCounter++}`} className="font-serif text-2xl font-bold text-[var(--foreground)] mt-8 mb-4 flex items-center gap-3">
                        {getHeaderIcon(cleanText)}
                        <span>{cleanText}</span>
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
        <div>
            {/* ── Page Hero Banner ── */}
            <div className="page-hero-banner pt-24" style={{
                background: post.coverGradient || 'linear-gradient(135deg, #0d1f2d 0%, #1a3a4a 35%, #1f0a2d 65%, #2d1a0e 100%)'
            }}>
                {/* Background image overlay */}
                {post.coverImage && (
                    <SafeHeroImage 
                        src={post.coverImage}
                        className="page-hero-bg-image opacity-[0.06]"
                    />
                )}
                <div className="page-hero-noise" />
                <div className="container-narrow">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-[var(--accent)] transition-colors mb-8 relative z-10"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>

                    <div className="page-hero-content">
                        <div className="flex items-center gap-4 mb-4 text-xs font-semibold tracking-wider text-white/50">
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

                        <h1 className="page-hero-title !text-3xl md:!text-4xl lg:!text-5xl mb-6">
                            {post.title}
                        </h1>

                        <p className="page-hero-subtitle !max-w-none mb-6">
                            {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                                    className="tag border border-white/15 text-white/80 bg-white/5 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        {(post.githubUrl || post.liveUrl) && (
                            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
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
                                        className="btn btn-secondary text-sm border border-white/20 text-white"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Page Body ── */}
            <div className="pb-16 pt-12">
                <article className="container-narrow">


                {/* Content */}
                <div className="prose max-w-none">
                    {renderContent(post.content)}
                </div>

                {/* 💬 What do you think? */}
                <hr className="my-8 border-t border-[var(--border)]" />
                <div className="p-8 bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent)] border-opacity-40 rounded-xl transition-all duration-300 relative overflow-hidden group">
                    <h3 className="font-serif text-xl font-bold text-[var(--foreground)] mb-3 flex items-center gap-2.5">
                        <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        What do you think?
                    </h3>
                    <p className="text-[var(--foreground-muted)] text-sm mb-0">
                        Would you build a project like this? If you have questions about the models, tech stack, or implementation details, drop an issue on GitHub or get in touch on the contact page!
                    </p>
                </div>

                {/* 👤 About the Author */}
                <hr className="my-8 border-t border-[var(--border)]" />
                <div className="p-8 bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent)] border-opacity-40 rounded-xl transition-all duration-300 relative overflow-hidden group">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div 
                            className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border text-[var(--accent)]"
                            style={{
                                backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                                borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)'
                            }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-serif text-xl font-bold text-[var(--foreground)] mb-2">
                                About the Author
                            </h3>
                            <p className="text-[var(--foreground-muted)] text-sm mb-4 leading-relaxed">
                                <strong className="text-[var(--foreground)]">{siteConfig.name}</strong> is an AI & ML Engineer specializing in building data-driven systems, intelligent models, and applied research solutions.
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <span className="text-xs text-[var(--foreground-subtle)] flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                    Open to freelance projects, full-time engineering roles, and AI/ML collaborations.
                                </span>
                                <a
                                    href={siteConfig.resume.downloadUrl}
                                    className="btn btn-secondary !text-xs !py-1.5 !px-3 inline-flex items-center gap-1.5 self-start sm:self-auto"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download CV
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Navigation Links (Next/Prev) ── */}
                {(prevPost || nextPost) && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {prevPost && (
                            <Link
                                href={`/blog/${prevPost.id}`}
                                className={`p-6 bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent)] rounded-xl transition-all group flex flex-col items-start text-left ${
                                    !nextPost ? 'col-span-full' : ''
                                }`}
                            >
                                <span className="text-xs text-[var(--foreground-subtle)] mb-2 flex items-center gap-1.5 font-medium">
                                    <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Previous Article
                                </span>
                                <span className="font-serif font-bold text-base text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                                    {prevPost.title}
                                </span>
                            </Link>
                        )}
                        {nextPost && (
                            <Link
                                href={`/blog/${nextPost.id}`}
                                className={`p-6 bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent)] rounded-xl transition-all group flex flex-col ${
                                    !prevPost ? 'col-span-full items-start text-left' : 'items-end text-right'
                                }`}
                            >
                                <span className="text-xs text-[var(--foreground-subtle)] mb-2 flex items-center gap-1.5 font-medium">
                                    Next Article
                                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                                <span className="font-serif font-bold text-base text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                                    {nextPost.title}
                                </span>
                            </Link>
                        )}
                    </div>
                )}

                {/* Floating Actions Capsule */}
                <FloatingActions githubUrl={post.githubUrl} liveUrl={post.liveUrl} />

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
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteConfig.url}/blog/${post.id}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--foreground-muted)] hover:text-[var(--accent)]"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteConfig.url}/blog/${post.id}`)}`}
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
    </div>
    );
}
