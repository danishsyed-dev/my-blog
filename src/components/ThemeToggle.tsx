'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // After mounting, we can safely access document and localStorage
    useEffect(() => {
        setMounted(true);
        const isDarkTheme = document.documentElement.classList.contains('dark');
        setIsDark(isDarkTheme);
    }, []);

    const toggleTheme = () => {
        if (!mounted) return;

        const nextDark = !isDark;
        setIsDark(nextDark);

        if (nextDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    if (!mounted) {
        // Return a placeholder structure with same layout to prevent shifts
        return (
            <div className="w-8 h-8" aria-hidden="true" />
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--background-secondary)] text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
            {isDark ? (
                // Sun Icon (shows in dark mode to switch to light)
                <svg
                    className="w-5 h-5 transition-transform duration-500 rotate-0 hover:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="M4.93 4.93l1.41 1.41" />
                    <path d="M17.66 17.66l1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="M6.34 17.66l-1.41 1.41" />
                    <path d="M19.07 4.93l-1.41 1.41" />
                </svg>
            ) : (
                // Moon Icon (shows in light mode to switch to dark)
                <svg
                    className="w-5 h-5 transition-transform duration-500 rotate-0 hover:-rotate-12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
            )}
        </button>
    );
}
