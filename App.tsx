import React, { useState, useEffect, useCallback } from 'react';
import type { Category, Topic, View, ContentData } from './types';
import { CATEGORIES } from './constants';
import { fetchTopicInfo } from './services/geminiService';

import Header from './components/Header';
import Footer from './components/Footer';
import CategorySelection from './components/CategorySelection';
import TopicSelection from './components/icons/TopicSelection';
import ContentViewer from './components/ContentViewer';

const App: React.FC = () => {
  const [view, setView] = useState<View>('categories');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [content, setContent] = useState<ContentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setView('topics');
  };

  const handleSelectTopic = useCallback((topic: Topic) => {
    setSelectedTopic(topic);
    setView('content');
    setContent(null);
    setError(null);
  }, []);

  const handleSearchSelect = (topic: Topic, category: Category) => {
    setSelectedCategory(category);
    handleSelectTopic(topic);
  };

  const handleBack = () => {
    if (view === 'content') {
      setView('topics');
      setSelectedTopic(null);
      setContent(null);
      setError(null);
    } else if (view === 'topics') {
      setView('categories');
      setSelectedCategory(null);
    }
  };
  
  const handleGoHome = () => {
    setView('categories');
    setSelectedCategory(null);
    setSelectedTopic(null);
    setContent(null);
    setError(null);
  };

  const fetchContent = useCallback(async () => {
    if (!selectedTopic || !selectedCategory) return;

    setIsLoading(true);
    setError(null);
    try {
      const topicInfo = await fetchTopicInfo(selectedTopic);
      setContent(topicInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopic, selectedCategory]);

  useEffect(() => {
    if (view === 'content' && selectedTopic) {
      fetchContent();
    }
  }, [view, selectedTopic, fetchContent]);

  const renderContent = () => {
    switch (view) {
      case 'topics':
        if (selectedCategory && CATEGORIES[selectedCategory]) {
          return (
            <TopicSelection
              category={selectedCategory}
              topics={CATEGORIES[selectedCategory]}
              onSelectTopic={handleSelectTopic}
              onBack={handleBack}
            />
          );
        }
        return null;
      case 'content':
        if (selectedCategory && selectedTopic) {
          return (
            <ContentViewer
              category={selectedCategory}
              topic={selectedTopic}
              data={content}
              isLoading={isLoading}
              error={error}
              onBack={handleBack}
              onRetry={fetchContent}
            />
          );
        }
        return null;
      case 'categories':
      default:
        return <CategorySelection onSelectCategory={handleSelectCategory} onSearchSelect={handleSearchSelect} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <Header onGoHome={handleGoHome} showHomeButton={view !== 'categories'} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;