import Link from 'next/link';
import { Hero, ProjectCard, BlogCard } from '@/components';
import { getFeaturedProjects } from '@/data/projects';
import { getFeaturedPosts } from '@/data/blog';

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const featuredPosts = getFeaturedPosts();

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects Section */}
      <section className="section-padding bg-[var(--background-secondary)]">
        <div className="container-main">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[var(--foreground)]">
                Featured Projects
              </h2>
              <p className="text-[var(--foreground-muted)] mt-2">
                Research and engineering work across ML, NLP, and analytics
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden md:inline-flex btn btn-secondary"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.slice(0, 4).map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant={index === 0 ? 'featured' : 'default'}
              />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/projects" className="btn btn-secondary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Technical Blog Section */}
      <section className="section-padding">
        <div className="container-main">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[var(--foreground)]">
                Technical Blog
              </h2>
              <p className="text-[var(--foreground-muted)] mt-2">
                Deep dives into AI/ML concepts and implementation details
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex btn btn-secondary"
            >
              All Posts
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/blog" className="btn btn-secondary">
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[var(--background-secondary)]">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl font-bold text-[var(--foreground)] mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-[var(--foreground-muted)] mb-8 max-w-lg mx-auto">
            Interested in collaboration, research opportunities, or just want to discuss
            AI/ML topics? I&apos;d love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
            <Link href="/resume" className="btn btn-secondary">
              Download Resume
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
