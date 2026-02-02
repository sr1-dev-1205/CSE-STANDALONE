import { useState, useEffect, useRef } from 'react';
import { NavigateFunction } from 'react-router-dom';
import researchData from '../data/researchInnovationData.json';

interface ResearchInnovationCarouselProps {
  navigate: NavigateFunction;
}

const ResearchInnovationCarousel: React.FC<ResearchInnovationCarouselProps> = ({ navigate }) => {
  const researchCarouselRef = useRef<HTMLDivElement>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-transition every 5 seconds with smooth animation
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentCategoryIndex((prev) => (prev + 1) % researchData.tabs.length);
        setIsTransitioning(false);
      }, 500); // Half of transition duration
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleCategoryChange = (index: number) => {
    if (index !== currentCategoryIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentCategoryIndex(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const currentCategory = researchData.tabs[currentCategoryIndex];
  
  // Handle different data structures - some tabs have direct items, others have nested categories
  let items: any[] = [];
  if (currentCategory.content.items && Array.isArray(currentCategory.content.items)) {
    items = currentCategory.content.items.slice(0, 2); // Show only first 2 items
  } else if (currentCategory.content.categories && Array.isArray(currentCategory.content.categories)) {
    // For tabs with categories (like publication), get items from first category
    const firstCategory = currentCategory.content.categories[0];
    if (firstCategory?.items && Array.isArray(firstCategory.items)) {
      items = firstCategory.items.slice(0, 2);
    }
  }

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 sm:p-12 border-2 border-yellow-200">
      {/* Header */}
      <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
        Research & Innovation Hub
      </h4>
      <div className="w-32 h-1 bg-yellow-400 rounded-full mx-auto mb-6"></div>
      
      <p className="text-base sm:text-lg text-gray-700 mb-12 max-w-3xl mx-auto text-center">
        Discover our cutting-edge research projects, innovative solutions, academic publications, 
        patents, and industry consultancy services that drive technological advancement
      </p>

      {/* Horizontal Scrolling Carousell */}
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            ref={researchCarouselRef}
            className="flex animate-scroll-left gap-6 pb-4"
            onMouseEnter={() => {
              const element = researchCarouselRef.current;
              if (element) {
                element.style.animationPlayState = 'paused';
              }
            }}
            onMouseLeave={() => {
              const element = researchCarouselRef.current;
              if (element) {
                element.style.animationPlayState = 'running';
              }
            }}
          >
            {/* Render all categories as cards */}
            {researchData.tabs.flatMap((category, catIndex) => {
              let items: any[] = [];
              if (category.content.items && Array.isArray(category.content.items)) {
                items = category.content.items.slice(0, 2);
              } else if (category.content.categories && Array.isArray(category.content.categories)) {
                const firstCategory = category.content.categories[0];
                if (firstCategory?.items && Array.isArray(firstCategory.items)) {
                  items = firstCategory.items.slice(0, 2);
                }
              }

              return items.map((item, itemIndex) => (
            <div
              key={`${catIndex}-${itemIndex}`}
              className="flex-shrink-0 w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400 flex flex-col h-[500px]"
            >
              <div className="p-6 flex flex-col h-full">
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">{category.name}</span>
              </div>

              {/* Title */}
              <h6 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 h-14">
                {item.title}
              </h6>
              
              {/* Yellow divider */}
              <div className="w-16 h-1 bg-yellow-400 rounded-full mb-4"></div>

              {/* Team Members / Authors / Faculty */}
              <div className="mb-4 min-h-[60px]">
                {(item as any).authors && (
                  <>
                    <p className="text-sm font-bold text-yellow-600 uppercase tracking-wider mb-2">
                      {Array.isArray((item as any).authors) ? 'Team Members' : 'Authors'}
                    </p>
                    {Array.isArray((item as any).authors) ? (
                      <div className="text-sm text-gray-700 space-y-1">
                        {(item as any).authors.slice(0, 2).map((author: string, idx: number) => (
                          <p key={idx} className="line-clamp-1">{author}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700 line-clamp-2">{(item as any).authors}</p>
                    )}
                  </>
                )}
                {(item as any).facultyName && (
                  <>
                    <p className="text-sm font-bold text-yellow-600 uppercase tracking-wider mb-2">
                      Faculty
                    </p>
                    <p className="text-sm text-gray-700">{(item as any).facultyName}</p>
                  </>
                )}
              </div>

              {/* Description - Always show placeholder if missing */}
              <div className="mb-4 flex-grow">
                {(item as any).description ? (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                    {(item as any).description}
                  </p>
                ) : (item as any).outcomes ? (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                    {(item as any).outcomes}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 italic leading-relaxed">
                    Research project focused on advancing knowledge and innovation in this domain.
                  </p>
                )}
              </div>

              {/* Additional Info - Fixed height section */}
              <div className="space-y-2 mb-4 min-h-[80px]">
                {(item as any).funding && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Funding:</span>
                    <span className="text-gray-700 line-clamp-1">{(item as any).funding}</span>
                  </div>
                )}
                {(item as any).status && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Status:</span>
                    <span className="text-gray-700">{(item as any).status}</span>
                  </div>
                )}
                {(item as any).duration && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Duration:</span>
                    <span className="text-gray-700">{(item as any).duration}</span>
                  </div>
                )}
                {(item as any).year && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Year:</span>
                    <span className="text-gray-700">{(item as any).year}</span>
                  </div>
                )}
                {(item as any).journal && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Journal:</span>
                    <span className="text-gray-700 line-clamp-1">{(item as any).journal}</span>
                  </div>
                )}
                {(item as any).patentNumber && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Patent No:</span>
                    <span className="text-gray-700 line-clamp-1">{(item as any).patentNumber}</span>
                  </div>
                )}
                {(item as any).client && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Client:</span>
                    <span className="text-gray-700 line-clamp-1">{(item as any).client}</span>
                  </div>
                )}
              </div>

              {/* Explore Project Button */}
              <div className="pt-3 border-t border-gray-200">
                <button 
                  onClick={() => navigate('/research-innovation')}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <span>Explore Project</span>
                  <span>→</span>
                </button>
              </div>
              </div>
            </div>
          ));
            })}

            {/* Duplicate cards for seamless loop */}
            {researchData.tabs.flatMap((category, catIndex) => {
              let items: any[] = [];
              if (category.content.items && Array.isArray(category.content.items)) {
                items = category.content.items.slice(0, 2);
              } else if (category.content.categories && Array.isArray(category.content.categories)) {
                const firstCategory = category.content.categories[0];
                if (firstCategory?.items && Array.isArray(firstCategory.items)) {
                  items = firstCategory.items.slice(0, 2);
                }
              }

              return items.map((item, itemIndex) => (
            <div
              key={`dup-${catIndex}-${itemIndex}`}
              className="flex-shrink-0 w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400 flex flex-col h-[500px]"
            >
              <div className="p-6 flex flex-col h-full">
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">{category.name}</span>
              </div>

              {/* Title */}
              <h6 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 h-14">
                {item.title}
              </h6>
              
              {/* Yellow divider */}
              <div className="w-16 h-1 bg-yellow-400 rounded-full mb-4"></div>

              {/* Team Members / Authors / Faculty */}
              <div className="mb-4 min-h-[60px]">
                {(item as any).authors && (
                  <>
                    <p className="text-sm font-bold text-yellow-600 uppercase tracking-wider mb-2">
                      {Array.isArray((item as any).authors) ? 'Team Members' : 'Authors'}
                    </p>
                    {Array.isArray((item as any).authors) ? (
                      <div className="text-sm text-gray-700 space-y-1">
                        {(item as any).authors.slice(0, 2).map((author: string, idx: number) => (
                          <p key={idx} className="line-clamp-1">{author}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700 line-clamp-2">{(item as any).authors}</p>
                    )}
                  </>
                )}
                {(item as any).facultyName && (
                  <>
                    <p className="text-sm font-bold text-yellow-600 uppercase tracking-wider mb-2">
                      Faculty
                    </p>
                    <p className="text-sm text-gray-700">{(item as any).facultyName}</p>
                  </>
                )}
              </div>

              {/* Description - Always show placeholder if missing */}
              <div className="mb-4 flex-grow">
                {(item as any).description ? (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                    {(item as any).description}
                  </p>
                ) : (item as any).outcomes ? (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                    {(item as any).outcomes}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 italic leading-relaxed">
                    Research project focused on advancing knowledge and innovation in this domain.
                  </p>
                )}
              </div>

              {/* Additional Info - Fixed height section */}
              <div className="space-y-2 mb-4 min-h-[80px]">
                {(item as any).funding && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Funding:</span>
                    <span className="text-gray-700 line-clamp-1">{(item as any).funding}</span>
                  </div>
                )}
                {(item as any).status && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Status:</span>
                    <span className="text-gray-700">{(item as any).status}</span>
                  </div>
                )}
                {(item as any).duration && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Duration:</span>
                    <span className="text-gray-700">{(item as any).duration}</span>
                  </div>
                )}
                {(item as any).year && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Year:</span>
                    <span className="text-gray-700">{(item as any).year}</span>
                  </div>
                )}
                {(item as any).journal && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Journal:</span>
                    <span className="text-gray-700 line-clamp-1">{(item as any).journal}</span>
                  </div>
                )}
                {(item as any).patentNumber && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Patent No:</span>
                    <span className="text-gray-700 line-clamp-1">{(item as any).patentNumber}</span>
                  </div>
                )}
                {(item as any).client && (
                  <div className="flex items-start text-sm">
                    <span className="font-bold text-yellow-600 mr-2 whitespace-nowrap">Client:</span>
                    <span className="text-gray-700 line-clamp-1">{(item as any).client}</span>
                  </div>
                )}
              </div>

              {/* Explore Project Button */}
              <div className="pt-3 border-t border-gray-200">
                <button 
                  onClick={() => navigate('/research-innovation')}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2.5 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <span>Explore Project</span>
                  <span>→</span>
                </button>
              </div>
              </div>
            </div>
          ));
            })}
          </div>
        </div>
      </div>

      {/* Explore Button */}
      <div className="text-center">
        <button
          onClick={() => navigate('/research-innovation')}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-lg inline-flex items-center gap-2"
        >
          <span>Explore All Research & Innovation</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default ResearchInnovationCarousel;
