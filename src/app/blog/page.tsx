import { Metadata } from 'next';
import { BlogCard } from '@/components';
import { blogPosts, getAllTags } from '@/data/blog';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Technical articles on Machine Learning, NLP, Data Science, and software engineering.',
};

export default function BlogPage() {
    const allTags = getAllTags();

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
                        {allTags.map((tag) => (
                            <span
                                key={tag}
                                className="tag hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {/* Empty State (if no posts) */}
                {blogPosts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-[var(--foreground-muted)]">
                            No blog posts yet. Check back soon!
                        </p>
                    </div>
                )}

                {/* Newsletter CTA */}
                <div className="mt-16 p-8 bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl text-center">
                    <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-3">
                        Stay Updated
                    </h2>
                    <p className="text-[var(--foreground-muted)] mb-6 max-w-md mx-auto">
                        Get notified when I publish new articles about AI, ML, and data science.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="input flex-1"
                        />
                        <button className="btn btn-primary whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
