import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Home, Target, BarChart2, BookOpen, Lightbulb, 
  Settings, Award, Users, GraduationCap, Building, Factory, FlaskConical, 
  UserCheck, FolderOpen, Microscope, Briefcase, Calendar
} from 'lucide-react';

interface Section {
  id: string;
  label: string;
}

const sectionIcons: Record<string, React.ElementType> = {
  'about-department': Home,
  'department-vision-mission': Target,
  'psos-peos-pos': BarChart2,
  'obe': Lightbulb,
  'teaching-methodology': GraduationCap,
  'research-innovation': Microscope,
  'placements': Briefcase,
  'industry': Factory,
  'events-organised': Calendar,
  'clubs': Users,
  'teaching': Settings,
  'facilities': Building,
  'labs': FlaskConical,
  'faculty': UserCheck,
  'resources': FolderOpen
};

interface DepartmentSectionNavProps {
  sections: Section[];
}

const DepartmentSectionNav: React.FC<DepartmentSectionNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollTimeout = React.useRef<number | null>(null);

  useEffect(() => {
    // Debounced scroll handler for better performance and accuracy
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        const scrollPosition = window.scrollY + 200; // Offset for better detection
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Special case: if at the very top of the page
        if (window.scrollY < 100) {
          setActiveSection(sections[0]?.id || '');
          return;
        }

        // Special case: if near the bottom of the page
        if (window.scrollY + windowHeight >= documentHeight - 100) {
          setActiveSection(sections[sections.length - 1]?.id || '');
          return;
        }

        // Find the section that is currently in view
        let currentSection = sections[0]?.id || '';
        
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (!element) continue;

          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          // Check if the section is in the viewport (with some offset)
          // A section is "active" if its top is above the scroll position + offset
          if (elementTop <= scrollPosition) {
            currentSection = section.id;
          } else {
            // We've gone past the current scroll position, stop here
            break;
          }
        }

        setActiveSection(currentSection);
      }, 50); // 50ms debounce
    };

    // Initial call
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate the position with offset for scroll-mt-32 (128px)
      const yOffset = -150; // Slightly more than scroll-mt-32 for better visibility
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      // Set active section immediately for better UX
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button - Positioned at bottom-left for better ergonomics */}
      <div className="lg:hidden fixed left-3 sm:left-4 bottom-4 sm:bottom-6 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-yellow-500 text-gray-900 p-2.5 sm:p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-110"
          aria-label="Toggle Section Navigation"
        >
          {isMobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
        </button>
      </div>
  
      {/* Navigation Container */}
      <nav
        className={`
          fixed lg:sticky top-0 lg:top-28 left-0
          h-auto lg:h-[calc(100vh-12rem)] lg:max-h-[calc(100vh-12rem)]
          w-64 sm:w-72 max-w-[85vw]
          bg-white lg:bg-yellow-500
          lg:border lg:border-yellow-200/60 lg:rounded-xl
          shadow-2xl lg:shadow-none
          transform transition-transform duration-300 ease-in-out z-50 lg:z-0
          rounded-br-xl
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div 
          className="h-full max-h-[60vh] lg:max-h-full overflow-y-auto p-4 sm:p-5 lg:p-3 space-y-1"
          onWheel={(e) => {
            const element = e.currentTarget;
            const scrollTop = element.scrollTop;
            const scrollHeight = element.scrollHeight;
            const height = element.clientHeight;
            const wheelDelta = e.deltaY;
            const isDeltaPositive = wheelDelta > 0;

            // Check if we're at the top or bottom of the scrollable area
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + height >= scrollHeight;

            // Prevent scroll propagation to parent if we can still scroll within this element
            if ((isDeltaPositive && !isAtBottom) || (!isDeltaPositive && !isAtTop)) {
              e.stopPropagation();
            }
          }}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0,0,0,0.2) transparent'
          }}
        >
          <div className="flex items-center justify-between mb-3 lg:hidden pb-2 border-b border-gray-200">
            <span className="font-bold text-gray-800 text-sm">Sections</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
          <ul className="space-y-0">
            {sections.map((section) => {
              const Icon = sectionIcons[section.id] || ChevronRight;
                
              return (
                <li key={section.id} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`
                      group relative w-full text-left flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition hover:bg-yellow-100 border-r border-yellow-400/30 last:border-r-0
                      ${activeSection === section.id 
                        ? 'text-gray-900 font-bold bg-yellow-200/50' 
                        : 'text-gray-700 font-medium'
                      }
                    `}
                  >
                     {/* Active Indicator Bar */}
                     <span className={`
                       absolute left-0 top-1/2 -translate-y-1/2 h-3 sm:h-4 w-1 rounded-r-full transition-all duration-300
                       ${activeSection === section.id ? 'bg-yellow-600 opacity-100' : 'bg-transparent opacity-0'}
                     `} />
  
                     {/* Icon */}
                     <Icon className={`w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 transition-colors ${activeSection === section.id ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`} />
  
                     <span className={`flex-1 transition-transform duration-200 ${activeSection === section.id ? 'translate-x-1' : 'group-hover:translate-x-0.5'}`}>
                       {section.label}
                     </span>
                       
                     {activeSection === section.id && (
                       <ChevronRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-yellow-700 opacity-100 transition-opacity" />
                     )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
        
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default DepartmentSectionNav;
