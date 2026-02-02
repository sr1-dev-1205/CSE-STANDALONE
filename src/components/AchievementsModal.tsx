import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faChevronLeft, 
  faChevronRight, 
  faTrophy, 
  faUsers, 
  faAward,
  faClipboardList,
  faHashtag,
  faUserGraduate,
  faCalendarAlt,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';

interface Achievement {
  id: number;
  title: string;
  image: string;
}

interface TeamMember {
  name: string;
  rollNo: string;
  year: string;
  semester: string;
  batch: string;
}

interface Team {
  teamId: number;
  teamName: string;
  award: string;
  achievements: Achievement[];
  problemStatement: string;
  teamMembers: TeamMember[];
}

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
}

const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose, teams }) => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Memoize current team for performance
  const currentTeam = useMemo(() => teams[currentTeamIndex], [teams, currentTeamIndex]);

// Handle body scroll lock and ESC key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Team navigation handlers
const handlePreviousTeam = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTeamIndex((prev) => (prev - 1 + teams.length) % teams.length);
      setIsTransitioning(false);
    }, 500);
  }, [teams.length]);

  const handleNextTeam = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTeamIndex((prev) => (prev + 1) % teams.length);
      setIsTransitioning(false);
    }, 500);
  }, [teams.length]);

  if (!isOpen || teams.length === 0 || !currentTeam) return null;
  if (typeof document === 'undefined' || !document.body) return null;

  const isTeam1 = currentTeam.teamId === 1;
  const gradientClass = 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600';

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3"
      style={{ animation: 'fadeIn 0.25s ease-out' }}
    >
      <div 
        className={`relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-in-out ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{ 
          animation: isTransitioning ? '' : 'slideUp 0.35s ease-out',
          willChange: 'opacity, transform',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(251, 191, 36, 0.1)'
        }}
      >
        {/* Close Button - Yellow Theme */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-xl group"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Team Navigation Arrows - Yellow Theme */}
        {teams.length > 1 && (
          <>
            <button
              onClick={handlePreviousTeam}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-300 hover:scale-110 shadow-xl group"
              aria-label="Previous Team"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleNextTeam}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-300 hover:scale-110 shadow-xl group"
              aria-label="Next Team"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </>
        )}

        {/* Content Container - Smooth Scroll */}
        <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-gray-100">
          {/* Compact Header with Yellow Gradient */}
          <div className={`${gradientClass} px-5 py-4 text-white relative overflow-hidden`}>
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, white 2px, transparent 2px)',
                backgroundSize: '40px 40px',
                animation: 'float 20s ease-in-out infinite'
              }} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                  <FontAwesomeIcon icon={faTrophy} className="w-4 h-4 animate-pulse" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-center tracking-tight">
                  CSE Achievements
                </h2>
              </div>
              
              {/* Compact Team Badge */}
              <div className="flex justify-center mt-2">
                <div className="inline-flex items-center gap-1.5 bg-white/30 backdrop-blur-md px-3 py-1 rounded-full border-2 border-white/50 shadow-xl">
                  <FontAwesomeIcon icon={faAward} className="w-3 h-3" />
                  <span className="font-bold text-xs tracking-wide">
                    {currentTeam.teamName} · {currentTeam.award}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Compact Layout */}
          <div className="p-4 bg-gradient-to-br from-gray-50 to-white">
            {/* Horizontal Scrolling Image Carousel - Same as Industry Oriented */}
            <div className="relative mb-4">
              <div className="overflow-hidden rounded-xl">
                <div 
                  ref={carouselRef}
                  className="flex gap-4 pb-2"
                  style={{
                    animation: `scroll-achievements ${currentTeam.achievements.length * 5}s linear infinite`,
                  }}
                  onMouseEnter={() => {
                    const element = carouselRef.current;
                    if (element) {
                      element.style.animationPlayState = 'paused';
                    }
                  }}
                  onMouseLeave={() => {
                    const element = carouselRef.current;
                    if (element) {
                      element.style.animationPlayState = 'running';
                    }
                  }}
                >
                  {/* Render all achievement images - Repeat 4 times if only 1 image */}
                  {(currentTeam.achievements.length === 1
                    ? [...currentTeam.achievements, ...currentTeam.achievements, ...currentTeam.achievements, ...currentTeam.achievements]
                    : currentTeam.achievements
                  ).map((achievement, index) => (
                    <div 
                      key={`team-${currentTeam.teamId}-achievement-${achievement.id}-${index}`}
                      className="flex-shrink-0 w-80 group relative"
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-xl ring-2 ring-yellow-400/20">
                        <img
                          src={achievement.image.startsWith('/') ? `${import.meta.env.BASE_URL}${achievement.image.slice(1)}` : achievement.image}
                          alt={achievement.title}
                          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        
                        {/* Image Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                          <p className="text-sm font-bold line-clamp-2">{achievement.title}</p>
                        </div>
                        
                        {/* Image Number Badge */}
                        <div className="absolute top-2 right-2 bg-yellow-500 px-2 py-0.5 rounded-full text-white text-xs font-bold shadow-lg">
                          {currentTeam.achievements.length === 1 ? '1 / 1' : `${(index % currentTeam.achievements.length) + 1} / ${currentTeam.achievements.length}`}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Duplicate for seamless loop */}
                  {(currentTeam.achievements.length === 1
                    ? [...currentTeam.achievements, ...currentTeam.achievements, ...currentTeam.achievements, ...currentTeam.achievements]
                    : currentTeam.achievements
                  ).map((achievement, index) => (
                    <div 
                      key={`team-${currentTeam.teamId}-achievement-dup-${achievement.id}-${index}`}
                      className="flex-shrink-0 w-80 group relative"
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-xl ring-2 ring-yellow-400/20">
                        <img
                          src={achievement.image.startsWith('/') ? `${import.meta.env.BASE_URL}${achievement.image.slice(1)}` : achievement.image}
                          alt={achievement.title}
                          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        
                        {/* Image Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                          <p className="text-sm font-bold line-clamp-2">{achievement.title}</p>
                        </div>
                        
                        {/* Image Number Badge */}
                        <div className="absolute top-2 right-2 bg-yellow-500 px-2 py-0.5 rounded-full text-white text-xs font-bold shadow-lg">
                          {currentTeam.achievements.length === 1 ? '1 / 1' : `${(index % currentTeam.achievements.length) + 1} / ${currentTeam.achievements.length}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compact Title Section */}
            <div className="mb-3 pb-3 border-b border-yellow-200">
              <div className="flex items-start gap-2 mb-2">
                <div className="bg-yellow-100 p-1.5 rounded-lg flex-shrink-0">
                  <FontAwesomeIcon icon={faAward} className="w-4 h-4 text-yellow-600" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                  {currentTeam.teamName} - {currentTeam.award}
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-400 text-yellow-800 px-3 py-1 rounded-full font-bold text-xs shadow-sm">
                <FontAwesomeIcon icon={faTrophy} className="w-3 h-3" />
                {currentTeam.achievements.length} Achievement{currentTeam.achievements.length > 1 ? 's' : ''}
              </div>
            </div>

            {/* Compact Description */}
            <div className="mb-3 bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500 shadow-sm">
              <p className="text-gray-700 leading-relaxed text-sm">
                {currentTeam.problemStatement}
              </p>
            </div>

            {/* Compact Team Members Table */}
            {!currentTeam.teamName.includes('StartupTN') && !currentTeam.teamName.includes('Malaysia') && (
              <div className="bg-white rounded-lg border border-yellow-200 shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-2 flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faUsers} className="w-3.5 h-3.5 text-white" />
                  <h4 className="text-sm font-bold text-white">Team Members</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-yellow-50 border-b border-yellow-200">
                      <tr>
                        <th className="px-2 py-1.5 text-left text-[10px] font-bold text-gray-800 uppercase tracking-wide">
                          <FontAwesomeIcon icon={faHashtag} className="w-2 h-2 mr-1 inline" />
                          No
                        </th>
                        <th className="px-2 py-1.5 text-left text-[10px] font-bold text-gray-800 uppercase tracking-wide">
                          <FontAwesomeIcon icon={faUserGraduate} className="w-2 h-2 mr-1 inline" />
                          Name
                        </th>
                        <th className="px-2 py-1.5 text-left text-[10px] font-bold text-gray-800 uppercase tracking-wide">
                          <FontAwesomeIcon icon={faIdCard} className="w-2 h-2 mr-1 inline" />
                          Roll No
                        </th>
                        <th className="px-2 py-1.5 text-left text-[10px] font-bold text-gray-800 uppercase tracking-wide">
                          Year/Sem
                        </th>
                        <th className="px-2 py-1.5 text-left text-[10px] font-bold text-gray-800 uppercase tracking-wide">
                          <FontAwesomeIcon icon={faCalendarAlt} className="w-2 h-2 mr-1 inline" />
                          Batch
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentTeam.teamMembers.map((member, index) => (
                        <tr 
                          key={index}
                          className="hover:bg-yellow-50 transition-colors duration-200"
                        >
                          <td className="px-2 py-1.5 text-xs font-semibold text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-2 py-1.5 text-xs font-medium text-gray-800">
                            {member.name}
                          </td>
                          <td className="px-2 py-1.5 text-xs text-gray-600 font-mono">
                            {member.rollNo}
                          </td>
                          <td className="px-2 py-1.5 text-xs text-gray-600">
                            {member.year} / {member.semester}
                          </td>
                          <td className="px-2 py-1.5 text-xs text-gray-600 font-medium">
                            {member.batch}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  try {
    return createPortal(modalContent, document.body);
  } catch (error) {
    return null;
  }
};

export default AchievementsModal;
