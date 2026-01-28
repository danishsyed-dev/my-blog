import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { getFeaturedProjects } from '@/data/projects';

export default function Hero() {
    const featuredProjects = getFeaturedProjects();

    return (
        <section className="min-h-screen flex items-center pt-16">
            <div className="container-main py-20">
                <div className="max-w-3xl">
                    {/* Greeting */}
                    <p className="text-[var(--accent)] text-sm font-medium tracking-wide uppercase mb-4 animate-fadeIn">
                        AI & Machine Learning Engineer
                    </p>

                    {/* Name */}
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--foreground)] mb-6 animate-fadeIn stagger-1">
                        {siteConfig.name}
                    </h1>

                    {/* Bio */}
                    <p className="text-xl text-[var(--foreground-muted)] mb-8 leading-relaxed animate-fadeIn stagger-2">
                        Building data-driven systems, intelligent models, and applied research solutions.
                        Focused on predictive modeling, NLP, and end-to-end ML applications.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mb-12 animate-fadeIn stagger-3">
                        <Link href="/projects" className="btn btn-primary">
                            View Projects
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link href="/contact" className="btn btn-secondary">
                            Get in Touch
                        </Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6 animate-fadeIn stagger-4">
                        <a
                            href={siteConfig.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                            aria-label="GitHub"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a
                            href={siteConfig.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a
                            href={siteConfig.social.scholar}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                            aria-label="Google Scholar"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
                            </svg>
                        </a>
                        <a
                            id="cy-effective-orcid-url"
                            href={siteConfig.social.orcid}
                            target="_blank"
                            rel="me noopener noreferrer"
                            className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                            aria-label="ORCID"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 256 256" fill="currentColor">
                                <path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zM86.3 186.2H70.9V79.5h15.4v106.7zm-7.7-121c-5.4 0-9.3-4.2-9.3-9.1 0-5 3.9-9.1 9.3-9.1s9.1 4.1 9.1 9.1c0 4.9-3.7 9.1-9.1 9.1zm92.4 121h-15.4v-54.8c0-14.2-5.1-24-17.8-24-9.7 0-15.5 6.5-18 12.8-.9 2.3-1.2 5.5-1.2 8.7v57.3H104V79.5h15.4v14.7h.2c2.2-3.3 6.2-12.1 22.4-12.1 16.4 0 28.7 10.7 28.7 33.7v70.4z" />
                            </svg>
                        </a>
                        <a
                            href={`mailto:${siteConfig.social.email}`}
                            className="text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                            aria-label="Email"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fadeIn stagger-5">
                    <div className="text-center md:text-left">
                        <p className="text-4xl font-serif font-bold text-[var(--foreground)]">{featuredProjects.length}+</p>
                        <p className="text-sm text-[var(--foreground-muted)] mt-1">Featured Projects</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-4xl font-serif font-bold text-[var(--foreground)]">6+</p>
                        <p className="text-sm text-[var(--foreground-muted)] mt-1">Research Areas</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-4xl font-serif font-bold text-[var(--foreground)]">15+</p>
                        <p className="text-sm text-[var(--foreground-muted)] mt-1">Technologies</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-4xl font-serif font-bold text-[var(--foreground)]">∞</p>
                        <p className="text-sm text-[var(--foreground-muted)] mt-1">Curiosity</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
