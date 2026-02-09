import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Brain,
  X,
  Mail,
  User,
  Briefcase,
  Info,
  FileText,
  PenTool,
  CalendarDays,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface FacultyMember {
  id: number;
  name: string;
  designation: string;
  specialization: string;
  experience: string;
  education: string;
  image?: string;
  email: string;
  description: string;
  publications?: string | number;
  patents?: string | number;
  joiningDate?: string;
  date_of_joining?: string;
}

const getHighestDegree = (education: string): string => {
  const degreeOrder = ['Ph.D', 'PhD', 'D.Sc', 'M.E', 'M.Tech', 'M.Sc', 'MBA', 'MCA', 'B.E', 'B.Tech', 'B.Sc', 'BCA'];
  const found = degreeOrder.find((degree) => education?.toUpperCase().includes(degree.toUpperCase()));
  return found || education;
};

const getImageUrl = (img?: string) => {
  const defaultImg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5GYWN1bHR5PC90ZXh0Pjwvc3ZnPg==';
  if (!img) return defaultImg;
  if (img.startsWith('http')) return img;
  const cleanPath = img.replace(/^public\//, '').replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

interface FacultyCarouselProps {
  faculty?: FacultyMember[];
  departmentName?: string;
}

interface FacultyModalProps {
  member: FacultyMember;
  onClose: () => void;
}

const FacultyCarousel: React.FC<FacultyCarouselProps> = ({
  faculty = [],
  departmentName = 'Department',
}) => {
  const [selectedMember, setSelectedMember] = useState<FacultyMember | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sliderRef = useRef<Slider | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 } // Start autoplay when 20% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      
      // Check initial visibility immediately (for sections already in view on page load)
      const rect = sectionRef.current.getBoundingClientRect();
      const isInitiallyVisible = (
        rect.top < window.innerHeight &&
        rect.bottom > 0
      );
      if (isInitiallyVisible) {
        setIsInView(true);
      }
    }

    return () => observer.disconnect();
  }, []);

  // Control autoplay based on section visibility
  useEffect(() => {
    if (sliderRef.current) {
      if (isInView) {
        // Start autoplay when section comes into view
        sliderRef.current.slickPlay();
      } else {
        // Pause autoplay when section is out of view
        sliderRef.current.slickPause();
      }
    }
  }, [isInView]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false, // Disabled by default, controlled by IntersectionObserver
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const openModal = (member: FacultyMember) => setSelectedMember(member);
  const closeModal = () => setSelectedMember(null);

  return (
    <div ref={sectionRef} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg relative">
      {/* Header and buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
        <div>
          <h4 className="text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Meet our Faculty</h4>
          <p className="text-gray-600">Faculty members of {departmentName} Department</p>
        </div>

        {faculty.length > 3 && (
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              aria-label="Previous"
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-yellow-500 flex items-center justify-center"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              aria-label="Next"
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-yellow-500 flex items-center justify-center"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Slider section */}
       {faculty.length > 0 ? (
        <Slider ref={sliderRef} {...sliderSettings}>
          {faculty.map((member) => (
            <div key={member.id} className="px-3">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border border-gray-200 hover:border-yellow-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={getImageUrl(member.image)}
                    alt={`Faculty photo of ${member.name}`}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite loop
                      target.src = getImageUrl();
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                 

                  {/* Experience */}
                  {member.experience && (
                    <div className="absolute bottom-4 left-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                      {member.experience}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h5 className="text-xl font-bold text-gray-900 group-hover:text-yellow-700 transition-colors mb-1">
                      {member.name}
                    </h5>
                    {member.designation && (
                      <p className="text-yellow-600 font-semibold text-sm">{member.designation}</p>
                    )}

                    {/* Fixed size specialization icon with consistent alignment */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <Brain className="flex-shrink-0 h-5 w-5 text-purple-600" />
                      <span>
                        <span className="font-medium text-gray-800">Specialization:</span>{' '}
                        {member.specialization || '—'}
                      </span>
                    </div>

                    {member.education && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                        <GraduationCap className="flex-shrink-0 h-5 w-5 text-blue-600" />
                        <span>
                          <strong>Education:</strong> {getHighestDegree(member.education)}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => openModal(member)}
                      className="text-yellow-600 hover:text-yellow-700 text-sm font-medium flex items-center space-x-1 group mt-3"
                    >
                      <span>View Profile</span>
                      <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-600">No faculty information available at this time</p>
        </div>
      )}

      {selectedMember && <FacultyModal member={selectedMember} onClose={closeModal} />}
    </div>
  );
};

const FacultyModal: React.FC<FacultyModalProps> = ({ member, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? dateStr
      : date.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
  };

  // Use joiningDate or fallback to date_of_joining
  const actualJoiningDate = member.joiningDate || member.date_of_joining;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto backdrop-blur-sm px-4 py-12">
      <div
        ref={modalRef}
        className={`relative bg-white w-full max-w-3xl mx-auto rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Header */}
        <div className="bg-amber-100 pb-4 pt-6 px-6 sm:px-8 relative flex flex-col items-center justify-center">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-amber-800 transition"
            onClick={handleClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="w-50 h-36 rounded-full overflow-hidden mx-auto border-4 border-amber-300 shadow-lg">
            <img
              src={getImageUrl(member.image)}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = getImageUrl();
              }}
            />
          </div>

          <div className="text-center mt-3">
            <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
            <p className="text-amber-600 text-base mt-1">
              {member.designation || '—'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-4 text-sm text-gray-800">
          <div className="space-y-4 divide-y divide-gray-200">
            <div className="flex items-start gap-3 pt-0">
              <GraduationCap className="h-6 w-6 text-orange-500 mt-0.5" />
              <div>
                <p className="font-semibold text-base">Education</p>
                <p className="text-base">{member.education || '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <User className="h-6 w-6 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-semibold text-base">Specialization</p>
                <p className="text-base">{member.specialization || '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <Briefcase className="h-6 w-6 text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold text-base">Experience</p>
                <p className="text-base">{member.experience || '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <CalendarDays className="h-6 w-6 text-red-500 mt-0.5" />
              <div>
                <p className="font-semibold text-base">Date of Joining</p>
                <p className="text-base">{formatDate(actualJoiningDate)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <PenTool className="h-6 w-6 text-purple-600 mt-0.5" />
              <div>
                <p className="font-semibold text-base">Patents</p>
                <p className="text-base">{member.patents || '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <FileText className="h-6 w-6 text-pink-600 mt-0.5" />
              <div>
                <p className="font-semibold text-base">Number of Publications</p>
                <p className="text-base">
                  {member.publications !== undefined ? member.publications : '—'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <Mail className="h-6 w-6 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-base">Email</p>
                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-blue-600 underline break-words hover:text-blue-800 text-base"
                  >
                    {member.email}
                  </a>
                ) : (
                  <p className="text-base">—</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <BookOpen className="h-7 w-7 text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-base">Description</p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                  {member.description || '—'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyCarousel;
