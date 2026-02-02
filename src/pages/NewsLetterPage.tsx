import React, { useState } from 'react';
import { FileText, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getPDFUrl = (path: string) => {
  return `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;
};

const newsletterLinks = [
  { title: "Newsletter 2023-24(1)", url: getPDFUrl("pdf/newsletter-1(2324).pdf") },
  { title: "Newsletter 2023-24(2)", url: getPDFUrl("pdf/newsletter-2(2324).pdf") },
  { title: "Newsletter 2022-23(1)", url: getPDFUrl("pdf/newsletter-1(22-23).pdf") },
  { title: "Newsletter 2022-23(2)", url: getPDFUrl("pdf/newsletter-2(22-23).pdf") },
  { title: "Newsletter 2021-22(1)", url: getPDFUrl("pdf/newsletter-1(21-22).pdf") },
  { title: "Newsletter 2021-22(2)", url: getPDFUrl("pdf/newsletter-2(21-22).pdf") },
];

const NewsletterPage = () => {
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 pb-10">
      {/* Back Button */}
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

      {/* Big White Card */}
      <div className="bg-white shadow-2xl rounded-2xl p-10 mt-16 w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-black text-center">Newsletters</h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full" />
        <p className="text-md text-gray-600 mt-2 mb-10 px-4 max-w-2xl mx-auto text-center">
          Browse through our newsletters, highlighting key events, updates, and
          milestones from our institution.
        </p>

        {/* Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsletterLinks.map((item, idx) => (
            <button
              key={idx}
              className="relative group bg-yellow-500 rounded-2xl shadow-xl p-8 w-full text-center hover:scale-105 transition-transform text-white"
              onClick={() => setSelectedPDF(item.url)}
            >
              <FileText className="w-10 h-10 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              <span className="text-lg font-semibold">{item.title}</span>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-3/4"></span>
            </button>
          ))}
        </div>
      </div>

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

export default NewsletterPage;
