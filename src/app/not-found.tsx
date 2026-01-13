import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center pt-16">
            <div className="container-narrow text-center">
                <p className="text-[var(--accent)] text-lg font-medium mb-4">404</p>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
                    Page Not Found
                </h1>
                <p className="text-xl text-[var(--foreground-muted)] mb-8 max-w-md mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/" className="btn btn-primary">
                        Go Home
                    </Link>
                    <Link href="/projects" className="btn btn-secondary">
                        View Projects
                    </Link>
                </div>
            </div>
        </div>
    );
}
