
import React from 'react';
import type { Category } from '../types';
import { CATEGORIES } from '../constants';
import { BookIcon, HeartIcon, MedkitIcon, SurgeryIcon } from './icons/CategoryIcons';

interface CategorySelectionProps {
  onSelectCategory: (category: Category) => void;
}

const categoryIcons: { [key in Category]: React.ReactNode } = {
  'Common Conditions': <BookIcon />,
  'Treatment Options': <MedkitIcon />,
  'Surgical Procedures': <SurgeryIcon />,
  'Wellness & Prevention': <HeartIcon />,
};

const CategoryCard: React.FC<{ category: Category; onClick: (category: Category) => void }> = ({ category, onClick }) => (
  <button
    onClick={() => onClick(category)}
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center justify-center text-center transform hover:-translate-y-1 border-2 border-transparent hover:border-brand-blue"
  >
    <div className="text-brand-blue mb-4">{categoryIcons[category]}</div>
    <h3 className="text-md sm:text-lg font-semibold text-brand-dark">{category}</h3>
  </button>
);


const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelectCategory }) => {
  const categories = Object.keys(CATEGORIES) as Category[];

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-brand-dark mb-2">Patient Education Center</h2>
      <p className="text-center text-brand-gray mb-8">Please select a category to learn more.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat} category={cat} onClick={onSelectCategory} />
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;
