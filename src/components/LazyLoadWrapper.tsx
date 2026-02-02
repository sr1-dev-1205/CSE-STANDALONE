import React, { useState, useEffect, useRef } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  height?: string;
  delay?: number;
}

const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({ 
  children, 
  height = 'min-h-[200px]', // Default min-height class if passed as class, or just style
  delay = 500
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Small delay for smooth visual effect, but DOM is already there
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div ref={ref} className="relative" style={{ minHeight: height.includes('px') ? height : undefined }}>
      {/* Content - Always rendered to maintain layout height */}
      <div 
        className={`transition-all duration-700 ease-in-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {children}
      </div>

      {/* Loading Overlay - Absolute to not affect layout */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <LoadingSpinner size="lg" text="Loading content..." />
        </div>
      )}
    </div>
  );
};

export default LazyLoadWrapper;