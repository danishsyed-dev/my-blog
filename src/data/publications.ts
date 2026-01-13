export interface Publication {
    id: string;
    title: string;
    authors: string[];
    venue: string;
    year: number;
    abstract: string;
    paperUrl?: string;
    arxivUrl?: string;
    codeUrl?: string;
    status: 'published' | 'preprint' | 'under-review' | 'in-progress';
    tags: string[];
}

export const publications: Publication[] = [
    // Add your publications here as they become available
    // Example structure:
    // {
    //   id: 'hot-topic-detection-2026',
    //   title: 'Real-Time Hot Topic Detection in Streaming Text Data',
    //   authors: ['Danish Syed', 'Collaborator Name'],
    //   venue: 'Conference/Journal Name',
    //   year: 2026,
    //   abstract: 'Abstract text here...',
    //   paperUrl: 'https://...',
    //   arxivUrl: 'https://arxiv.org/abs/...',
    //   codeUrl: 'https://github.com/...',
    //   status: 'published',
    //   tags: ['NLP', 'Streaming Data', 'Topic Modeling']
    // }
];

export const getPublicationsByStatus = (status: Publication['status']): Publication[] => {
    return publications.filter(p => p.status === status);
};

export const getPublicationsByYear = (year: number): Publication[] => {
    return publications.filter(p => p.year === year);
};
