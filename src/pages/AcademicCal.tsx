import React, { useState } from 'react';
import { FileText, X , ChevronLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Helper function to resolve PDF paths with v2 base URL
const getPDFUrl = (path: string) => {
  if (!path) return '';
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
};

const years = [
  { year: '2025–26' },
  { year: '2024–25' },
  { year: '2023–24' },
  { year: '2022–23' },
];

const semesters = [
  { title: 'ODD Semester' },
  { title: 'EVEN Semester' },
];

// Organized PDF URLs for all academic calendars
const calendarPDFs = {
  '2025–26': {
    'ODD Semester': {
      'I Year Academic Calendar': '',
      'II Year Academic Calendar': getPDFUrl('pdf/AC_2025 - 2026 - ODD SEM for III SEM - Copy (1).pdf'),
      'III & IV Year Academic Calendar': getPDFUrl('pdf/AC_2025 - 2026 - ODD SEM for V & VII SEM (1).pdf'),
    },
    'EVEN Semester': {
      'I Year Academic Calendar': '',
      'II Year Academic Calendar': '',
      'III & IV Year Academic Calendar': '',
    },
  },
  '2024–25': {
    'ODD Semester': {
      'I Year Academic Calendar': getPDFUrl('pdf/AC_HIT - AC_2024 - 2025 - ODD SEM for I SEMESTER.pdf'),
      'II Year Academic Calendar': '',
      'III & IV Year Academic Calendar': '',
    },
    'EVEN Semester': {
      'I Year Academic Calendar': '',
      'II Year Academic Calendar': '',
      'III & IV Year Academic Calendar': '',
    },
  },
  '2023–24': {
    'ODD Semester': {
      'I Year Academic Calendar': '',
      'II Year Academic Calendar': getPDFUrl('pdf/AC_ 2023-24 -II YR ODD SEM  -16.08.2023.pdf'),
      'III & IV Year Academic Calendar': getPDFUrl('pdf/AC_ 2023-24 -ODD SEM for III IV Yr.pdf'),
    },
    'EVEN Semester': {
      'I Year Academic Calendar': '',
      'II Year Academic Calendar': '',
      'III & IV Year Academic Calendar': getPDFUrl('pdf/AC EVEN SEMESTER 2023-2024 VII &VIII (3).pdf'),
    },
  },
  '2022–23': {
    'ODD Semester': {
      'I Year Academic Calendar': getPDFUrl('pdf/ACADEMIC CALENDER ODD SEM I YR 22-23.pdf'),
      'II Year Academic Calendar': getPDFUrl('pdf/ACADEMIC CALENDER ODD SEM II YR.pdf'),
      'III & IV Year Academic Calendar': getPDFUrl('pdf/ACADEMIC CALENDER ODD SEM  III YEAR 2023-2024.pdf'),
    },
    'EVEN Semester': {
      'I Year Academic Calendar': getPDFUrl('pdf/ACADEMIC CALENDER EVEN SEM 2022-2023.pdf'),
      'II Year Academic Calendar': getPDFUrl('pdf/AC II,III,IV YR EVEN SEM ACADEMIC CALENDER 22-23-compressed.pdf'),
      'III & IV Year Academic Calendar': '',
    },
  },
};

const yearWiseData = years.map(({ year }) => ({
  year,
  semesters: semesters.map(({ title }) => ({
    title,
    calendars: [
      { label: 'I Year Academic Calendar' },
      { label: 'II Year Academic Calendar' },
      { label: 'III & IV Year Academic Calendar' },
    ],
  })),
}));

const AcademicCalendar = () => {
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
     <div className="relative mt-0 bg-white">
      {/* Back Button */}
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
    <div className="min-h-screen bg-white text-center px-4 pb-10">
      <h4 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-6">Academic Calendar</h4>
      <div className="w-32 h-1 bg-yellow-400 rounded-full mx-auto mt-4"></div>
      <p className="text-gray-600 max-w-3xl mt-2 mx-auto">
        Explore the structured academic timeline including semester start dates, important events, and examination periods for the academic years listed below.
      </p>

      {yearWiseData.map((data, idx) => (
        <div key={idx} className="mb-14">
          <h2 className="text-2xl font-semibold text-yellow-900 mt-10 mb-6">
            Academic Year {data.year}
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 items-start">
            {data.semesters.map((sem, sIdx) => (
              <div
                key={sIdx}
                className="bg-yellow-400 text-left rounded-xl shadow-xl p-6 w-full max-w-md"
              >
                <h3 className="text-lg font-bold mb-4 text-yellow-900">{sem.title}</h3>
                {sem.calendars.map((item, cIdx) => (
                  <button
                    key={cIdx}
                    className="w-full bg-white hover:bg-yellow-100 text-yellow-900 font-medium flex items-center gap-2 py-2 px-4 mb-3 rounded-md shadow transition duration-200"
                    onClick={() => setSelectedPDF((calendarPDFs as any)[data.year]?.[sem.title]?.[item.label] || '')}
                  >
                    <FileText className="w-5 h-5 text-yellow-700" />
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    
      {/* PDF Modal */}
      {selectedPDF && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl h-[90vh] relative">
            <button
              className="absolute top-4 right-4 z-10 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              onClick={() => setSelectedPDF(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="h-full w-full">
              <iframe 
                src={selectedPDF} 
                className="w-full h-full rounded-xl" 
                frameBorder="0"
                title="PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-12 mb-8">
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
  </div>
  );
};

export default AcademicCalendar;
