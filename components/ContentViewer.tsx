
import React from 'react';
import type { Category, Topic } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import Spinner from './Spinner';

interface ContentViewerProps {
  category: Category;
  topic: Topic;
  content: string;
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
}

const SimpleMarkdownParser: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  return (
    <div className="prose lg:prose-lg max-w-none text-gray-800">
      {lines.map((line, index) => {
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold mt-6 mb-2 text-brand-dark">{line.substring(4)}</h3>;
        }
        if (line.startsWith('* ')) {
          return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
        }
        if (line.trim() === '') {
            return <div key={index} className="h-4"></div>;
        }
        return <p key={index}>{line}</p>;
      })}
    </div>
  );
};

const ContentViewer: React.FC<ContentViewerProps> = ({ category, topic, content, isLoading, error, onBack }) => {
  return (
    <div className="animate-fade-in">
       <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 mr-4"
          aria-label="Back to topics"
        >
          <ChevronLeftIcon className="h-6 w-6 text-brand-gray" />
        </button>
        <div>
            <p className="text-sm text-brand-gray">{category}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">{topic}</h2>
        </div>
      </div>

      {isLoading && <div className="flex justify-center items-center py-16"><Spinner /></div>}
      
      {error && (
        <div className="text-center py-16">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      )}

      {!isLoading && !error && content && (
        <div className="mt-4">
          <SimpleMarkdownParser text={content} />
        </div>
      )}
    </div>
  );
};

export default ContentViewer;
