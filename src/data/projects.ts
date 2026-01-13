export interface Project {
  id: string;
  title: string;
  description: string;
  problemStatement: string;
  methodology: string;
  results: string;
  tools: string[];
  githubUrl?: string;
  datasetUrl?: string;
  paperUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
  category: 'ml' | 'nlp' | 'analytics' | 'web' | 'research';
  date: string;
}

export const projects: Project[] = [
  {
    id: 'identifying-hot-topic-trends',
    title: 'Identifying Hot Topic Trends in Streaming Text Data',
    description: 'A research project focused on detecting and classifying emerging hot topics from real-time streaming text data using machine learning and NLP techniques.',
    problemStatement: 'Social media and news platforms generate massive volumes of text data in real-time. Identifying trending topics quickly and accurately is crucial for applications in news aggregation, social listening, and market analysis. Traditional batch processing methods fail to capture the temporal dynamics of emerging trends.',
    methodology: 'Implemented a streaming data pipeline to process text data in real-time. Applied TF-IDF vectorization combined with clustering algorithms (K-Means, DBSCAN) to group similar content. Developed a trend detection algorithm based on topic velocity and acceleration metrics. Used sentiment analysis to classify topic polarity.',
    results: 'Achieved 87% accuracy in identifying emerging topics within a 15-minute window. The system successfully detected trend shifts 40% faster than baseline batch processing methods. Demonstrated scalability to handle 10,000+ documents per minute.',
    tools: ['Python', 'Scikit-learn', 'NLTK', 'Pandas', 'Kafka', 'Spark Streaming'],
    githubUrl: 'https://github.com/danishsyed-dev/Identifying-Hot-Topic-Trends',
    featured: true,
    category: 'nlp',
    date: '2025-12'
  },
  {
    id: 'cancer-prediction-ml',
    title: 'Scrutinizing ML Models for Cancer Prediction',
    description: 'A comprehensive comparative study of machine learning models for cancer prediction, evaluating performance metrics, interpretability, and clinical applicability.',
    problemStatement: 'Cancer diagnosis requires high precision to minimize false negatives (missed diagnoses) and false positives (unnecessary treatments). While many ML models claim high accuracy, their performance varies significantly across different cancer types and patient demographics.',
    methodology: 'Conducted a rigorous evaluation of 8 machine learning algorithms including Logistic Regression, Random Forest, XGBoost, SVM, and Neural Networks. Applied cross-validation, feature importance analysis, and SHAP values for model interpretability. Tested on multiple cancer datasets including breast, lung, and colorectal cancer.',
    results: 'XGBoost achieved the highest F1-score of 0.94 for breast cancer prediction. Identified that ensemble methods consistently outperform single models. SHAP analysis revealed key biomarkers that align with clinical literature, enhancing model trustworthiness.',
    tools: ['Python', 'Scikit-learn', 'XGBoost', 'SHAP', 'Pandas', 'Matplotlib', 'Seaborn'],
    githubUrl: 'https://github.com/danishsyed-dev/Scrutinizing-ML-Models-for-Cancer-Prediction',
    paperUrl: 'https://ijitce.org/index.php/ijitce/article/view/1161',
    featured: true,
    category: 'ml',
    date: '2025-11'
  },
  {
    id: 'rag-fastapi',
    title: 'RAG API with FastAPI',
    description: 'A production-ready Retrieval-Augmented Generation (RAG) system built with FastAPI, enabling intelligent document querying with contextual responses.',
    problemStatement: 'Large Language Models can hallucinate facts and lack access to domain-specific or up-to-date information. Organizations need systems that can ground LLM responses in their proprietary knowledge bases while maintaining low latency and high accuracy.',
    methodology: 'Built a modular RAG pipeline with document ingestion, chunking strategies (semantic vs fixed-size), and vector embeddings using sentence-transformers. Implemented FAISS for efficient similarity search. Created a FastAPI backend with async processing for concurrent queries. Added re-ranking using cross-encoders for improved relevance.',
    results: 'Reduced response latency to under 2 seconds for document retrieval + generation. Achieved 92% relevance score in user evaluations. The API handles 100+ concurrent requests with horizontal scaling support.',
    tools: ['Python', 'FastAPI', 'LangChain', 'FAISS', 'Sentence-Transformers', 'OpenAI API', 'Docker'],
    githubUrl: 'https://github.com/danishsyed-dev/RAG-API',
    featured: true,
    category: 'nlp',
    date: '2025-10'
  },
  {
    id: 'laliga-analytics',
    title: 'La Liga Forwards Analytics',
    description: 'An in-depth statistical analysis of La Liga forward players, uncovering performance patterns and predictive insights using advanced analytics.',
    problemStatement: 'Football performance analysis often relies on basic metrics like goals and assists. Scouts and analysts need deeper insights into player contributions, playing styles, and predictive performance indicators to make informed decisions.',
    methodology: 'Collected comprehensive player statistics from multiple seasons. Engineered advanced metrics including Expected Goals (xG), Expected Assists (xA), progressive carries, and pressing intensity. Applied clustering to identify player archetypes. Built predictive models for future performance based on age curves and historical trajectories.',
    results: 'Identified 5 distinct forward archetypes in La Liga. Predictive model achieved 0.78 correlation with next-season goal output. Analysis revealed undervalued players with high xG overperformance, providing actionable scouting insights.',
    tools: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'Plotly'],
    githubUrl: 'https://github.com/danishsyed-dev/laliga-forwards-analytics',
    datasetUrl: 'https://fbref.com',
    featured: true,
    category: 'analytics',
    date: '2025-09'
  },
  {
    id: 'Image_to_pdf',
    title: 'Image to PDF Converter',
    description: 'A simple image to PDF converter built with Python and Pillow.',
    problemStatement: 'Many users find it inconvenient to convert images to PDFs manually. A simple and efficient tool can save time and effort.',
    methodology: 'Designed a simple image to PDF converter with Python and Pillow. Implemented adaptive difficulty based on user consistency. Created a reward structure that encourages streak maintenance without punishing occasional misses. Built with modern web technologies for cross-platform accessibility.',
    results: 'Users reported increased convenience and time savings.',
    tools: ['Python', 'Pillow', 'Pillow-heif'],
    githubUrl: 'https://github.com/danishsyed-dev/Image_to_pdf',
    featured: false,
    category: 'web',
    date: '2025-07'
  },
  {
    id: 'life-rpg',
    title: 'Life-RPG Gamified System',
    description: 'A gamification framework that transforms personal development and habit tracking into an engaging RPG experience with levels, quests, and achievements.',
    problemStatement: 'Traditional productivity and habit-tracking apps often fail to maintain long-term user engagement. Gamification principles from video games can provide intrinsic motivation, but most implementations are superficial and lack meaningful progression systems.',
    methodology: 'Designed a comprehensive gamification framework with XP systems, skill trees, daily quests, and achievement badges. Implemented adaptive difficulty based on user consistency. Created a reward structure that encourages streak maintenance without punishing occasional misses. Built with modern web technologies for cross-platform accessibility.',
    results: 'User testing showed 65% higher engagement compared to standard habit trackers. Users reported increased motivation and sense of progress. The flexible architecture supports custom skill definitions for personalized experiences.',
    tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Framer Motion'],
    githubUrl: 'https://github.com/danishsyed-dev/Life-RPG',
    featured: false,
    category: 'web',
    date: '2025-08'
  },
  {
    id: 'weather-scraper',
    title: 'Weather Scraper Web App',
    description: 'A web application that aggregates weather data from multiple sources, providing comprehensive forecasts with data visualization and alerts.',
    problemStatement: 'Weather data is scattered across multiple providers with varying accuracy and update frequencies. Users need a unified interface that aggregates multiple sources and presents actionable weather insights with customizable alerts.',
    methodology: 'Built web scrapers to collect data from multiple weather APIs and websites. Implemented data normalization and conflict resolution when sources disagree. Created an interactive dashboard with charts for temperature, precipitation, and wind patterns. Added location-based alerts for severe weather conditions.',
    results: 'Successfully aggregates data from 5+ weather sources with 99.5% uptime. Interactive visualizations improved user understanding of weather patterns. Alert system achieved 95% accuracy for precipitation predictions within 2-hour windows.',
    tools: ['Python', 'Beautiful Soup', 'Requests', 'Flask', 'Chart.js', 'SQLite'],
    githubUrl: 'https://github.com/danishsyed-dev/Weather-scraper',
    liveUrl: 'https://syeddanishali.me/weather-scraper',
    featured: false,
    category: 'web',
    date: '2025-07'
  }
];

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(p => p.featured);
};

export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter(p => p.category === category);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};
