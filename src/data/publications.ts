export interface Publication {
    id: string;
    title: string;
    authors: string[];
    venue: string;
    year: number;
    abstract: string;
    paperUrl?: string;
    ResearchGateUrl?: string;
    arxivUrl?: string;
    codeUrl?: string;
    status: 'published' | 'preprint' | 'under-review' | 'in-progress';
    tags: string[];
}

export const publications: Publication[] = [
    // Add your publications here as they become available
    // Example structure:
    {
        id: 'Scrutinzing-ML-models-for-cancer-prediction',
        title: 'Scrutinzing ML models for cancer prediction',
        authors: ['Syed Danish Ali', 'Mohd Ayman Riaz', 'Syed Abdul Ahmed'],
        venue: 'International Journal of Information Technology and Computer Engineering',
        year: 2025,
        abstract: 'A disease known as "Cancer" develops when cells genes undergo alterations that cause them to proliferate uncontrollably; this, in turn, causes tumors to grow, which invade and harm healthy bodily components.In lung cancer, the diseased cells in the lungs proliferate at an alarming pace.Using contemporary data analysis, we can identify this aberrant proliferation of cells that ultimately leads to cancer.Patients who may suffer later if the signs of cancer are not discovered at an early stage are the ones who benefit the most from early detection.The rising popularity of cigarette use among young people is one of the main issues.A number of factors, including industrial air pollution that people breathe in, contribute to the alarming rise in lung cancer cases in India.Machine learning(ML) techniques such RFC, KNN, K- means, SVM, and DTC are the primary focus of this work, which aims to predict lung cancer in various individuals.The primary goal of this study is to compare and contrast several machine learning algorithms using various performance measures.Search terms: cancer, support vector machine, k - nearest neighbor, random forest, machine learning',
        paperUrl: 'https://ijitce.org/index.php/ijitce/article/view/1161/1011',
        ResearchGateUrl: 'https://www.researchgate.net/publication/393974420_Evaluating_Cancer_Prediction_Machine_Learning_Models',
        codeUrl: 'https://github.com/danishsyed-dev/Scrutinzing-ML-models-for-cancer-prediction',
        status: 'published',
        tags: ['Machine Learning', 'Cancer Prediction', 'Support Vector Machine', 'K-Nearest Neighbor', 'Random Forest']
    }
];

export const getPublicationsByStatus = (status: Publication['status']): Publication[] => {
    return publications.filter(p => p.status === status);
};

export const getPublicationsByYear = (year: number): Publication[] => {
    return publications.filter(p => p.year === year);
};
