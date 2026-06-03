import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { getFeaturedProjects } from '@/data/projects';

export default function Hero() {
    const featuredProjects = getFeaturedProjects();

    return (
        <section className="min-h-screen flex items-center pt-16 page-hero-banner" style={{
            background: 'linear-gradient(135deg, #0d121f 0%, #151a30 35%, #252b48 65%, #080c16 100%)',
            paddingBottom: '5rem'
        }}>
            {/* Background image overlay */}
            <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop"
                alt=""
                aria-hidden="true"
                className="page-hero-bg-image"
                style={{ opacity: 0.05 }}
            />
            <div className="page-hero-noise" />
            <div className="page-hero-glyph" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            </div>
            <div className="page-hero-shimmer" />
            <div className="container-main py-20 relative z-10">
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
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 24C5.373 24 0 18.627 0 12 0 5.373 5.373 0 12 0c6.627 0 12 5.373 12 12 0 6.627-5.373 12-12 12zM9.92 18.847c0 .355-.288.643-.643.643H6.55c-.355 0-.643-.288-.643-.643V8.898c0-.355.288-.643.643-.643h2.727c.355 0 .643.288.643.643v9.949zm-1.36-11.38c-.85 0-1.537-.687-1.537-1.537 0-.85.687-1.537 1.537-1.537.85 0 1.537.687 1.537 1.537 0 .85-.687 1.537-1.537 1.537zm6.757 11.38c0 .355-.288.643-.643.643h-2.727c-.355 0-.643-.288-.643-.643V9.873c0-.355.288-.643.643-.643h2.727c.355 0 .643.288.643.643v8.974zm1.905-9.45c0 .355-.288.643-.643.643h-2.727c-.355 0-.643-.288-.643-.643V5.597c0-.355.288-.643.643-.643h2.727c.355 0 .643.288.643.643v3.32z" />
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
                        <p className="text-4xl font-serif font-bold text-[var(--foreground)]">5+</p>
                        <p className="text-sm text-[var(--foreground-muted)] mt-1">Publications</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
