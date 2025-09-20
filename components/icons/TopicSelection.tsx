import React from 'react';
import type { Category, Topic } from '../../types';

interface TopicSelectionProps {
  category: Category;
  topics: Topic[];
  onSelectTopic: (topic: Topic) => void;
  onBack: () => void;
}

const TopicButton: React.FC<{ topic: Topic, onClick: (topic: Topic) => void }> = ({ topic, onClick }) => (
    <button
        onClick={() => onClick(topic)}
        className="w-full text-left p-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-sm transition-all duration-200 text-gray-800 dark:text-gray-200 transform hover:scale-[1.02] border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
        {topic}
    </button>
);

const TopicSelection: React.FC<TopicSelectionProps> = ({ category, topics, onSelectTopic, onBack }) => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200 mr-4"
          aria-label="Back to categories"
        >
          Back
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{category}</h2>
      </div>
      <div className="space-y-3">
        {topics.map((topic) => (
          <TopicButton key={topic} topic={topic} onClick={onSelectTopic} />
        ))}
      </div>
    </div>
  );
};

export default TopicSelection;
