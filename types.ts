// FIX: To resolve a circular dependency error, the base category names are defined
// explicitly in `BaseCategory`, instead of being inferred from the `CATEGORIES` object
// in `constants.ts`.
export type BaseCategory =
  | 'Treatment & Recovery'
  | 'Diagnostics & Imaging'
  | 'Patient Information & Products';

// FIX: Broaden the `Category` type to include 'Common Conditions'. This resolves type errors in `CategorySelection.tsx` where this string is used for the special A-Z topic.
export type Category = BaseCategory | 'Common Conditions';
export type Topic = string;
export type View = 'categories' | 'topics' | 'content';

export type Source = {
  web?: {
    uri: string;
    title: string;
  };
};

export type ContentData = {
  content: string;
  sources: Source[];
};

export type ContentMap = Record<Topic, ContentData>;