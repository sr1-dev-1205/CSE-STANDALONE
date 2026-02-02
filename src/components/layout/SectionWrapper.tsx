import React from 'react';
import LazyLoadWrapper from '../LazyLoadWrapper';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  lazy?: boolean;
  lazyHeight?: string;
  lazyDelay?: number;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className = 'py-10',
  containerClassName = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  lazy = false,
  lazyHeight = '200px',
  lazyDelay = 500
}) => {
  const content = (
    <section id={id} className={className}>
      <div className={containerClassName}>
        {children}
      </div>
    </section>
  );

  if (lazy) {
    return (
      <LazyLoadWrapper height={lazyHeight} delay={lazyDelay}>
        {content}
      </LazyLoadWrapper>
    );
  }

  return content;
};

export default SectionWrapper;