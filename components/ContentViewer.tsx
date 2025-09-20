import React, { useMemo, useState, useRef, useEffect } from 'react';
import type { Category, Topic, ContentData } from '../types';

const ContentSkeleton: React.FC = () => (
  <div className="space-y-8 animate-pulse mt-4">
    <div className="space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
    <div className="space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
    </div>
  </div>
);

interface ContentViewerProps {
  category: Category;
  topic: Topic;
  data: ContentData | null;
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
  onRetry: () => void;
}

const SimpleMarkdownParser: React.FC<{ text: string; searchTerm?: string }> = ({ text, searchTerm }) => {
  const lowercasedTerm = searchTerm?.trim().toLowerCase();

  // FIX: Moved type definitions out of the `useMemo` hook so they can be accessed by the `renderSections` function.
  type ListItem = { text?: string; condition?: string; linkText?: string; url?: string };
  type Section = {
    title: string;
    items: ListItem[];
    paragraphs: string[];
  };

  const parsedContent = useMemo(() => {
    const sections: Section[] = [];
    const introLines: string[] = [];
    let currentSection: Section | null = null;

    text.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('### ')) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = { title: trimmedLine.substring(4), items: [], paragraphs: [] };
      } else if (trimmedLine.startsWith('* ')) {
        if (currentSection) {
          const content = trimmedLine.substring(2);
          const linkMatch = content.match(/^(.+?):\s*\[(.+?)\]\((.+?)\)/);
          if (linkMatch && linkMatch.length === 4) {
            currentSection.items.push({
              condition: linkMatch[1].trim(),
              linkText: linkMatch[2],
              url: linkMatch[3],
            });
          } else {
            currentSection.items.push({ text: content });
          }
        }
      } else {
        if (currentSection) {
            currentSection.paragraphs.push(line);
        } else if (trimmedLine) {
            introLines.push(trimmedLine);
        }
      }
    });

    if (currentSection) {
      sections.push(currentSection);
    }
    
    // Trim trailing empty paragraphs from sections for cleaner rendering
    sections.forEach(section => {
        while (section.paragraphs.length > 0 && section.paragraphs[section.paragraphs.length - 1].trim() === '') {
            section.paragraphs.pop();
        }
    });

    return { intro: introLines.join('\n'), sections };
  }, [text]);

  const filteredSections = useMemo(() => {
    if (!lowercasedTerm) {
      return parsedContent.sections;
    }
    return parsedContent.sections
      .map(section => ({
        ...section,
        items: section.items.filter(item =>
          item.condition && item.condition.toLowerCase().includes(lowercasedTerm)
        ),
      }))
      .filter(section => section.items.length > 0);
  }, [parsedContent.sections, lowercasedTerm]);

  const renderSections = (sections: Section[]) => (
     sections.map(section => (
        <div key={section.title}>
          <h3 className="text-2xl font-bold mt-8 mb-3 text-gray-900 dark:text-white border-b-2 border-blue-100 dark:border-gray-700 pb-2">{section.title}</h3>
          
          {section.paragraphs.length > 0 && (
            <div className="whitespace-pre-wrap leading-relaxed my-4">
              {section.paragraphs.join('\n').trim()}
            </div>
          )}

          {section.items.length > 0 &&
            <ul className="list-none pl-0 my-4 space-y-3">
              {section.items.map((item, index) => (
                <li key={`${item.condition || item.text}-${index}`} className="text-lg font-medium">
                  {item.url && item.condition && item.linkText ? (
                    <>
                      <span>{item.condition}: </span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {item.linkText}
                      </a>
                    </>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </ul>
          }
        </div>
      ))
  );

  return (
    <div className="prose dark:prose-invert lg:prose-lg max-w-none text-gray-800 dark:text-gray-200">
      {!lowercasedTerm && parsedContent.intro && <p className="leading-relaxed mb-4 whitespace-pre-wrap">{parsedContent.intro}</p>}
      
      {lowercasedTerm && filteredSections.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">No conditions found for "{searchTerm}".</p>
      ) : (
        renderSections(filteredSections)
      )}
    </div>
  );
};

const ContentViewer: React.FC<ContentViewerProps> = ({ category, topic, data, isLoading, error, onBack, onRetry }) => {
  const [azSearchTerm, setAzSearchTerm] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const isAZTopic = topic === 'Foot & Ankle Conditions (A-Z)';

  useEffect(() => {
    setAzSearchTerm('');
  }, [topic]);

  useEffect(() => {
    if (isAZTopic && azSearchTerm && contentRef.current) {
      setTimeout(() => {
        const firstHeader = contentRef.current?.querySelector('h3');
        if (firstHeader) {
          firstHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [azSearchTerm, isAZTopic, data]);

  return (
    <div className="animate-fade-in">
       <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200 mr-4"
          aria-label="Back to topics"
        >
          Back
        </button>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{category}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{topic}</h2>
        </div>
      </div>

      {isLoading && <ContentSkeleton />}
      
      {error && (
        <div className="text-center py-10 px-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">An Error Occurred</h3>
          <p className="mt-2 text-sm text-red-600 dark:text-red-300">{error}</p>
          <button
            onClick={onRetry}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="mt-4">
          {isAZTopic && (
            <div className="mb-8 relative">
              <input
                type="search"
                placeholder="Search for a condition..."
                value={azSearchTerm}
                onChange={(e) => setAzSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search conditions"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
            </div>
          )}

          <div ref={contentRef}>
            <SimpleMarkdownParser text={data.content} searchTerm={isAZTopic ? azSearchTerm : undefined} />
          </div>

          {data.sources && data.sources.length > 0 && (
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Sources & Links</h4>
              <ul className="space-y-2">
                {data.sources.map((source, index) => (
                  source.web && (
                    <li key={index}>
                      <a 
                        href={source.web.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline break-words"
                      >
                        {source.web.title || source.web.uri}
                      </a>
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentViewer;
