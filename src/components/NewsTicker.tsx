import React, { useState, useEffect, useRef } from 'react';
import {
  Megaphone, Star, Calendar, Trophy, AlertCircle,
  Zap, BookOpen
} from 'lucide-react';
import newsTickerData from '../data/newsTickerData.json';

interface NewsItem {
  id: number;
  text: string;
  type: 'announcement' | 'news' | 'event' | 'urgent' | 'achievement' | 'facility';
  url?: string;
  isActive: boolean;
}

interface NewsTickerProps {
  newsItems?: NewsItem[];
  speed?: number;
  pauseOnHover?: boolean;
}

// Get news items from newsTickerData and filter out admission-related items
const getNewsItems = (): NewsItem[] => {
  const allNews = newsTickerData?.newsTicker?.newsItems || [];
  
  // Filter out any news containing "admission" (case-insensitive)
  return allNews.filter((item: any) => 
    !item.text.toLowerCase().includes('admission')
  );
};

const defaultNewsItems: NewsItem[] = getNewsItems();

const NewsTicker: React.FC<NewsTickerProps> = ({ 
  newsItems = defaultNewsItems, 
  speed = 60, 
  pauseOnHover = true 
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(100);
  const scrollingRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const activeNews = newsItems.filter(item => item.isActive);

  const getNewsIcon = (type: string) => {
    switch (type) {
      case 'announcement': return <Star className="h-3 w-3 text-yellow-700" />;
      case 'event': return <Calendar className="h-3 w-3 text-blue-700" />;
      case 'achievement': return <Trophy className="h-3 w-3 text-orange-700" />;
      case 'urgent': return <AlertCircle className="h-3 w-3 text-red-700" />;
      case 'facility': return <BookOpen className="h-3 w-3 text-green-700" />;
      case 'news':
      default: return <Zap className="h-3 w-3 text-purple-700" />;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Only show the ticker when at the very top of the page
      if (scrollTop <= 5) { // Reduced threshold for better mobile responsiveness
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const animate = (timestamp: number) => {
    if (!scrollingRef.current) return;

    if (lastTimeRef.current === 0) {
      lastTimeRef.current = timestamp;
    }

    if (!isPaused) {
      const deltaTime = timestamp - lastTimeRef.current;
      const moveDistance = (deltaTime / 1000) * (200 / speed);
      setCurrentPosition(prev => (prev - moveDistance <= -100 ? 100 : prev - moveDistance));
    }

    lastTimeRef.current = timestamp;
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (activeNews.length > 0 && isVisible) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [activeNews.length, speed, isPaused, isVisible]);

  useEffect(() => {
    if (scrollingRef.current) {
      scrollingRef.current.style.transform = `translateX(${currentPosition}%)`;
    }
  }, [currentPosition]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  if (activeNews.length === 0) return null;

  return (
    <div
      className={`fixed top-[60px] sm:top-[68px] md:top-[76px] lg:top-[84px] left-0 right-0 z-40 bg-yellow-500 border-b border-yellow-600 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="relative overflow-hidden h-10 sm:h-12">
        <div className="flex items-center h-full relative">
          <div className="flex-shrink-0 px-6 flex items-center space-x-3 bg-yellow-600/30">
            <div className="bg-white/30 p-2 rounded-full">
              <Megaphone className="h-4 w-4 text-gray-900" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-sm text-gray-900 tracking-wide">
                LATEST UPDATES
              </span>
            </div>
          </div>

          <div
            className="flex-1 overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={scrollingRef}
              className="scrolling-content flex items-center h-full whitespace-nowrap"
              style={{ willChange: 'transform' }}
            >
              {activeNews.map((item, index) => (
                <span key={item.id} className="inline-flex items-center">
                  <span className="flex items-center space-x-2 px-6">
                    {getNewsIcon(item.type)}
                    {item.url ? (
                      <a href={item.url} className="hover:underline font-medium text-gray-900">
                        {item.text}
                      </a>
                    ) : (
                      <span className="font-medium text-gray-900">{item.text}</span>
                    )}
                  </span>
                  {index < activeNews.length - 1 && (
                    <span className="text-gray-700/60 px-4 text-lg">•</span>
                  )}
                </span>
              ))}

              <span className="text-gray-700/60 px-8 text-lg">•</span>

              {activeNews.map((item, index) => (
                <span key={`repeat-${item.id}`} className="inline-flex items-center">
                  <span className="flex items-center space-x-2 px-6">
                    {getNewsIcon(item.type)}
                    {item.url ? (
                      <a href={item.url} className="hover:underline font-medium text-gray-900">
                        {item.text}
                      </a>
                    ) : (
                      <span className="font-medium text-gray-900">{item.text}</span>
                    )}
                  </span>
                  {index < activeNews.length - 1 && (
                    <span className="text-gray-700/60 px-4 text-lg">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {isPaused && (
            <div className="absolute top-1 right-4 bg-gray-900/20 text-gray-900 px-2 py-0.5 rounded-full text-xs font-medium">
              Paused
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;