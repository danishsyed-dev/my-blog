export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    date: string;
    readTime: string;
    featured: boolean;
}

export const blogPosts: BlogPost[] = [
    {
        id: 'building-rag-system-fastapi',
        title: 'How I Built a RAG System with FastAPI',
        excerpt: 'A deep dive into building a production-ready Retrieval-Augmented Generation system, covering architecture decisions, chunking strategies, and performance optimization.',
        content: `
## Introduction

Retrieval-Augmented Generation (RAG) has become the go-to approach for grounding Large Language Models in domain-specific knowledge. In this post, I'll walk through how I built a production-ready RAG API using FastAPI.

## The Architecture

The system consists of three main components:

1. Document Ingestion Pipeline  - Handles PDF, DOCX, and plain text files
2. Vector Store                 - Uses FAISS for efficient similarity search
3. Generation Layer             - Integrates with OpenAI's GPT models

## Chunking Strategy

One of the most critical decisions in RAG is how to chunk your documents. I experimented with:

- Fixed-size chunks     (500 tokens with 50-token overlap)
- Semantic chunks       (using sentence boundaries)
- Recursive chunking    (hierarchical splitting)

Semantic chunking with sentence boundaries showed the best retrieval quality.

## Key Learnings

1. Re-ranking retrieved chunks significantly improves answer quality
2. Async processing is essential for production workloads
3. Caching embeddings reduces latency by 60%

## Conclusion

Building a RAG system requires careful attention to each component in the pipeline. The choices you make in chunking and retrieval directly impact the quality of generated responses.
    `.trim(),
        tags: ['RAG', 'FastAPI', 'NLP', 'LLMs', 'Python'],
        date: '2025-10-15',
        readTime: '8 min read',
        featured: true
    },
    {
        id: 'comparing-ml-models-cancer-prediction',
        title: 'Comparing ML Models for Cancer Prediction',
        excerpt: 'A comprehensive analysis of machine learning algorithms for cancer prediction, examining accuracy, interpretability, and clinical applicability.',
        content: `
## The Challenge

Cancer prediction requires models that are not just accurate, but also interpretable. Medical professionals need to understand why a model makes a prediction before trusting it with patient diagnoses.

## Models Evaluated

I tested 8 different algorithms:

- Logistic Regression
- Random Forest
- XGBoost
- LightGBM
- Support Vector Machines
- k-Nearest Neighbors
- Neural Networks
- Naive Bayes

## Evaluation Metrics

For medical applications, accuracy alone is insufficient. I focused on:

- Sensitivity (Recall) - Minimizing missed diagnoses
- Specificity          - Reducing false positives
- F1-Score             - Balanced measure
- AUC-ROC              - Overall discriminative ability

## Key Findings

XGBoost consistently outperformed other models with:
- F1-Score: 0.94
- AUC-ROC: 0.97
- Sensitivity: 0.96

However, Logistic Regression remained competitive and offered better interpretability.

## SHAP Analysis

Using SHAP values, I identified the most important features:
1. Cell size uniformity
2. Clump thickness
3. Marginal adhesion

These align with known clinical indicators, increasing model trustworthiness.
    `.trim(),
        tags: ['Machine Learning', 'Healthcare', 'XGBoost', 'SHAP', 'Classification'],
        date: '2025-11-08',
        readTime: '10 min read',
        featured: true
    },
    {
        id: 'dataset-engineering-sports-analytics',
        title: 'Dataset Engineering for Sports Analytics',
        excerpt: 'Lessons learned from building comprehensive sports analytics datasets, covering data collection, cleaning, and feature engineering.',
        content: `
## Why Dataset Engineering Matters

In sports analytics, the quality of your analysis is directly tied to the quality of your data. Raw statistics only tell part of the story.

## Data Collection Challenges

Collecting football data involves:
- Web scraping player statistics
- Handling missing values across sources
- Normalizing data from different providers
- Dealing with name variations and transfers

## Feature Engineering

Beyond basic stats, I engineered:

- Expected Goals (xG)   - Shot quality metric
- Progressive Carries   - Ball advancement measure
- Pressing Intensity    - Defensive contribution
- Shot-Creating Actions - Chance creation

## Handling Temporal Data

Player performance varies over a season. I implemented:
- Rolling averages (5-match windows)
- Seasonality adjustments
- Form indicators

## Data Quality Checks

Essential validation steps:
1. Cross-reference multiple sources
2. Check statistical distributions
3. Validate against known aggregates
4. Flag outliers for manual review

## Conclusion

Good analytics starts with good data. Investing time in dataset engineering pays dividends in analysis quality.
    `.trim(),
        tags: ['Sports Analytics', 'Data Engineering', 'Football', 'Feature Engineering'],
        date: '2025-09-22',
        readTime: '7 min read',
        featured: false
    }
];

export const getFeaturedPosts = (): BlogPost[] => {
    return blogPosts.filter(p => p.featured);
};

export const getPostById = (id: string): BlogPost | undefined => {
    return blogPosts.find(p => p.id === id);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
    return blogPosts.filter(p => p.tags.includes(tag));
};

export const getAllTags = (): string[] => {
    const tags = new Set<string>();
    blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
};
