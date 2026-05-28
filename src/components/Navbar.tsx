'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { siteConfig } from '@/data/site';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Escape listener and focus trapping for mobile menu accessibility
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
                buttonRef.current?.focus();
            }

            if (e.key === 'Tab') {
                if (!menuRef.current || !buttonRef.current) return;

                const focusableElements = [
                    buttonRef.current,
                    ...Array.from(menuRef.current.querySelectorAll('a[href], button:not([disabled])'))
                ] as HTMLElement[];

                if (focusableElements.length === 0) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        // Prevent body scroll when mobile menu is open
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <>
            {/* Mobile menu backdrop overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
                <nav className="container-main">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="font-serif text-xl font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                        >
                            {siteConfig.name}
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <div className="flex items-center gap-8">
                                {siteConfig.navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`nav-link text-sm font-medium ${pathname === link.href ? 'active' : ''
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                            <ThemeToggle />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            ref={buttonRef}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div ref={menuRef} className="md:hidden py-4 border-t border-[var(--border)]">
                            <div className="flex flex-col gap-4">
                                {siteConfig.navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`text-sm font-medium ${pathname === link.href
                                                ? 'text-[var(--accent)]'
                                                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="pt-4 mt-2 border-t border-[var(--border)] flex items-center justify-between">
                                    <span className="text-xs text-[var(--foreground-subtle)] font-medium">Appearance</span>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            </header>
        </>
    );
}
