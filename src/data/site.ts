export const siteConfig = {
    name: 'SYED DANISH ALI',
    title: 'SYED DANISH ALI | AI & ML Engineer',
    description: 'AI & Machine Learning engineer focused on building data-driven systems, intelligent models, and applied research solutions.',
    url: 'https://syeddanishali.me/my-blog', // Update with your actual domain
    ogImage: '/og-image.png',

    // Navigation Links
    navLinks: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Blog', href: '/blog' },
        { name: 'Publications', href: '/publications' },
        { name: 'Resume', href: '/resume' },
        { name: 'Contact', href: '/contact' },
    ],

    // Social Links
    social: {
        github: 'https://github.com/danishsyed-dev',
        linkedin: 'https://linkedin.com/in/danishsyed',
        scholar: 'https://scholar.google.com/citations?user=YOUR_ID', // Update with your ID
        email: 'contact@danishsyed.dev', // Update with your email
    },

    // About Section Content
    about: {
        headline: 'AI & Machine Learning Engineer',
        bio: `AI & Machine Learning engineer focused on building data-driven systems, intelligent models, and applied research solutions.

My work spans predictive modeling, NLP systems, analytics pipelines, and full-stack ML applications.

I develop end-to-end solutions from data preprocessing and modeling to evaluation, visualization, and deployment.`,

        focusAreas: [
            'Machine Learning & Deep Learning',
            'NLP & Text Mining',
            'Data Science & Analytics',
            'Model Evaluation & Optimization',
        ],

        skills: [
            'Python',
            'FastAPI',
            'Scikit-learn',
            'Pandas',
            'NumPy',
            'XGBoost',
            'TensorFlow',
            'PyTorch',
            'LangChain',
            'NLTK',
            'Matplotlib',
            'Seaborn',
            'SQL',
            'Git',
            'Docker',
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
        ],
    },

    // Resume
    resume: {
        downloadUrl: '/resume.pdf', // Add your resume PDF to public folder
        lastUpdated: 'January 2026',
    },

    // SEO Keywords
    keywords: [
        'AI Engineer',
        'Machine Learning',
        'Data Science',
        'NLP',
        'Python Developer',
        'Research Engineer',
        'Deep Learning',
        'Analytics',
    ],
};

export type SiteConfig = typeof siteConfig;
