import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import secData from "../data/SecData.json";
import ReusableTable from "../components/ReusableTable";

const categoryOptions = [
  { label: "Mini Projects", key: "stu_mini" },
  { label: "Micro Projects", key: "micro_projects" },
  { label: "Capstone Projects", key: "castrol_projects" },
];

const facultyCategoryOptions = [
  { label: "Participations/FDP", key: "fac_participation" },
  { label: "International Conference", key: "International_Conference" },
  { label: "International Journals", key: "International" },
  { label: "Patents", key: "fac_patents" },
  { label: "Book Chapters", key: "Books_chapters" },
  { label: "Book Published", key: "Books" },
  { label: "NPTEL", key: "fac_nptel" },
];

const stuCategoryOptions = [
  { label: "Participations", key: "participations" },
  { label: "International Conference", key: "stu_International_Confrense" },
  { label: "International Journals", key: "stu_international_journal" },
  { label: "Internships", key: "stu_internships" },
  { label: "Capstone Projects", key: "stu_capstone_projects" },
  { label: "Mini Projects", key: "stu_mini" },
  { label: "Micro Projects", key: "stu_micro" },
  { label: "Hackathons", key: "hackathon" },
  { label: "NPTEL Courses", key: "stu_nptel" },
];

const sectionDataKeyMap: Record<string, string> = {
  internships: "internships",
  micro: "micro_projects",
  castrol_projects: "castrol_projects",
  prototypes: "castrol_projects",
  research: "research_data",
  notable: "castrol_projects",
  project: "stu_mini",
  collaborations: "powered_industry",
  powered_industry: "powered_industry",
  faculty_achievements: "fac_participation",
  student_achievements: "participations",
  innovations: "innovations_tab",
  innovations_tab: "innovations_tab",
  placements: "placements_tab",
  placements_tab: "placements_tab",
};

const sectionTitleMap: Record<string, string> = {
  internships: "Internships",
  micro_projects: "Micro Projects",
  castrol_projects: "Notable Projects",
  prototypes: "Notable Projects",
  research_data: "Research Projects",
  research: "Research and Development",
  notable: "Notable Projects",
  powered_industry: "Powered by Industry",
  collaborations: "Industry Collaborations",
  innovations: "Innovations",
  placements: "Placements",
  faculty_achievements: "Faculty Achievements",
  student_achievements: "Student Achievements",
  obe_practices: "OBE Practices",
  obe: "OBE Practices",
  "curriculum-syllabus": "Curriculum and Syllabus",
  fac_participation: "Participations / FDP",
  fac_patents: "Patents",
  fac_nptel: "NPTEL Courses",
  International: "International Journals",
  International_Confrense: "International Conference",
  Books: "Books",
  Books_chapters: "Book Chapters",
  Resource_Person: "Faculty as Resource Person",
  participations: "Event Participations",
  stu_International_Confrense: "Student International Conference",
  stu_capstone_projects: "Student Capstone Projects",
  stu_mini: "Student Mini Projects",
  stu_micro: "Student Micro Projects",
  stu_international_journal: "Student International Journals",
  stu_Books: "Student Books",
  hackathon: "Student Hackathon Events",
  stu_nptel: "Student NPTEL Courses",
};

const sectionDescriptions: Record<string, string> = {
  internships:
    "A collection of student internships with various companies across years.",
  micro_projects:
    "Short academic micro projects focused on practical problems.",
  castrol_projects: "Funded and recognized student Castrol projects.",
  prototypes: "Funded and recognized student Castrol projects.",
  research_data: "Ongoing and completed faculty research initiatives.",
  notable: "Notable student projects across different categories.",
  powered_industry: "Projects done in collaboration with industry partners.",
  innovations:
    "Innovative projects and solutions developed by students and faculty.",
  placements_tab: "Details of student placements in various companies.",
  International: "Faculty publications in reputed international journals.",
  International_Confrense: "Presentations at international conferences.",
  Books: "Books published by faculty or students.",
  Books_chapters: "Book chapters contributed by faculty or students.",
  fac_nptel:
    "Faculty participation in NPTEL courses for professional development and continuous learning.",
  fac_patents:
    "Patents filed or granted, demonstrating innovation and practical application of research outcomes.",
  fac_participation:
    "Faculty participation in workshops, seminars, and Faculty Development Programs (FDPs) aimed at skill enhancement and academic growth.",
  participations: "Students participating in various events and conferences.",
  stu_International_Confrense:
    "Students presenting at international conferences.",
  stu_nptel:
    "NPTEL courses successfully completed by students to enhance their knowledge.",
  stu_international_journal:
    "Research articles published by students in reputed international journals.",
  stu_mini:
    "Mini projects developed by student teams showcasing innovation and technical skills.",
  stu_micro:
    "Micro projects carried out by students focusing on practical problem-solving.",
  stu_Books: "Books published by students.",
  hackathon: "Hackathon events participated by students.",
  Resource_Person: "Details of faculty as resource persons in various events.",
};

const DataTable: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const normalizedSection = section?.toLowerCase() || "";

  const isNotable = normalizedSection === "notable";
  const isFaculty = normalizedSection === "faculty_achievements";
  const isStudent = normalizedSection === "student_achievements";

  const [selectedCategoryKey, setSelectedCategoryKey] = useState(() => {
    if (isNotable) return "castrol_projects";
    if (isFaculty) return "fac_participation";
    if (isStudent) return "participations";
    return sectionDataKeyMap[normalizedSection] || "internships";
  });

  const data = (secData as any)[selectedCategoryKey] || [];
  const title = sectionTitleMap[normalizedSection] || "Section";

  const description =
    sectionDescriptions[selectedCategoryKey] ||
    sectionDescriptions[normalizedSection] ||
    "";

  const showCategoryDropdown = isNotable || isFaculty || isStudent;
  const dropdownOptions = isFaculty
    ? facultyCategoryOptions
    : isStudent
      ? stuCategoryOptions
      : categoryOptions;

  return (
    <div className="relative mt-0 bg-white">
      {/* Back Button - visible only on md+ screens */}
      <div className="hidden md:flex">
        <button
          onClick={() => navigate(-1)}
          className="group fixed top-[200px] left-9 z-50 w-12 h-12 rounded-full bg-yellow-500 shadow-lg flex items-center justify-center cursor-pointer hover:bg-yellow-600 transition-all duration-300"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-6 text-black" strokeWidth={3} />
          <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded bg-black text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Back
          </span>
        </button>
      </div>

      {/* Table */}
      <ReusableTable
        data={data}
        title={title}
        description={description}
        showCategory={showCategoryDropdown}
        categoryOptions={dropdownOptions}
        selectedCategoryKey={selectedCategoryKey}
        onCategoryChange={setSelectedCategoryKey}
      />

      {/* Call to Action */}
      <div className="mt-12 mb-8 max-w-7xl mx-auto px-4">
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
      </div>
    </div>
  );
};

export default DataTable;
