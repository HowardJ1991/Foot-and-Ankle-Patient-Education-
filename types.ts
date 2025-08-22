
import type { CATEGORIES } from './constants';

export type Category = keyof typeof CATEGORIES;
export type Topic = string;
export type View = 'categories' | 'topics' | 'content';
