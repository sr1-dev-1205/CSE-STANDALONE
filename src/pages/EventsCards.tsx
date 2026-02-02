import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface EventItem {
  id: number;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  type: string;
  registrationOpen: boolean;
  organizer: string;
  image: string;
}

interface EventsCardsProps {
  events: EventItem[];
}

const fallbackImage = '/image.png';

const EventsCards: React.FC<EventsCardsProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const getImageSrc = (img: string) => {
    if (!img) return fallbackImage;
    if (img.startsWith('http')) return img;
    const path = img.startsWith('/') ? img.slice(1) : img;
    return `${import.meta.env.BASE_URL}${path}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'TBA';
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="bg-white px-6 md:px-10 py-10 rounded-2xl shadow-lg">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 relative inline-block">
          Upcoming Events
          <span className="block w-20 h-1 bg-yellow-400 mx-auto mt-2 rounded-full"></span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Join our exciting events, workshops, and seminars conducted on campus.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gray-50 border border-yellow-500 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="relative h-44">
              <img
                src={getImageSrc(event.image)}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = fallbackImage;
                }}
              />
            </div>
            <div className="p-4">
              <h4 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-yellow-600">
                {event.title}
              </h4>
              <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                <div className="flex items-center gap-1 bg-yellow-400 px-2 py-1 rounded-full font-semibold text-yellow-700">
                  <Calendar size={14} />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full font-semibold text-gray-700">
                  <MapPin size={14} />
                  {event.venue}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-2xl w-full p-6 md:p-8 rounded-xl relative shadow-2xl">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2 relative inline-block">
              {selectedEvent.title}
              <span className="block w-20 h-1 bg-yellow-400 mt-2 rounded-full"></span>
            </h3>
            <img
              src={getImageSrc(selectedEvent.image)}
              alt={selectedEvent.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
            <div className="flex flex-wrap gap-3 text-sm mt-4">
              <div className="flex items-center gap-1 bg-yellow-400 text-yellow-700 font-semibold px-3 py-1 rounded-full">
                <Calendar size={16} />
                {formatDate(selectedEvent.date)}
              </div>
              <div className="flex items-center gap-1 bg-gray-100 text-gray-700 font-semibold px-3 py-1 rounded-full">
                <MapPin size={16} />
                {selectedEvent.venue}
              </div>
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
  );
};

export default EventsCards;
