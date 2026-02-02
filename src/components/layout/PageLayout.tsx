import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from '../ScrollToTop';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  showScrollToTop?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title = 'Hindusthan Institute of Technology',
  description = 'Leading engineering education with excellence in research and innovation',
  className = 'pt-44 min-h-screen bg-gray-50',
  showScrollToTop = true
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" type="image/x-icon" href={`${import.meta.env.BASE_URL}Logo.jpg`} />
      </Helmet>
      
      <div className={className}>
        {children}
      </div>
      
      {showScrollToTop && <ScrollToTop />}
    </>
  );
};

export default PageLayout;