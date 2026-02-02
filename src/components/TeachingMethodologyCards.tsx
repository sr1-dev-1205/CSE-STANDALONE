import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface TeachingMethodology {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface TeachingMethodologyCardsProps {
  methodologies?: TeachingMethodology[];
  departmentName?: string;
}

const fallbackImage = '/image.png';

// PDF Report Mapping
const reportPaths: Record<number, string> = {
  1: `${import.meta.env.BASE_URL}teachMethod/Active Learning with Technology-IOT.pdf`,
  2: `${import.meta.env.BASE_URL}teachMethod/Problem based learnign.pdf`,
  3: `${import.meta.env.BASE_URL}teachMethod/Flipped Classrooms.pdf`,
};

// Sample data
const jsonMethodologies: TeachingMethodology[] = [
  {
    id: 1,
    title: "Active Learning with Technology",
    description:
      "Students engage in hands-on learning using interactive tools, virtual labs, and coding platforms in ICT-enabled classrooms.",
    image: "activebas.jpg.png",
  },
  {
    id: 2,
    title: "Problem-Based Learning with Digital Tools",
    description:
      "Students solve real-world problems using collaboration tools, project management platforms, and cloud-based deployment resources.",
    image: "/problembas.jpg.png",
  },
  {
    id: 3,
    title: "Flipped Classrooms with Online Resources",
    description:
      "Flipped Classroom enhances learning via digital content, discussions, expert talks, and active student engagement.",
    image: "activebas.jpg.png",
  },
];

const defaultMethodologies: TeachingMethodology[] = jsonMethodologies;

/* ---------------- PDF POPUP MODAL ---------------- */
const PDFPopupModal: React.FC<{
  reportPath: string;
  onClose: () => void;
}> = ({ reportPath, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-3xl bg-white rounded-full w-10 h-10 flex items-center justify-center"
        >
          ×
        </button>

        <iframe
          src={reportPath}
          className="w-full h-full border-0 rounded-2xl"
          title="PDF Report"
        />
      </div>
    </div>
  );
};
/* ------------------------------------------------ */

// Custom modal content
const methodologyDetails: Record<number, string> = {
  1:
    "Our institution is dedicated to creating a learner-centric environment by integrating technology with active learning pedagogies. Interactive tools such as Kahoot, Mentimeter, and Poll Everywhere foster engagement and real-time feedback. Virtual labs including Infosys Springboard, Amrita Virtual Labs, and Cisco Packet Tracer bridge theory and practice. Coding platforms like HackerRank, LeetCode, and Codecademy enhance problem-solving and programming skills.",
  2:
    "The institution adopts Problem-Based Learning supported by digital tools to empower students as real-world problem solvers. Learners collaborate using Google Workspace and Microsoft Teams, manage projects via Trello and Asana, and deploy solutions using AWS and Google Cloud. This approach develops analytical thinking, teamwork, and professional readiness.",
  3:
    "The department implements the Flipped Classroom model to promote student-centered learning. Students access pre-recorded lectures and materials before class, enabling classroom time for discussions, problem-solving, and interactive activities. Platforms like Google Classroom, Zoom, and Google Meet support continuous engagement."
};

/* ---------------- VIEW MORE MODAL ---------------- */
const TeachingMethodologyModal: React.FC<{
  methodology: TeachingMethodology;
  onClose: () => void;
}> = ({ methodology, onClose }) => {
  const [showPDFPopup, setShowPDFPopup] = useState(false);
  const reportPath = reportPaths[methodology.id];

  const getImageSrc = (imgPath: string) => {
    if (!imgPath) return `${import.meta.env.BASE_URL}image.png`;
    if (imgPath.startsWith('http')) return imgPath;
    // Remove 'public/' prefix if present
    const cleanPath = imgPath.replace(/^public\//, '');
    // Handle both absolute and relative paths
    const finalPath = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;
    return `${import.meta.env.BASE_URL}${finalPath}`;
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 text-2xl"
          >
            ×
          </button>

          <h3 className="text-2xl font-bold mb-4">{methodology.title}</h3>

          <img
            src={getImageSrc(methodology.image)}
            alt={methodology.title}
            className="w-full h-56 object-cover rounded-lg mb-4"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />

          <p className="text-gray-700 mb-4">{methodology.description}</p>

          <p className="text-gray-700 mb-6">
            {methodologyDetails[methodology.id]}
          </p>

          {reportPath && (
            <div className="text-right">
              <button
                onClick={() => setShowPDFPopup(true)}
                className="bg-[#e6b200] text-black text-sm font-semibold px-6 py-2 rounded-md"
              >
                Show Report
              </button>
            </div>
          )}
        </div>
      </div>

      {showPDFPopup && reportPath && (
        <PDFPopupModal
          reportPath={reportPath}
          onClose={() => setShowPDFPopup(false)}
        />
      )}
    </>
  );
};
/* ------------------------------------------------ */

const TeachingMethodologyCards: React.FC<TeachingMethodologyCardsProps> = ({
  methodologies = defaultMethodologies,
  departmentName = "Department",
}) => {
  const navigate = useNavigate();
  const [selectedMethodology, setSelectedMethodology] =
    useState<TeachingMethodology | null>(null);

  const getImageSrc = (imgPath: string) => {
    if (!imgPath) return `${import.meta.env.BASE_URL}image.png`;
    if (imgPath.startsWith('http')) return imgPath;
    // Remove 'public/' prefix if present
    const cleanPath = imgPath.replace(/^public\//, '');
    // Handle both absolute and relative paths
    const finalPath = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;
    return `${import.meta.env.BASE_URL}${finalPath}`;
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="text-center mb-12">
        <h4 className="text-3xl md:text-5xl font-bold text-gray-900">
          Innovative Teaching Methodologies
        </h4>
        <div className="w-36 h-1 bg-yellow-400 rounded-full mx-auto mt-4 mb-4"></div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Discover our cutting-edge teaching approaches in {departmentName}.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {methodologies.map((methodology) => (
          <div
            key={methodology.id}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <img
              src={getImageSrc(methodology.image)}
              className="h-48 w-full object-cover"
            />

            <div className="p-6 flex flex-col flex-grow">
              <h5 className="text-xl font-bold text-gray-900 mb-2">
                {methodology.title}
              </h5>

              <p className="text-gray-600 mb-4 flex-grow">
                {methodology.description}
              </p>

              <div className="text-right">
                <button
                  onClick={() => setSelectedMethodology(methodology)}
                  className="bg-[#e6b200] text-black px-6 py-2 rounded-md font-semibold"
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMethodology && (
        <TeachingMethodologyModal
          methodology={selectedMethodology}
          onClose={() => setSelectedMethodology(null)}
        />
      )}
    </div>
  );
};

export default TeachingMethodologyCards;
