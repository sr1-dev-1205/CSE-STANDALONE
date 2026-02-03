import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

interface Portal {
  name: string;
  url: string;
  logo?: string;
  category: 'job' | 'internship';
}

const OpportunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  
  const portals: Portal[] = [
    // Job Portals
    { name: 'LinkedIn', url: 'https://www.linkedin.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', category: 'job' },
    { name: 'Naukri', url: 'https://www.naukri.com', logo: `${import.meta.env.BASE_URL}opportunities-logos/naukri.png`, category: 'job' },
    { name: 'Indeed', url: 'https://www.indeed.co.in', logo: `${import.meta.env.BASE_URL}opportunities-logos/indeed.png`, category: 'job' },
    { name: 'Shine', url: 'https://www.shine.com', logo: `${import.meta.env.BASE_URL}opportunities-logos/Shine.png`, category: 'job' },
    { name: 'TimesJobs', url: 'https://www.timesjobs.com', logo: `${import.meta.env.BASE_URL}opportunities-logos/timesjobs.png`, category: 'job' },
    { name: 'Freshersworld', url: 'https://www.freshersworld.com', logo: `${import.meta.env.BASE_URL}opportunities-logos/freshersworld.png`, category: 'job' },
    { name: 'Glassdoor', url: 'https://www.glassdoor.co.in', logo: `${import.meta.env.BASE_URL}opportunities-logos/Glassdoor_Logo_2023.svg`, category: 'job' },
    { name: 'Monster / Foundit', url: 'https://www.foundit.in', logo: `${import.meta.env.BASE_URL}opportunities-logos/foundit.png`, category: 'job' },
    { name: 'Apna', url: 'https://apna.co', logo: `${import.meta.env.BASE_URL}opportunities-logos/apna.png`, category: 'job' },
    
    // Internship Portals
    { name: 'LetsIntern / Twenty19', url: 'https://www.letsintern.com', logo: `${import.meta.env.BASE_URL}opportunities-logos/letsintern.png`, category: 'internship' },
    { name: 'Internshala', url: 'https://www.internshala.com', logo: `${import.meta.env.BASE_URL}internshala.png`, category: 'internship' },
    { name: 'AngelList (Wellfound)', url: 'https://wellfound.com', logo: `${import.meta.env.BASE_URL}opportunities-logos/Wellfound_idDv186p4l_1.png`, category: 'internship' },
    { name: 'Unstop', url: 'https://unstop.com', logo: `${import.meta.env.BASE_URL}opportunities-logos/unstop-logo.svg`, category: 'internship' },
    { name: 'MeaInternship', url: 'https://www.bing.com/ck/a?!&&p=9b2451c18ce980b949fa6d380aafed68e21edfd48118bd559c7c439bf37b12f6JmltdHM9MTc2OTk5MDQwMA&ptn=3&ver=2&hsh=4&fclid=1da4d9d2-15a4-632e-101f-cc12143762c6&psq=mea+internship&u=a1aHR0cHM6Ly9pbnRlcm5zaGlwLm1lYS5nb3YuaW4v', logo: `${import.meta.env.BASE_URL}opportunities-logos/meainternship.png`, category: 'internship' },
    { name: 'Internworld', url: 'https://www.internworld.in', logo: `${import.meta.env.BASE_URL}opportunities-logos/internworld.png`, category: 'internship' },
    { name: 'Handshake', url: 'https://www.joinhandshake.com', logo: `${import.meta.env.BASE_URL}opportunities-logos/handshake.png`, category: 'internship' },
  ];

  const jobPortals = portals.filter(p => p.category === 'job');
  const internshipPortals = portals.filter(p => p.category === 'internship');

  const PortalCard: React.FC<{ portal: Portal }> = ({ portal }) => (
    <a
      href={portal.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-gray-100 hover:border-yellow-400"
    >
      {/* Card Content */}
      <div className="p-6 sm:p-8 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[240px]">
        {/* Logo Container */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 shadow-inner group-hover:shadow-lg transition-all duration-300">
          <img
            src={portal.logo}
            alt={`${portal.name} logo`}
            className="w-full h-full object-contain filter grayscale-0 group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              // Fallback to first letter if logo fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.fallback-text')) {
                const fallback = document.createElement('div');
                fallback.className = 'fallback-text text-4xl font-bold text-yellow-600';
                fallback.textContent = portal.name.charAt(0);
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
        
        {/* Portal Name */}
        <h3 className="text-base sm:text-lg font-bold text-gray-800 text-center mb-2 group-hover:text-yellow-600 transition-colors duration-300">
          {portal.name}
        </h3>
        
        {/* Category Badge */}
        <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
          {portal.category === 'job' ? 'Job Portal' : 'Internship Portal'}
        </span>
        
        {/* External Link Icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ExternalLink className="w-5 h-5 text-yellow-500" />
        </div>
        
        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </a>
  );

  return (
    <PageLayout
      title="Career Opportunities - Job & Internship Portals"
      description="Explore top job and internship portals to kickstart your career"
      className="min-h-screen bg-gray-50"
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 px-4 sm:px-6 lg:px-8 pb-10">
        {/* Back Button - Matching Magazine Page Style */}
        <div className="fixed top-[200px] left-9 z-50">
          <div
            className="group relative w-12 h-12 rounded-full bg-yellow-500 shadow-lg flex items-center justify-center cursor-pointer hover:bg-yellow-600 transition-all duration-300"
            onClick={() => navigate(-1)}
          >
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Back
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-16">

          {/* Page Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Career <span className="text-yellow-600">Opportunities</span>
            </h1>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the best platforms to find your dream job or internship
            </p>
          </div>

          {/* Job Portals Section */}
          <section className="mb-12 sm:mb-16">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Job Portals
              </h2>
              <div className="w-16 h-1 bg-yellow-500 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {jobPortals.map((portal, index) => (
                <PortalCard key={index} portal={portal} />
              ))}
            </div>
          </section>

          {/* Internship Portals Section */}
          <section>
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Internship Portals
              </h2>
              <div className="w-16 h-1 bg-yellow-500 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {internshipPortals.map((portal, index) => (
                <PortalCard key={index} portal={portal} />
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 sm:p-12 text-white shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Start Your Career Journey?
            </h3>
            <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto">
              Explore these platforms and take the first step towards your professional goals
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OpportunitiesPage;
