
import React, { useState, useEffect, useCallback } from 'react';
import type { Category, Topic, View } from './types';
import { CATEGORIES } from './constants';
import { fetchTopicInfo } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import CategorySelection from './components/CategorySelection';
import TopicSelection from './components/TopicSelection';
import ContentViewer from './components/ContentViewer';

const App: React.FC = () => {
  const [view, setView] = useState<View>('categories');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setView('topics');
  };

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setView('content');
  };

  const handleBackToCategories = () => {
    setView('categories');
    setSelectedCategory(null);
    setSelectedTopic(null);
  };

  const handleBackToTopics = () => {
    setView('topics');
    setSelectedTopic(null);
    setContent('');
    setError(null);
  };

  const generateContent = useCallback(async () => {
    if (!selectedTopic) return;

    setIsLoading(true);
    setContent('');
    setError(null);
    try {
      const topicInfo = await fetchTopicInfo(selectedTopic);
      setContent(topicInfo);
    } catch (err) {
      console.error(err);
      setError('Failed to load information. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (view === 'content' && selectedTopic) {
      generateContent();
    }
  }, [view, selectedTopic, generateContent]);

  const renderContent = () => {
    switch (view) {
      case 'categories':
        return <CategorySelection onSelectCategory={handleSelectCategory} />;
      case 'topics':
        if (!selectedCategory) return null;
        return (
          <TopicSelection
            category={selectedCategory}
            topics={CATEGORIES[selectedCategory]}
            onSelectTopic={handleSelectTopic}
            onBack={handleBackToCategories}
          />
        );
      case 'content':
        if (!selectedTopic || !selectedCategory) return null;
        return (
          <ContentViewer
            category={selectedCategory}
            topic={selectedTopic}
            content={content}
            isLoading={isLoading}
            error={error}
            onBack={handleBackToTopics}
          />
        );
      default:
        return <CategorySelection onSelectCategory={handleSelectCategory} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-lightblue font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 min-h-[60vh]">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
