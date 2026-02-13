import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, Newspaper, Briefcase, MessageSquare } from "lucide-react";
import PageLayout from "../components/layout/PageLayout";
import SectionWrapper from "../components/layout/SectionWrapper";
import LazyLoadWrapper from "../components/LazyLoadWrapper";
import DepartmentDetail from "../components/DepartmentDetail";
import TeachingMethodologyCards from "../components/TeachingMethodologyCards";
import FacultyCarousel from "../components/FacultyCarousel";
import FacilitiesCarousel from "../components/FacilitiesCarousel";
import TabsSection from "../components/TabSection";
import LabSection from "../components/LabSection"; // Now uses its own cseLabsData
import AchievementsModal from "../components/AchievementsModal";
import departmentsData from "../data/departmentsData.json";
import cseAchievementsData from "../data/cseAchievementsData.json";

import DepartmentSectionNav from "../components/navigation/DepartmentSectionNav";

const DepartmentPage: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const navigate = useNavigate();
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);

  // Default to 'cse' when accessed from root path (no departmentId param)
  const requestedDepartmentId = departmentId ?? "cse";

  // Find the requested department
  let department = departmentsData.departments.find(
    (dept) => dept.id === requestedDepartmentId,
  );

  // Graceful fallback: if department not found, use CSE without changing URL
  if (!department) {
    department = departmentsData.departments.find(
      (dept) => dept.id === 'cse',
    )!; // Non-null assertion: CSE department must exist in data
  }

  // Show achievements modal only for CSE department on page load with a delay
  useEffect(() => {
    if (department.id === "cse") {
      // Delay to ensure page is fully loaded and scroll position is set
      const timer = setTimeout(() => {
        setShowAchievementsModal(true);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setShowAchievementsModal(false);
    }
  }, [department.id]);

  const sections = [
    { id: 'about-department', label: 'About the Department' },
    { id: 'department-vision-mission', label: 'Vision and Mission' },
    { id: 'psos-peos-pos', label: 'Outcomes (PEO/PSO)' },
    { id: 'obe', label: 'OBE Philosophy & Inputs' },
    { id: 'teaching-methodology', label: 'Innovative Teaching Methodology' },
    { id: 'research-innovation', label: 'Research & Innovation' },
    { id: 'placements', label: 'Placements' },
    { id: 'industry', label: 'Industry Oriented Training' },
    { id: 'events-organised', label: 'Events Organised' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'labs', label: 'Laboratories' },
    { id: 'faculty', label: 'Faculty Members' },
    { id: 'resources', label: 'Resources' },
  ];

  return (
    <>
      {/* Achievements Modal for CSE Department */}
      {department.id === "cse" &&
        showAchievementsModal &&
        cseAchievementsData?.teams && (
          <AchievementsModal
            isOpen={showAchievementsModal}
            onClose={() => setShowAchievementsModal(false)}
            teams={cseAchievementsData.teams}
          />
        )}

      <PageLayout
        title={`${department.name} - Hindusthan Institute of Technology`}
        description={department.description}
      >
        <div className="w-full px-3 sm:px-4 lg:px-8 mt-[-80px] sm:mt-[-120px] lg:mt-[-150px]">
          <div className="lg:flex lg:gap-6 xl:gap-8">
            {/* Left Navigation Sidebar - Desktop Only */}
            <aside className="hidden lg:block lg:w-64 xl:w-72 lg:flex-shrink-0">
              <div className="sticky top-28 lg:top-32 pt-4">
                <DepartmentSectionNav sections={sections} />
              </div>
            </aside>

            {/* Mobile Nav - Visible only on mobile/tablet */}
            <div className="lg:hidden">
              <DepartmentSectionNav sections={sections} />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 space-y-8 lg:space-y-12 lg:pr-4 xl:pr-6">
              {/* Department Header */}
              <div className="scroll-mt-32">
                <SectionWrapper containerClassName="w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
                  <DepartmentDetail
                    department={{
                      ...department,
                      // Normalize faculty data to match expected structure
                      faculty: (department.faculty || []).map(faculty => {
                        const f = faculty as any;
                        if ('researchAreas' in f) {
                          return {
                            ...f,
                            id: Number(f.id),
                            description: f.description || '',
                            patents: f.patents || 0,
                            date_of_joining: f.date_of_joining || '',
                            researchAreas: f.researchAreas || []
                          };
                        } else {
                          return {
                            ...f,
                            id: Number(f.id),
                            researchAreas: [],
                            description: f.description || ''
                          };
                        }
                      }),
                      // Normalize programs to handle optional intake
                      programs: (department.programs || []).map(program => ({
                        ...program,
                        intake: program.intake || undefined,
                        eligibility: program.eligibility || ''
                      })),
                      // Normalize PSOs to match expected structure
                      psos: (department.psos || []).map(pso => {
                        const p = pso as any;
                        return {
                          ...p,
                          id: p.id ? String(p.id) : undefined,
                          code: p.code ? String(p.code) : undefined,
                          title: p.title ? String(p.title) : undefined,
                          description: p.description || p.title || ''
                        };
                      }),
                      // Normalize PEOs to match expected structure
                      peos: (department.peos || []).map(peo => {
                        const p = peo as any;
                        return {
                          ...p,
                          id: p.id ? String(p.id) : undefined,
                          code: p.code ? String(p.code) : undefined,
                          title: p.title ? String(p.title) : undefined,
                          description: p.description || p.title || ''
                        };
                      }),
                      // Normalize POs to match expected structure
                      pos: (department.pos || []).map(po => {
                        const p = po as any;
                        return {
                          ...p,
                          id: p.id ? String(p.id) : undefined,
                          code: p.code ? String(p.code) : undefined,
                          title: p.title ? String(p.title) : undefined,
                          description: p.description || p.title || ''
                        };
                      })
                    }}
                  />
                </SectionWrapper>
              </div>

              {/* Facilities Carousel */}
              <div id="facilities" className="scroll-mt-24">
                <SectionWrapper containerClassName="w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
                  <LazyLoadWrapper height="400px" delay={1100}>
                    <FacilitiesCarousel
                      facilities={(department as any).facilitiesDetails || []}
                      departmentName={department.name}
                    />
                  </LazyLoadWrapper>
                </SectionWrapper>
              </div>

              {/* Laboratory Section */}
              <div id="labs" className="scroll-mt-24">
                <SectionWrapper containerClassName="w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
                  <LazyLoadWrapper height="500px" delay={1200}>
                    <LabSection departmentName={department.name} />
                  </LazyLoadWrapper>
                </SectionWrapper>
              </div>

              {/* Faculty Members */}
              <div id="faculty" className="scroll-mt-24">
                <SectionWrapper containerClassName="w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
                  <LazyLoadWrapper height="500px" delay={1300}>
                    <div className="text-center mb-6 sm:mb-8 px-2">
                      <h2 className="text-xl sm:text-2xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
                        Faculty Members
                      </h2>
                      <div className="w-24 sm:w-32 h-1 bg-yellow-400 rounded-full mx-auto mt-3 sm:mt-4 mb-3 sm:mb-4"></div>
                      <p className="text-sm sm:text-base text-gray-600 px-2">
                        Distinguished faculty contributing to excellence in{" "}
                        {department.name}
                      </p>
                    </div>
                    <FacultyCarousel
                      faculty={(department.faculty || []).map(faculty => {
                        // Type guard to check if faculty has researchAreas
                        const hasResearchAreas = 'researchAreas' in faculty;

                        if (hasResearchAreas) {
                          // Faculty has researchAreas structure (AI/ML type)
                          const facultyWithResearchAreas = faculty as any;
                          return {
                            ...facultyWithResearchAreas,
                            description: (facultyWithResearchAreas.description !== undefined) ? facultyWithResearchAreas.description : '',
                            patents: (facultyWithResearchAreas.patents !== undefined) ? facultyWithResearchAreas.patents : 0,
                            date_of_joining: (facultyWithResearchAreas.date_of_joining !== undefined) ? facultyWithResearchAreas.date_of_joining : ''
                          };
                        } else {
                          // Faculty has CSE structure (with date_of_joining, patents, etc.)
                          const facultyWithoutResearchAreas = faculty as any;
                          return {
                            ...facultyWithoutResearchAreas,
                            researchAreas: [],
                            // Ensure description is present for FacultyCarousel compatibility
                            description: (facultyWithoutResearchAreas.description !== undefined) ? facultyWithoutResearchAreas.description : ''
                          };
                        }
                      })}
                      departmentName={department.name}
                    />
                  </LazyLoadWrapper>
                </SectionWrapper>
              </div>

              {/* Tabs Section */}
              <div id="resources" className="scroll-mt-24">
                <SectionWrapper containerClassName="w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
                  <LazyLoadWrapper height="350px" delay={600}>
                    <TabsSection departmentName={department.name} />
                  </LazyLoadWrapper>
                </SectionWrapper>
              </div>

              {/* Call to Action */}
              <div id="contact" className="scroll-mt-24 mb-8 sm:mb-10">
                <SectionWrapper containerClassName="w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
                  <LazyLoadWrapper height="180px" delay={1700}>
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-8 sm:px-10 sm:py-12 md:py-14 rounded-xl sm:rounded-2xl text-center text-white">
                      <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-2 sm:mb-4">
                        Join Our Educational Legacy
                      </h2>
                      <p className="text-sm sm:text-base md:text-lg mb-5 sm:mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto px-2">
                        Be part of an institution that has been shaping futures
                        for over three decades
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
                        <button className="bg-white text-gray-900 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 w-full sm:w-auto">
                          Explore Programs
                        </button>
                        <button className="border-2 border-white text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition duration-200 w-full sm:w-auto">
                          Contact Us
                        </button>
                      </div>
                    </div>
                  </LazyLoadWrapper>
                </SectionWrapper>
              </div>
            </main>
          </div>
        </div>

        {/* Magazine button - Adjusted for mobile */}
        <div className="fixed right-0 sm:right-4 top-[35%] sm:top-[38%] transform -translate-y-1/2 z-40">
          <button
            onClick={() => navigate("/magazine")}
            className="group flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-10 sm:w-12 hover:w-32 sm:hover:w-40 h-10 sm:h-12 rounded-l-lg sm:rounded-l-xl shadow-lg transition-all duration-300 overflow-hidden"
            title="Magazine"
          >
            {/* Icon always visible, stays at right */}
            <div className="flex-shrink-0 w-10 sm:w-12 flex items-center justify-center">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
            </div>

            {/* Text slides in when expanded */}
            <span className="ml-1 sm:ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap font-bold text-sm">
              Magazine
            </span>
          </button>
        </div>

        {/* Newsletter button - Adjusted for mobile */}
        <div className="fixed right-0 sm:right-4 top-1/2 transform -translate-y-1/2 z-40">
          <button
            onClick={() => navigate("/newsletter")}
            className="group flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-10 sm:w-12 hover:w-32 sm:hover:w-40 h-10 sm:h-12 rounded-l-lg sm:rounded-l-xl shadow-lg transition-all duration-300 overflow-hidden"
            title="NewsLetter"
          >
            <div className="flex-shrink-0 w-10 sm:w-12 flex items-center justify-center">
              <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
            </div>

            <span className="ml-1 sm:ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap font-bold text-sm">
              NewsLetter
            </span>
          </button>
        </div>

        {/* Testimonial button - Adjusted for mobile */}
        <div className="fixed right-0 sm:right-4 top-[57%] sm:top-[58%] transform -translate-y-1/2 z-40">
          <button
            onClick={() => navigate("/testimonial")}
            className="group flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-10 sm:w-12 hover:w-32 sm:hover:w-40 h-10 sm:h-12 rounded-l-lg sm:rounded-l-xl shadow-lg transition-all duration-300 overflow-hidden"
            title="Testimonial"
          >
            <div className="flex-shrink-0 w-10 sm:w-12 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
            </div>

            <span className="ml-1 sm:ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap font-bold text-sm">
              Testimonial
            </span>
          </button>
        </div>

        {/* Opportunities button - Roll-out style, positioned at top */}
        <div className="fixed right-0 sm:right-4 top-[28%] sm:top-[30%] transform -translate-y-1/2 z-40">
          <button
            onClick={() => navigate('/opportunities')}
            className="group flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-10 sm:w-12 hover:w-32 sm:hover:w-40 h-10 sm:h-12 rounded-l-lg sm:rounded-l-xl shadow-lg transition-all duration-300 overflow-hidden"
            title="Opportunities"
          >
            <div className="flex-shrink-0 w-10 sm:w-12 flex items-center justify-center">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="ml-1 sm:ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap font-bold text-sm">
              Opportunities
            </span>
          </button>
        </div>
      </PageLayout>
    </>
  );
};

export default DepartmentPage;