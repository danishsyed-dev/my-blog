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
        id: 'dynamic-pricing-ml-system',
        title: 'How I Built a Dynamic Pricing ML System',
        excerpt: 'A deep dive into building a production-ready system for dynamic pricing using machine learning.',
        content: `
## Introduction
A Dynamic Pricing ML System that predicts optimal prices for retail products to maximize sales revenue. Built with LightGBM, Flask, and a beautiful web UI.

🎯 What Does This Project Do?
Given a product (identified by stockcode), this system predicts:

How many units will sell at different price points
What is the optimal price to maximize total revenue
Business Question
"If I price product X at $Y, how many will I sell and what's my revenue?"

✨ Key Features
Feature	Description
🤖 ML Models	LightGBM + ElasticNet ensemble for robust predictions
🌐 REST API	Flask-based API with CORS support
🎨 Web UI	Beautiful, responsive prediction interface
📊 Visualizations	Interactive charts showing price vs. sales curves
🚀 Production Ready	Docker support for AWS Lambda/SageMaker deployment
⚡ Fast Inference	~1-2 seconds per prediction
🏗️ System Architecture
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Raw Data      │────→│  Data Pipeline  │────→│  Processed Data │
│  (CSV/Excel)    │     │  (Engineering)  │     │   (Parquet)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ↓
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Predictions   │←────│   Flask API     │←────│  ML Models      │
│   (JSON/UI)     │     │   (Waitress)    │     │  (LightGBM)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘

        `.trim(),
        tags: ['Machine Learning', 'Dynamic Pricing', 'NLP', 'LLMs', 'Python'],
        date: '2025-10-15',
        readTime: '8 min read',
        featured: true
    },
    {
        id: 'food-extractor',
        title: 'Food Extractor: Fine-Tuning Gemma 3 270M for Structured Data Extraction',
        excerpt: 'A hands-on tutorial on fully fine-tuning Google\'s Gemma 3 270M model using Hugging Face libraries to extract food and drink items from text with structured output.',
        content: `
## Introduction

Ever wanted to extract structured food data from messy text? In this tutorial, I walk through how I fully fine-tuned Google's Gemma 3 270M model to do exactly that — turning unstructured descriptions into clean, parseable output.

## Why Fine-Tune a Small Language Model?

Before diving in, here's why SLMs (Small Language Models) are powerful:

- Own the model          - Run anywhere without API costs
- Simple tasks work well - Smaller models excel at focused tasks
- No API calls needed    - Run completely offline
- Batch processing       - Much faster than sequential API calls
- Task-specific          - Better performance on your use case

## What We're Building

A model that extracts food and drink items from text, returning structured output.

Input:
\`\`\`
A plate of rice cakes, salmon, cottage cheese and small cherry tomatoes with a cup of tea.
\`\`\`

Output:
\`\`\`
food_or_drink: 1
tags: fi
foods: rice cakes, salmon, cottage cheese, cherry tomatoes
drinks: cup of tea
\`\`\`

## The Tech Stack

The project uses the following technologies:

- Model: Gemma 3 270M
- Dataset: FoodExtract-1k
- Training: TRL (Transformers Reinforcement Learning)
- Inference: Transformers + Accelerate
- Demo: Gradio

## Training Process

The fine-tuning process is straightforward with Hugging Face's TRL library:

1. Load the base Gemma 3 270M model
2. Prepare the FoodExtract-1k dataset with proper formatting
3. Configure the SFTTrainer with appropriate hyperparameters
4. Train for 3 epochs (~18 minutes on T4 GPU)

## Training Results

After 3 epochs of supervised fine-tuning:

- Epoch 1: Training Loss 2.17, Validation Loss 2.24, Token Accuracy 58.8%
- Epoch 2: Training Loss 1.25, Validation Loss 2.28, Token Accuracy 58.9%
- Epoch 3: Training Loss 1.07, Validation Loss 2.46, Token Accuracy 58.6%

## Key Concepts

### Full Fine-Tuning vs LoRA

- Full Fine-Tuning - All model weights are updated (used in this project)
- LoRA             - Only adapter weights are trained (requires fewer resources)

For a small model like Gemma 3 270M, full fine-tuning is practical and yields excellent results.

### Tags Dictionary

The model learns to classify content with these tags:

- np - Nutrition Panel
- il - Ingredient List
- me - Menu
- re - Recipe
- fi - Food Items
- di - Drink Items
- fa - Food Advertisement
- fp - Food Packaging

## Lessons Learned

1. Think in tokens         - Frame every problem as: "What tokens in, what tokens out?"
2. Small models are powerful - 270M parameters is enough for structured extraction
3. Data quality matters     - The FoodExtract-1k dataset's formatting directly impacts output structure
4. Google Colab works       - A free T4 GPU can fine-tune this in under 20 minutes

## Conclusion

Fine-tuning small language models democratizes AI customization. You can create task-specific models that run locally, work offline, and perform better than general-purpose APIs on your specific use case. The Food Extractor demonstrates how approachable this process has become with modern tooling.

Check out the full notebook on Google Colab to try it yourself!
        `.trim(),
        tags: ['LLMs', 'Fine-Tuning', 'Hugging Face', 'Gemma', 'NLP', 'Python', 'Deep Learning'],
        date: '2026-02-03',
        readTime: '12 min read',
        featured: true
    },
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
