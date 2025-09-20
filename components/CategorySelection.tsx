import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Category, Topic } from '../types';
import { CATEGORIES } from '../constants';

interface CategorySelectionProps {
  onSelectCategory: (category: Category) => void;
  onSearchSelect: (topic: Topic, category: Category) => void;
}

const CategoryCard: React.FC<{ category: Category; onClick: (category: Category) => void }> = ({ category, onClick }) => (
  <button
    onClick={() => onClick(category)}
    className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center transform hover:-translate-y-1.5 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-gray-200">{category}</h3>
  </button>
);

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelectCategory, onSearchSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const categories = Object.keys(CATEGORIES) as Category[];

  // Add "Common Conditions" to all categories for search purposes
  const allCategoriesForSearch = ['Common Conditions', ...categories] as Category[];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const results: { topic: Topic; category: Category }[] = [];

    // Manually add the A-Z topic for searching
    const azTopic = 'Foot & Ankle Conditions (A-Z)';
    if (azTopic.toLowerCase().includes(lowercasedTerm)) {
      results.push({ topic: azTopic, category: 'Common Conditions' });
    }

    for (const category of categories) {
      const topics = CATEGORIES[category];
      for (const topic of topics) {
        if (topic.toLowerCase().includes(lowercasedTerm)) {
          results.push({ topic, category });
        }
      }
    }
    return results;
  }, [searchTerm, categories]);

  const handleTopicClick = (topic: Topic, category: Category) => {
    setSearchTerm(''); // Clear search and close dropdown on selection
    onSearchSelect(topic, category);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">Welcome to the Patient Portal</h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        This resource provides information about foot and ankle conditions. Search for a topic or select a category to begin.
      </p>

      <div className="mb-8 max-w-2xl mx-auto relative" ref={searchContainerRef}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Search for a condition, procedure, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {searchTerm.trim() && (
          <div className="absolute top-full w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-10 max-h-80 overflow-y-auto">
            {searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map(({ topic, category }) => (
                  <button
                    key={`${category}-${topic}`}
                    onClick={() => handleTopicClick(topic, category)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200">{topic}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">in {category}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="p-4 text-center text-gray-500 dark:text-gray-400">No results found for "{searchTerm}".</p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <button
          onClick={() => onSearchSelect('Foot & Ankle Conditions (A-Z)', 'Common Conditions')}
          className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center transform hover:-translate-y-1.5 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Foot & Ankle Conditions (A-Z)</h3>
        </button>
        {categories.map((cat) => (
          <CategoryCard key={cat} category={cat} onClick={onSelectCategory} />
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;