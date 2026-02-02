import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTable from '../components/ReusableTable';
import eventsData from '../data/eventsOrganisedData.json';
import { ChevronLeft, Calendar } from 'lucide-react';

const EventsOrganisedPage: React.FC = () => {
  const navigate = useNavigate();

  // Transform the data to match table format with proper column namess
  const tableData = eventsData.events.map((event) => ({
    'S.No': event.serialNo,
    'Society / Body': event.society,
    'Event Name': event.eventName,
    'Level': event.level,
    'Date': event.date,
    'year': event.year, // lowercase 'year' for filtering
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
      {/* Back Button (standardized size) */}
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

      {/* Header Section */}
      <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 text-yellow-600">
              <Calendar className="h-6 w-6" />
              <h1 className="text-lg sm:text-xl font-bold">Events Organised</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Banner Section */}
          <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 p-8 text-white">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Professional Societies & Events
              </h2>
              <div className="w-32 h-1 bg-white rounded-full mx-auto mb-4"></div>
              <p className="text-base sm:text-lg max-w-3xl mx-auto">
                Comprehensive list of technical events, workshops, seminars, and hackathons organized by 
                various professional societies including IEEE, CSI, IETE, Spices Club, ICT Academy, and more.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 border-b">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{eventsData.events.length}</div>
              <div className="text-sm text-gray-600 mt-1">Total Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {eventsData.events.filter(e => e.level === 'National').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">National Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {eventsData.events.filter(e => e.level === 'College').length}
              </div>
              <div className="text-sm text-gray-600 mt-1">College Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {Array.from(new Set(eventsData.events.map(e => e.society))).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Societies</div>
            </div>
          </div>

          {/* Table Section */}
          <div className="p-6">
            <ReusableTable
              data={tableData}
              title=""
              description="Browse through all events organized by professional societies and clubs from 2021 to 2024"
              showCategory={false}
            />
          </div>

          {/* Society Information */}
          <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-t">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Professional Societies & Bodies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from(new Set(eventsData.events.map(e => e.society))).map((society, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="text-yellow-600 font-bold text-sm">{society}</div>
                  <div className="text-gray-500 text-xs mt-1">
                    {eventsData.events.filter(e => e.society === society).length} events
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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

export default EventsOrganisedPage;
