
import React from 'react';
import type { Category, Topic } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';

interface TopicSelectionProps {
  category: Category;
  topics: Topic[];
  onSelectTopic: (topic: Topic) => void;
  onBack: () => void;
}

const TopicButton: React.FC<{ topic: Topic, onClick: (topic: Topic) => void }> = ({ topic, onClick }) => (
    <button
        onClick={() => onClick(topic)}
        className="w-full text-left p-4 bg-gray-50 hover:bg-brand-lightblue rounded-md shadow-sm transition-colors duration-200 text-brand-dark hover:text-brand-blue border border-gray-200"
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
          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 mr-4"
          aria-label="Back to categories"
        >
          <ChevronLeftIcon className="h-6 w-6 text-brand-gray" />
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">{category}</h2>
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
