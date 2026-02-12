import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BookOpen,
  Users,
  Award,
  Building,
  Briefcase,
  Globe,
  ChevronRight,
  User,
  GraduationCap,
  ClipboardList,
  FileText,
  CalendarDays,
  ArrowRight,
  Calendar,
  DollarSign,
  Building2,
  Clock,
  Lightbulb,
  Target,
  CheckCircle,
  Link as LinkIcon,
  X,
  Mail,
  Phone,
  Info,
  MessageSquare,
  FlaskConical,
  Handshake,
} from "lucide-react";

// Direct paths to logo files in public folder
const logoMap: Record<string, string> = {
  IEEE: "/IEEE.png",
  ict: "/ict.png",
  csi: "/csi_logo.png",
  ibm: "/ibm.png",
  google: "/google.png",
  oracle: "/oracle.png",
  zoho: "/zoho.png",
  redhat: "/redhat.png",
  dell: "/dell.png",
  vmware: "/vm.png",
  csscorp: "/css.png",
  salesforce: "/sales.png",
  nasscom: "/nasscom.png",
  uipath: "/uipath.png",
  infosys: "/infosys.png",
  celonis: "/LatestEvents/celonis-img.webp",
};

const iconMap: Record<string, any> = {
  BookOpen,
  Users,
  Award,
  Building,
  Briefcase,
  Globe,
  User,
  GraduationCap,
  ClipboardList,
  FileText,
  Calendar: CalendarDays,
};

const eventImageMap = {
  "file-J9BVu9zM8oDHyhLN6xHPWx": "hackathon.jpg",
  "file-LSj37azmiY5Pc65232ZVmW": "workshop.jpg",
  "file-PvpLe9Jq7twhCq7NFN9nS5": "seminar.jpg",
};

// Enhanced Card Component with dynamic field rendering
function TabCard({ item }: { item: any }) {
  const fieldIconMap: Record<string, any> = {
    funding: DollarSign,
    fundingAgency: Building2,
    funding_agency: Building2,
    status: Clock,
    duration: Calendar,
    years: BookOpen,
    date: Calendar,
    venue: Building,
    organizer: Users,
    participants: Users,
    company: Building2,
    position: Briefcase,
    salary: DollarSign,
    location: Building,
    department: Building,
    experience: Briefcase,
    qualification: GraduationCap,
    specialization: Award,
    achievements: Award,
    WP_Attributes: ClipboardList,
    Proposed_EA: Lightbulb,
    PO_Mapped: Target,
    SDG_Goals: Globe,
    PSO: CheckCircle,
    Justification: FileText,
    Course: GraduationCap,
    Source: LinkIcon,
  };

  const excludeFields = [
    "title",
    "description",
    "logo",
    "image",
    "authors",
    "author",
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-yellow-200 group">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-yellow-500 leading-tight mb-3 group-hover:text-yellow-600 transition-colors">
          {item.title}
        </h3>

        <div className="space-y-2 text-gray-600">
          {item.authors
            ? item.authors.map((author: string, idx: number) => (
                <p key={idx} className="text-sm font-medium">
                  {author}
                </p>
              ))
            : item.author && (
                <p className="text-sm font-medium">
                  {item.author} {item.department && item.department}
                </p>
              )}
        </div>
      </div>

      {item.description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {item.description}
        </p>
      )}

      {item.logo && (
        <div className="flex justify-center mb-4">
          <img
            src={item.logo.startsWith('/') 
              ? `${import.meta.env.BASE_URL}${item.logo.slice(1)}`
              : `${import.meta.env.BASE_URL}${item.logo}`
            }
            alt={item.title || "Card logo"}
            className="h-16 sm:h-20 object-contain"
          />
        </div>
      )}

      <div className="space-y-3">
        {Object.entries(item).map(([key, value]) => {
          if (excludeFields.includes(key) || !value) return null;

          const Icon = fieldIconMap[key] || FileText;
          const displayKey = key
            .replace(/_/g, " ")
            .replace(/([A-Z])/g, " $1")
            .trim();
          const capitalizedKey =
            displayKey.charAt(0).toUpperCase() + displayKey.slice(1);

          return (
            <div key={key} className="flex items-start gap-2">
              <Icon className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-sm font-semibold text-yellow-600">
                  {capitalizedKey}:
                </span>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed break-words">
                  {Array.isArray(value) ? value.join(", ") : String(value)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Curriculum Card Component with horizontal layout for options
function CurriculumCard({ item }: { item: any }) {
  const curriculumFields = [
    { key: "regulations", label: "Regulations" },
        { key: "regulations_2020 A", label: "Regulations 2020 A" },

    { key: "regulations_2020", label: "Regulations 2020" },
    { key: "curriculum", label: "Curriculum" },
    { key: "syllabus", label: "Syllabus" },
  ];

  const handlePDFClick = (pdfPath: string) => {
    if (pdfPath && pdfPath !== "PDF Link") {
      const fullPath = `${import.meta.env.BASE_URL}${pdfPath}`;
      window.open(fullPath, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-yellow-200 group">
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-yellow-500 leading-tight mb-3 group-hover:text-yellow-600 transition-colors">
          {item.title}
        </h3>
      </div>

      {/* Description */}
      {item.description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          {item.description}
        </p>
      )}

      {/* Horizontal Options */}
      <div className="flex flex-wrap gap-2">
        {curriculumFields.map(({ key, label }) => {
          if (!item[key]) return null;
          const isAvailable = item[key] !== "PDF Link";
          return (
            <button
              key={key}
              onClick={() => handlePDFClick(item[key])}
              disabled={!isAvailable}
              className={`flex items-center gap-2 px-5 py-2 border rounded-lg transition-all duration-200 group/btn ${
                isAvailable
                  ? 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200 cursor-pointer'
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }`}
            >
              <FileText className={`w-4 h-4 ${
                isAvailable
                  ? 'text-yellow-600 group-hover/btn:text-yellow-700'
                  : 'text-gray-400'
              }`} />
              <span className={`text-sm font-medium ${
                isAvailable
                  ? 'text-gray-700 group-hover/btn:text-gray-900'
                  : 'text-gray-400'
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Internship Card Component for scrolling carousel
function InternshipCard({ item }: { item: any }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-yellow-200 group h-full">
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="text-lg font-bold text-yellow-600 group-hover:text-yellow-700 transition-colors flex-1 min-w-0">
            {item.candidate_name}
          </h3>
          <span className="text-xs font-semibold text-white bg-yellow-500 px-3 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
            2023-24
          </span>
        </div>
        <p className="text-sm font-medium text-gray-700">{item.designation}</p>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-yellow-500 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-xs font-semibold text-gray-500 block">Location</span>
            <p className="text-sm text-gray-700">{item.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-xs font-semibold text-gray-500 block">Stipend/Month</span>
            <p className="text-sm font-bold text-gray-700">₹{item.stipend_per_month.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-xs font-semibold text-gray-500 block">Joining Date</span>
            <p className="text-sm text-gray-700">{item.date_of_joining}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-600 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-xs font-semibold text-gray-500 block">Pre-Placement Offer</span>
            <p className="text-sm font-bold text-purple-700">{item.pre_placement_offer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact Card without Learn More button

// Compact Project Card for Notable Projects - REDESIGNED
function NotableProjectCard({
  item,
  onClick,
}: {
  item: any;
  onClick: () => void;
}) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg transition-all duration-300 p-7 border border-gray-200 cursor-pointer h-full flex flex-col overflow-hidden relative">
      {/* Accent bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400"></div>

      {/* Title Section */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 line-clamp-2 pr-2">
          {item.title}
        </h3>
        <div className="w-12 h-1 bg-yellow-400 rounded-full transition-all duration-300"></div>
      </div>

      {/* Students Info */}
      <div className="mb-5 pb-4 border-b border-gray-200">
        <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wider mb-1">
          Team Members
        </p>
        <p className="text-sm text-gray-700 font-medium line-clamp-2">
          {item.students}
        </p>
      </div>

      {/* Summary */}
      <p className="text-sm text-gray-700 leading-relaxed mb-6 flex-grow line-clamp-2">
        {item.summary}
      </p>

      {/* CTA Button */}
      <button
        onClick={onClick}
        className="mt-auto w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-xl shadow-md transition-all duration-300 text-sm font-medium"
      >
        <span>Explore Project</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// SDG Card Component for SDG Initiatives
function SDGCard({ item }: { item: any }) {
  const sdgIconMap: Record<string, any> = {
    BookOpen,
    FlaskConical: Lightbulb,
    Lightbulb,
    Calendar,
    Handshake: Users,
    Building2,
  };

  const Icon = sdgIconMap[item.icon as keyof typeof sdgIconMap] || Globe;

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 border-yellow-200 hover:border-yellow-400 group h-[280px] flex flex-col">
      {/* Icon and Title */}
      <div className="flex items-center gap-3 mb-4 h-[60px]">
        <div className="p-3 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors flex-shrink-0">
          <Icon className="w-6 h-6 text-yellow-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors line-clamp-2">
          {item.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed flex-grow line-clamp-4">
        {item.description}
      </p>

      {/* SDG Tag */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">
            SDG Initiative #{item.id}
          </span>
          <ArrowRight className="w-5 h-5 text-yellow-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

// Modal for Project Details - Clean Advertisement Style
function ProjectModal({
  project,
  onClose,
}: {
  project: any;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative transform transition-all scale-100 animate-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Only - No Background, No Text */}
        {project.image ? (
          <img
            src={project.image.startsWith('/') ? `${import.meta.env.BASE_URL}${project.image.slice(1)}` : project.image}
            alt={project.title}
            className="max-w-md h-auto object-cover rounded-xl shadow-2xl transform translate-y-10 scale-98"
            onError={(e) => {
              console.error("Image failed to load:", project.image);
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

// HOD Modal Component
interface HODModalProps {
  hodData: any;
  onClose: () => void;
}

const HODModal: React.FC<HODModalProps> = ({ hodData, onClose }) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto backdrop-blur-sm px-4 py-12">
      <div
        ref={modalRef}
        className={`relative bg-white w-full max-w-3xl mx-auto rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Header */}
        <div className="bg-yellow-100 pb-4 pt-6 px-6 sm:px-8 relative flex flex-col items-center justify-center">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-yellow-800 transition"
            onClick={handleClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="w-50 h-36 rounded-full overflow-hidden mx-auto border-4 border-yellow-300 shadow-lg">
            <img
              src={`${import.meta.env.BASE_URL}images/HOD.jpg`}
              alt={hodData.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5GYWN1bHR5PC90ZXh0Pjwvc3ZnPg==';
              }}
            />
          </div>

          <div className="text-center mt-3">
            <h3 className="text-2xl font-bold text-gray-900">{hodData.title}</h3>
            <p className="text-yellow-600 text-base mt-1">
              Head of Department
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-4 text-sm text-gray-800">
          <div className="space-y-4 divide-y divide-gray-200">
            <div className="flex items-start gap-3 pt-0">
              <GraduationCap className="h-6 w-6 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-semibold text-base">Qualifications</p>
                <p className="text-base">{hodData.qualification || '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <Award className="h-6 w-6 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-semibold text-base">Specialization</p>
                <p className="text-base">{hodData.specialization || '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <Briefcase className="h-6 w-6 text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold text-base">Experience</p>
                <p className="text-base">{hodData.experience || '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <Award className="h-6 w-6 text-purple-600 mt-0.5" />
              <div>
                <p className="font-semibold text-base">Key Achievements</p>
                <p className="text-base">{hodData.achievements || '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <Mail className="h-6 w-6 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-base">Email</p>
                {hodData.email ? (
                  <a
                    href={`mailto:${hodData.email}`}
                    className="text-blue-600 underline break-words hover:text-blue-800 text-base"
                  >
                    {hodData.email}
                  </a>
                ) : (
                  <p className="text-base">—</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <Phone className="h-6 w-6 text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold text-base">Phone</p>
                <p className="text-base">{hodData.phone || '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4">
              <FileText className="h-6 w-6 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-base">Description</p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                  {hodData.description || '—'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TabsSectionProps {
  departmentName?: string;
}

const TabsSection: React.FC<TabsSectionProps> = ({ departmentName: _ }) => {
  const [tabs, setTabs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("hod");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedHOD, setSelectedHOD] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    import("../data/tabsData.json").then((data) => {
      const enrichedTabs = data.tabs.map((tab: any) => ({
        ...tab,
        icon: iconMap[tab.icon as keyof typeof iconMap] || CalendarDays,
        content: {
          ...tab.content,
          items: tab.content.items.map((item: any) => ({
            ...item,
            logo: item.logo
              ? logoMap[item.logo as keyof typeof logoMap]
              : undefined,
            image: item.image
              ? eventImageMap[item.image as keyof typeof eventImageMap] ||
                item.image
              : undefined,
          })),
        },
      }));
      setTabs(enrichedTabs);
    });
  }, []);

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  const handleViewMore = () => {
    // Special handling for Academic Calendar - navigate to AcademicCal page
    if (activeTab === "academic_calendar") {
      navigate("/academic-calendar");
      return;
    }

    // Special handling for SDG Initiatives - navigate to SDG page
    if (activeTab === "sdgs") {
      navigate("/sdg-initiatives");
      return;
    }

    const routeMap: Record<string, string> = {
      internships: "internships",
      micro: "micro_projects",
      prototypes: "prototypes",
      research: "research",
      notable: "notable",
      faculty_achievements: "faculty_achievements",
      student_achievements: "student_achievements",
      faculty_ach: "faculty_achievements",
      "latest-events": "latest-event",
      innovations: "innovations",
      placements: "placements_tab",
      placements_tab: "placements_tab",
    };

    const route = routeMap[activeTab] || activeTab;

    if (activeTab === "latest-events") {
      navigate(`/${route}`);
    } else {
      navigate(`/datatable/${route}`);
    }
  };

  const buttonLabels: Record<string, string> = {
    "latest-events": "More Events",
    research: "More Proposals",
    student_achievements: "More Achievements",
    faculty_achievements: "More Achievements",
    internships: "More Internships",
    innovations: "More Innovations",
    placements: "More Placements",
    sdgs: "More SDGs",
    academic_calendar: "More Calendar",
    obe: "More OBE",
    curriculum_syllabus: "More Curriculum",
    facilities: "More Facilities",
    global_connections: "More Connections",
    professional: "More Society",
    collaborations: "More Industries",
    notable: "More Projects",
    alumni: "More Alumni",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="border-b border-gray-200 relative">
        {/* Enhanced scrollable tabs navigation */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-100 hover:scrollbar-thumb-yellow-500">
          <div className="flex min-w-max lg:flex-wrap lg:min-w-0">
            {tabs.map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-3 sm:px-5 lg:px-6 py-3 sm:py-4 font-medium transition-all duration-200 border-b-2 whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? "text-yellow-600 border-yellow-500 bg-yellow-50 shadow-sm"
                    : "text-gray-600 border-transparent hover:text-yellow-600 hover:bg-yellow-50"
                }`}
              >
                {tab.icon && <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />}
                <span className="text-xs sm:text-sm lg:text-base">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Scroll indicator for mobile/tablet only */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none lg:hidden"></div>
      </div>

      <div className="p-4 sm:p-8">
        {activeTabData && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
  <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
    {activeTabData.content.title}
  </h3>

  {activeTab !== "hod" &&
    activeTab !== "collaborations" &&
    activeTab !== "professional" &&
    activeTab !== "notable" &&
    activeTab !== "curriculum_syllabus" && (
      <button
        onClick={handleViewMore}
        className="bg-yellow-500 text-black hover:bg-yellow-600 font-medium text-sm md:text-base px-3 md:px-5 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
      >
        <span className="hidden sm:inline">
          {buttonLabels[activeTab] || "More"}
        </span>
        <ChevronRight className="h-4 w-4" />
      </button>
    )}
</div>


            {activeTab === "hod" ? (
              <div className="bg-gray-50 p-4 sm:p-8 rounded-xl border border-gray-200">
                {/* HOD block unchanged */}
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <div
                      className="w-40 sm:w-48 relative"
                      style={{ height: "320px" }}
                    >
                      <div className="absolute inset-0 rounded-lg overflow-hidden ">
                        <img
                          src={`${import.meta.env.BASE_URL}images/HOD.jpg`}
                          alt="HOD"
                          className="w-full h-full object-contain"
                          style={{ objectPosition: "top center" }}
                        />
                      </div>
                    </div>
                    <h4 className="font-semibold text-lg sm:text-xl text-center text-gray-900 mt-4">
                      {activeTabData.content.items[0].title}
                    </h4>
                    <p className="text-yellow-600 text-sm font-medium mb-4">
                      Head of Department
                    </p>
                    <div className="text-center space-y-1 text-sm text-gray-700">
                      <p>
                        <span className="font-semibold text-yellow-600">
                          Email:
                        </span>{" "}
                        {activeTabData.content.items[0].email}
                      </p>
                      <p>
                        <span className="font-semibold text-yellow-600">
                          Phone:
                        </span>{" "}
                        {activeTabData.content.items[0].phone}
                      </p>
                      <button 
                        onClick={() => setSelectedHOD(activeTabData.content.items[0])}
                        className="mt-2 text-yellow-500 hover:text-yellow-600 font-semibold text-sm flex items-center justify-center space-x-1 transition-colors duration-200"
                      >
                        <span>View Full Profile</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="md:w-2/3 space-y-6">
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed text-justify">
                      {activeTabData.content.items[0].description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "qualification",
                        "experience",
                        "specialization",
                        "achievements",
                      ].map((key, i) => {
                        const Icon = [
                          GraduationCap,
                          Briefcase,
                          Award,
                          BookOpen,
                        ][i];
                        const titles = [
                          "Qualifications",
                          "Experience",
                          "Specialization",
                          "Key Achievements",
                        ];
                        return (
                          <div
                            key={key}
                            className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all"
                          >
                            <h5 className="text-base font-bold text-gray-700 mb-2 flex items-center">
                              <Icon className="h-5 w-5 mr-2 text-yellow-600" />
                              {titles[i]}
                            </h5>
                            <p className="text-sm text-gray-700">
                              {activeTabData.content.items[0][key]}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {activeTab === "notable" ? (
                  // Notable Projects - Auto-scrolling Carousel showing 10 featured projects
                  <Slider
                    dots={true}
                    infinite={true}
                    autoplay={true}
                    autoplaySpeed={2000}
                    slidesToShow={3}
                    slidesToScroll={1}
                    responsive={[
                      {
                        breakpoint: 1024,
                        settings: { slidesToShow: 2, slidesToScroll: 1 },
                      },
                      {
                        breakpoint: 768,
                        settings: { slidesToShow: 1, slidesToScroll: 1 },
                      },
                    ]}
                  >
                    {activeTabData.content.items.slice(0, 10).map(
                      (item: any, index: number) => (
                        <div key={index} className="px-4 mb-6">
                          <NotableProjectCard
                            item={item}
                            onClick={() => setSelectedProject(item)}
                          />
                        </div>
                      ),
                    )}
                  </Slider>
                ) : (
                  // Special case for "collaborations" (Powered by Industries) - show all in carousel
                  activeTab === "collaborations" ? (
                    <Slider
                      dots={true}
                      infinite={true}
                      autoplay={true}
                      autoplaySpeed={3000}
                      slidesToShow={2}
                      slidesToScroll={2}
                      responsive={[
                        {
                          breakpoint: 1024,
                          settings: { slidesToShow: 2, slidesToScroll: 2 },
                        },
                        {
                          breakpoint: 768,
                          settings: { slidesToShow: 1, slidesToScroll: 1 },
                        },
                      ]}
                    >
                      {activeTabData.content.items.map(
                        (item: any, index: number) => (
                          <div key={index} className="px-4 mb-6">
                            <TabCard item={item} />
                          </div>
                        ),
                      )}
                    </Slider>
                  ) : activeTab === "professional" ? (
                    // Special case for "professional" (Professional Society) - show all cards in grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {activeTabData.content.items.map(
                        (item: any, index: number): JSX.Element => (
                          <TabCard key={index} item={item} />
                        ),
                      )}
                    </div>
                  ) : activeTab === "internships" ? (
                    // Internships - Auto-scrolling Carousel showing 10 internships
                    <Slider
                      dots={true}
                      infinite={true}
                      autoplay={true}
                      autoplaySpeed={2500}
                      slidesToShow={3}
                      slidesToScroll={1}
                      responsive={[
                        {
                          breakpoint: 1024,
                          settings: { slidesToShow: 2, slidesToScroll: 1 },
                        },
                        {
                          breakpoint: 768,
                          settings: { slidesToShow: 1, slidesToScroll: 1 },
                        },
                      ]}
                    >
                      {activeTabData.content.items.slice(0, 10).map(
                        (item: any, index: number) => (
                          <div key={index} className="px-4 mb-6">
                            <InternshipCard item={item} />
                          </div>
                        ),
                      )}
                    </Slider>
                  ) : activeTab === "curriculum_syllabus" ? (
                    // Show all 3 cards for curriculum_syllabus tab with horizontal layout
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {activeTabData.content.items.map(
                        (item: any, index: number): JSX.Element => (
                          <CurriculumCard key={index} item={item} />
                        ),
                      )}
                    </div>
                  ) : activeTab === "sdgs" ? (
                    // SDG Initiatives - Auto-scrolling Carousel showing 6 cards
                    <Slider
                      dots={true}
                      infinite={true}
                      autoplay={true}
                      autoplaySpeed={3000}
                      slidesToShow={3}
                      slidesToScroll={1}
                      responsive={[
                        {
                          breakpoint: 1024,
                          settings: { slidesToShow: 2, slidesToScroll: 1 },
                        },
                        {
                          breakpoint: 768,
                          settings: { slidesToShow: 1, slidesToScroll: 1 },
                        },
                      ]}
                    >
                      {activeTabData.content.items.map(
                        (item: any, index: number) => (
                          <div key={index} className="px-4 mb-6">
                            <SDGCard item={item} />
                          </div>
                        ),
                      )}
                    </Slider>
                  ) : (
                    // Show only 2 cards max for other tabs
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                      {activeTabData.content.items.slice(0, 2).map(
                        (item: any, index: number): JSX.Element => (
                          <TabCard key={index} item={item} />
                        ),
                      )}
                    </div>
                  )
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* HOD Modall */}
      {selectedHOD && (
        <HODModal
          hodData={selectedHOD}
          onClose={() => setSelectedHOD(null)}
        />
      )}
    </div>
  );
};

export default TabsSection;
