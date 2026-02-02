import React, { useState } from 'react';
import { CalendarDays, Users, ChevronLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import eventsData from '../data/cseLatestEventsData.json';

interface Event {
  title: string;
  date: string;
  description: string;
  participants: string;
  image: string;
}

const fallbackImage = 'fallback.jpg';

const CseLatestEvents: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const events: Event[] = eventsData || [];
  const navigate = useNavigate(); // ✅ FIX: useNavigate hook assigned properly

  const getImageSrc = (imgPath: string) => {
    if (!imgPath) return `${import.meta.env.BASE_URL}${fallbackImage}`;
    if (imgPath.startsWith('http')) return imgPath;
    const cleanPath = imgPath.replace(/^public\//, '').replace(/^\//, '');
    return `${import.meta.env.BASE_URL}${cleanPath}`;
  };

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

      <div className="bg-white p-8 rounded-2xl shadow-lg relative max-w-7xl mx-auto px-4 py-12 relative sm:px-6">
        <div className="text-center mb-12">
          <h4 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            CSE Latest Events
          </h4>
          <div className="w-32 h-1 bg-yellow-400 rounded-full mx-auto mt-4"></div>
          <p className="text-gray-600 max-w-3xl mt-2 mx-auto">
            Stay updated with the latest events and happenings in the Department of Computer Science and Engineering. Explore highlights, activities, and key moments from our recent engagements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group active:scale-95 sm:hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getImageSrc(event.image)}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 sm:scale-100 scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = fallbackImage;
                  }}
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h5 className="text-xl font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">
                    {event.title}
                  </h5>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                </div>
               <div className="flex flex-wrap gap-2 mt-4">
  <span className="flex items-center gap-2 bg-yellow-500 text-black font-semibold text-sm px-4 py-1.5 rounded-full shadow-sm">
    <CalendarDays size={16} />
    {event.date}
  </span>
  <span className="flex items-center gap-2 bg-gray-100 text-gray-800 font-medium text-sm px-4 py-1.5 rounded-full shadow-sm">
    <Users size={16} />
    {event.participants}
  </span>
</div>

              </div>
            </div>
          ))}
        </div>


        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-2xl relative">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-4">{selectedEvent.title}</h3>
              <img
                src={getImageSrc(selectedEvent.image)}
                alt={selectedEvent.title}
                className="w-full h-56 object-cover rounded-lg mb-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = fallbackImage;
                }}
              />
              <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
             <div className="flex flex-wrap gap-2 mt-4">
  <span className="flex items-center gap-2 bg-yellow-500 text-black font-semibold text-sm px-4 py-1.5 rounded-full shadow-sm">
    <CalendarDays size={16} />
    {selectedEvent.date}
  </span>
  <span className="flex items-center gap-2 bg-gray-100 text-gray-800 font-medium text-sm px-4 py-1.5 rounded-full shadow-sm">
    <Users size={16} />
    {selectedEvent.participants}
  </span>
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

export default CseLatestEvents;
