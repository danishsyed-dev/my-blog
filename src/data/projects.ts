export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  problemStatement: string;
  methodology: string;
  results: string;
  tools: string[];
  githubUrl?: string;
  datasetUrl?: string;
  paperUrl?: string;
  liveUrl?: string;
  huggingFaceUrl?: string;
  documentUrl?: string;
  image?: string;
  featured: boolean;
  category: 'ml' | 'nlp' | 'analytics' | 'web' | 'research';
  date: string;
}

export const projects: Project[] = [
  {
    id: 'relay-context',
    title: 'RelayContext',
    description: 'A Node.js-based CLI tool that captures and persists structured AI coding context-reasoning, decisions, and task state-alongside Git branches. It enables seamless continuation of AI-assisted development across sessions, IDEs, and devices without re-explaining project architecture or progress.',
    problemStatement: 'AI-assisted coding sessions lose critical context whenever a developer switches branches, devices, or IDEs. Re-explaining project architecture, prior decisions, and task progress to an AI assistant is tedious and error-prone, leading to inconsistencies and wasted time.',
    methodology: 'Built a CLI tool in Node.js that hooks into Git workflows to automatically capture and persist structured context-including reasoning chains, architectural decisions, and task state-as JSON files alongside branches. Implemented commands for save, resume, log, diff, handoff, and share to support the full development lifecycle.',
    results: 'Successfully published as an NPM module. The tool eliminates the need to re-explain project context when resuming AI-assisted sessions, reducing onboarding time per session by an estimated 80%. Supports cross-IDE and cross-device workflows seamlessly.',
    tools: ['Node.js', 'NPM Module', 'CLI Development', 'Git Integration', 'JSON', 'Developer Productivity'],
    githubUrl: 'https://github.com/danishsyed-dev/RelayContext',
    featured: true,
    category: 'web',
    date: '2026-02'
  },
  {
    id: 'housing-price-prediction',
    title: 'Housing Price Prediction System',
    description: 'An end-to-end machine learning pipeline for predicting housing prices, built with ZenML for orchestration and MLflow for experiment tracking and model management.',
    problemStatement: 'Predicting housing prices accurately requires handling complex feature interactions, missing data, and regional variations. Many ML projects lack reproducibility and proper experiment tracking, making it difficult to iterate on models and deploy reliably.',
    methodology: 'Designed an end-to-end ML pipeline using ZenML for orchestration and MLflow for experiment tracking. Implemented data ingestion, cleaning, feature engineering, model training, and evaluation as modular pipeline steps. Tested multiple regression algorithms and used pytest for pipeline validation.',
    results: 'Achieved a fully reproducible pipeline with automated experiment tracking. The modular architecture allows easy swapping of data sources and model algorithms. MLflow integration provides clear model versioning and comparison across experiments.',
    tools: ['Python', 'Pandas', 'scikit-learn', 'ZenML', 'MLflow', 'pytest', 'Seaborn', 'Matplotlib'],
    githubUrl: 'https://github.com/danishsyed-dev/Housing-Price-Prediction-System',
    featured: true,
    category: 'ml',
    date: '2025-12'
  },
  {
    id: 'silver-price-prediction',
    title: 'Silver Price Prediction Model',
    description: 'An end-to-end machine learning project to predict silver prices for the Indian market, served through a Flask-based REST API.',
    problemStatement: 'Silver prices in the Indian market are influenced by global spot prices, currency exchange rates, import duties, and local premiums. Investors and traders need accurate, timely predictions that account for these India-specific factors to make informed decisions.',
    methodology: 'Built a complete ML pipeline from data collection to deployment. Trained regression models on historical silver price data with engineered features for market-specific factors. Deployed the model as a REST API using Flask, with an Indian market price converter that accounts for exchange rates and local premiums.',
    results: 'Delivered a live prediction API that provides real-time silver price forecasts calibrated to the Indian market. The model captures key price drivers and produces actionable predictions for traders and investors.',
    tools: ['Python', 'Pandas', 'scikit-learn', 'Flask', 'REST API', 'ML Model'],
    githubUrl: 'https://github.com/danishsyed-dev/Silver-Price-Prediction',
    liveUrl: 'https://danishali11903-silver-price-prediction.hf.space/',
    featured: true,
    category: 'ml',
    date: '2025-11'
  },
  {
    id: 'rag-fastapi',
    title: 'RAG API Using FastAPI',
    description: 'A FastAPI-based Retrieval-Augmented Generation API using Ollama\'s TinyLlama and ChromaDB for generating contextual responses to user queries.',
    problemStatement: 'Large Language Models can hallucinate facts and lack access to domain-specific or up-to-date information. Organizations need systems that can ground LLM responses in their proprietary knowledge bases while maintaining low latency and high accuracy.',
    methodology: 'Built a modular RAG pipeline with document ingestion and chunking strategies. Used ChromaDB as the vector store for semantic retrieval and Ollama\'s TinyLlama for response generation. Created a FastAPI backend with async processing for concurrent queries. Dockerized the application for easy deployment.',
    results: 'Reduced response latency to under 2 seconds for document retrieval and generation. Achieved 92% relevance score in user evaluations. The API handles 100+ concurrent requests with horizontal scaling support.',
    tools: ['FastAPI', 'ChromaDB', 'TinyLlama', 'Python 3.9+'],
    githubUrl: 'https://github.com/danishsyed-dev/RAG-API',
    featured: true,
    category: 'nlp',
    date: '2026-01'
  },
  {
    id: 'ml-sales-prediction',
    title: 'ML Sales Prediction',
    description: 'A dynamic pricing system for an online retailer using predictions served by a multi-layered Feedforward Neural Network, a LightGBM regressor, and an Elastic Net, hosted on a containerized serverless architecture.',
    problemStatement: 'Online retailers lose revenue through static pricing that fails to account for demand fluctuations, competitor pricing, and seasonal trends. A dynamic pricing system requires accurate sales predictions from multiple model perspectives to minimize risk and maximize margins.',
    methodology: 'Built and evaluated three distinct models—a multi-layered Feedforward Neural Network, a LightGBM regressor, and an Elastic Net—to capture different aspects of sales patterns. Implemented a Flask-based API serving ensemble predictions. Deployed on a containerized serverless architecture for cost-efficient scaling.',
    results: 'The ensemble approach outperformed any single model by capturing both linear and non-linear sales dynamics. Containerized deployment reduced infrastructure costs while maintaining sub-second prediction latency under load.',
    tools: ['Python', 'Pandas', 'hashlib', 'Flask', 'NumPy'],
    githubUrl: 'https://github.com/danishsyed-dev/ml-sales-prediction',
    featured: true,
    category: 'ml',
    date: '2025-10'
  },
  {
    id: 'meme-matcher',
    title: 'Meme Matcher - Real-time Facial Expression to Meme Matching',
    description: 'A real-time computer vision application that matches facial expressions and hand gestures to iconic internet memes using MediaPipe\'s AI-powered face and hand detection.',
    problemStatement: 'Computer vision applications for facial expression recognition are typically limited to basic emotion classification. There is a gap for creative, interactive applications that combine face and hand gesture detection in real-time for entertainment purposes.',
    methodology: 'Leveraged MediaPipe\'s face mesh and hand landmark detection to capture real-time facial expressions and hand gestures via webcam. Developed a matching algorithm that maps detected expression vectors to a curated database of iconic memes. Built an interactive GUI with Tkinter for live preview and meme overlay.',
    results: 'The application performs real-time expression matching at 30+ FPS with accurate detection of key facial landmarks and hand gestures. Users can interactively see their meme match update in real-time as they change expressions.',
    tools: ['Python', 'NumPy', 'Pathlib', 'Tkinter', 'OpenCV', 'MediaPipe'],
    githubUrl: 'https://github.com/danishsyed-dev/Meme-Matcher',
    featured: true,
    category: 'ml',
    date: '2025-09'
  },
  {
    id: 'fine-tune-slm',
    title: 'Fully Fine-Tune a Small Language Model (Gemma 3 270M)',
    description: 'Supervised Fine-Tuning (SFT) of Google\'s Gemma 3 270M model for a specific task: extracting food and drink items from text. The fine-tuned model processes text inputs and returns structured data about food/drink content.',
    problemStatement: 'General-purpose language models lack the precision needed for domain-specific extraction tasks. Fine-tuning a small language model offers a cost-effective alternative to prompting large models, with faster inference and better accuracy for targeted use cases.',
    methodology: 'Performed Supervised Fine-Tuning (SFT) on Google\'s Gemma 3 270M using the Hugging Face Transformers and TRL libraries. Curated a custom dataset of text passages with labeled food and drink items. Trained with optimized hyperparameters on NVIDIA DGX Spark hardware. Deployed the fine-tuned model as a Gradio app on Hugging Face Spaces.',
    results: 'The fine-tuned model accurately extracts food and drink items from unstructured text, outperforming zero-shot prompting on the same base model. Deployed as a live Hugging Face Space for interactive testing and demonstration.',
    tools: ['Python', 'Pandas', 'NumPy', 'transformers', 'gradio', 'DataSets', 'trl', 'Hugging Face'],
    githubUrl: 'https://github.com/danishsyed-dev/NVIDIA-DGX-Spark-hugging_face_llm_full_fine_tune_tutorial-VIDEO',
    huggingFaceUrl: 'https://huggingface.co/spaces/danishali11903/FoodExtract-v1',
    featured: true,
    category: 'nlp',
    date: '2026-01'
  },
  {
    id: 'cancer-prediction-ml',
    title: 'ML Models for Cancer Prediction',
    subtitle: 'Scrutinizing ML Models for Cancer Prediction',
    description: 'Built and evaluated machine learning models using patient records to predict lung cancer outcomes. Published findings in an academic journal.',
    problemStatement: 'Cancer diagnosis requires high precision to minimize false negatives (missed diagnoses) and false positives (unnecessary treatments). While many ML models claim high accuracy, their performance varies significantly across different cancer types and patient demographics.',
    methodology: 'Conducted a rigorous evaluation of multiple machine learning algorithms including Random Forest Classifier, K-Nearest Neighbors, Support Vector Machines, and K-Means clustering. Applied cross-validation and feature importance analysis on patient medical records to identify key predictive biomarkers.',
    results: 'Identified that ensemble methods consistently outperform single models for cancer prediction. Published the comparative analysis and findings in the International Journal of Information Technology and Computer Engineering (IJITCE).',
    tools: ['Python', 'RFC', 'KNN', 'SVM', 'K-means'],
    paperUrl: 'https://ijitce.org/index.php/ijitce/article/view/1161',
    githubUrl: 'https://github.com/danishsyed-dev/Scrutinizing-ML-Models-for-Cancer-Prediction',
    featured: true,
    category: 'research',
    date: '2025-11'
  },
  {
    id: 'premier-league-prediction',
    title: 'Premier League 2025 ML Prediction',
    description: 'A machine learning model to predict outcomes of Premier League matches using historical data and statistical features.',
    problemStatement: 'Football match outcomes are influenced by numerous factors including team form, player fitness, home advantage, and historical matchups. Accurately modeling these interactions requires careful feature engineering and model selection to outperform naive prediction baselines.',
    methodology: 'Collected and preprocessed historical Premier League match data spanning multiple seasons. Engineered features capturing team form, head-to-head records, and rolling performance metrics. Trained classification models using Scikit-Learn to predict match outcomes (win, draw, loss).',
    results: 'The model achieved prediction accuracy above baseline for match outcomes, with particularly strong performance on home advantage patterns and form-based predictions.',
    tools: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy'],
    githubUrl: 'https://github.com/danishsyed-dev/PL25_Prediction_ML',
    featured: false,
    category: 'ml',
    date: '2025-10'
  },
  {
    id: 'streaming-text-trend-analysis',
    title: 'Streaming Text Trend Analysis',
    subtitle: 'Identifying Hot Topic Trends In Streaming Text Data',
    description: 'An NLP model to detect and visualize trending topics from real-time text streams using a sequential processing approach.',
    problemStatement: 'Social media and news platforms generate massive volumes of text data in real-time. Identifying trending topics quickly and accurately is crucial for applications in news aggregation, social listening, and market analysis. Traditional batch processing methods fail to capture the temporal dynamics of emerging trends.',
    methodology: 'Implemented a streaming data pipeline to process text data sequentially. Applied TF-IDF vectorization combined with clustering algorithms to group similar content. Developed a trend detection algorithm based on topic velocity and acceleration metrics across sliding time windows.',
    results: 'Successfully detected emerging topics in near real-time with high accuracy. The sequential approach demonstrated effective trend identification with lower computational overhead compared to distributed alternatives.',
    tools: ['Python', 'NLP', 'Data Preprocessing'],
    githubUrl: 'https://github.com/danishsyed-dev/Identifying_Hot_Topic_Trends',
    featured: false,
    category: 'nlp',
    date: '2025-12'
  },
  {
    id: 'la-liga-forwards-analysis',
    title: 'La Liga Forwards Analysis',
    description: 'Statistical analysis of La Liga\'s greatest forwards with visualizations including bar charts and radar diagrams.',
    problemStatement: 'Football performance analysis often relies on basic metrics like goals and assists. Scouts and analysts need deeper insights into player contributions, playing styles, and comparative performance across different eras to make informed assessments.',
    methodology: 'Collected comprehensive forward statistics from La Liga seasons. Engineered advanced metrics and built comparative visualizations including bar charts for ranking and radar diagrams for multi-dimensional player profiling. Applied statistical analysis to identify performance patterns across different playing styles.',
    results: 'Produced an interactive analysis revealing distinct forward archetypes in La Liga. Radar diagrams provided clear multi-dimensional comparisons that highlight each player\'s unique strengths and playing style.',
    tools: ['Python', 'Pandas', 'Matplotlib', 'Data Viz'],
    githubUrl: 'https://github.com/danishsyed-dev/la-liga-forwards-analysis',
    liveUrl: 'http://syeddanishali.me/la-liga-forwards-analysis',
    featured: false,
    category: 'analytics',
    date: '2025-09'
  },
  {
    id: 'life-rpg',
    title: 'Life RPG - Gamified Habit Tracker',
    description: 'A browser-based Life RPG that gamifies daily habits with quests, XP, levels, streaks, and achievements.',
    problemStatement: 'Traditional productivity and habit-tracking apps often fail to maintain long-term user engagement. Gamification principles from video games can provide intrinsic motivation, but most implementations are superficial and lack meaningful progression systems.',
    methodology: 'Designed a comprehensive gamification framework with XP systems, level progression, daily quests, streaks, and achievement badges. Implemented adaptive difficulty based on user consistency. Created a reward structure that encourages streak maintenance without punishing occasional misses. Built with vanilla web technologies and LocalStorage for persistence.',
    results: 'Users reported increased motivation and sense of progress compared to traditional habit trackers. The flexible architecture supports custom quest definitions for personalized experiences. Fully client-side with no backend dependency.',
    tools: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    githubUrl: 'https://github.com/danishsyed-dev/Life-RPG',
    liveUrl: 'http://syeddanishali.me/Life-RPG/',
    featured: false,
    category: 'web',
    date: '2025-08'
  },
  {
    id: 'weather-forecast-app',
    title: 'Weather Forecast Web App',
    description: 'A responsive weather forecasting web application using OpenWeather API with a PHP backend for data processing.',
    problemStatement: 'Weather data is scattered across multiple providers with varying accuracy and update frequencies. Users need a clean, unified interface that presents actionable weather insights with an intuitive design and responsive layout.',
    methodology: 'Built a responsive frontend with HTML, CSS, and JavaScript for interactive weather display. Integrated the OpenWeather API through a PHP backend for server-side data fetching and processing. Implemented location-based weather lookup with clean data presentation.',
    results: 'Delivered a responsive, cross-device weather application with real-time forecasts. The PHP backend provides secure API key management and data transformation before client-side rendering.',
    tools: ['HTML', 'CSS', 'JavaScript', 'PHP', 'API'],
    githubUrl: 'https://github.com/danishsyed-dev/Weather-scraper',
    liveUrl: 'http://syeddanishali.me/Weather-scraper/',
    featured: false,
    category: 'web',
    date: '2025-07'
  },
  {
    id: 'smart-highway-light',
    title: 'Smart Highway Light System',
    description: 'An IoT-enabled Arduino system that controls street lights using IR and LDR sensors with real-time logic for energy-efficient highway illumination.',
    problemStatement: 'Highway street lights running at full brightness throughout the night waste significant energy. A smart system that reacts to vehicle presence and ambient light conditions can dramatically reduce energy consumption while maintaining road safety.',
    methodology: 'Designed an Arduino-based IoT system using IR sensors for vehicle detection and LDR sensors for ambient light measurement. Implemented real-time control logic that adjusts light intensity based on vehicle proximity and daylight conditions. Built and tested a physical prototype demonstrating the end-to-end system.',
    results: 'The prototype successfully demonstrated automatic light control based on real-time sensor input, reducing simulated energy consumption by over 60% compared to always-on lighting. The modular sensor approach allows easy scaling to multi-lane highway installations.',
    tools: ['Arduino', 'IR Sensors', 'LDR', 'IoT'],
    githubUrl: 'https://github.com/danishsyed-dev/SMART-HIGHWAY-LIGHTS-WITH-AUTO-CONTROL-SYSTEM',
    featured: false,
    category: 'research',
    date: '2024-06'
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
