import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Users
} from 'lucide-react';

interface Facility {
  id: number;
  name: string;
  description: string;
  image: string;
  capacity?: string;
  features?: string[];
  category: string;
}

interface FacilitiesCarouselProps {
  facilities?: Facility[];
  departmentName?: string;
}

const FacilitiesCarousel: React.FC<FacilitiesCarouselProps> = ({
  facilities = [],
  departmentName = 'Department',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 3;

  // Use passed facilities or fall back to default facilities if none provided
  const enhancedFacilities: Facility[] = facilities.length > 0 ? facilities : [
    {
      id: 1,
      name: 'AI & Machine Learning Lab',
      description: 'State-of-the-art laboratory equipped with high-performance GPUs and advanced computing infrastructure for AI research and development.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '50 Students',
      features: ['NVIDIA Tesla GPUs', 'High-speed Computing', 'Research Workstations', '24/7 Access'],
      category: 'Research Lab'
    },
    {
      id: 2,
      name: 'Robotics Workshop',
      description: 'Advanced robotics facility with industrial-grade robotic arms, sensors, and automation equipment for hands-on learning.',
      image: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '30 Students',
      features: ['Robotic Arms', 'Sensor Networks', 'Automation Systems', 'Safety Equipment'],
      category: 'Workshop'
    },
    {
      id: 3,
      name: 'Cloud Computing Center',
      description: 'Modern cloud infrastructure lab with access to major cloud platforms and enterprise-level computing resources.',
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '60 Students',
      features: ['AWS Access', 'Azure Platform', 'Google Cloud', 'Hybrid Infrastructure'],
      category: 'Computing Center'
    },
    {
      id: 4,
      name: 'Innovation & Incubation Center',
      description: 'Dedicated space for student startups and entrepreneurship development with mentoring and funding support.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '20 Startups',
      features: ['3D Printers', 'Prototyping Tools', 'Mentoring Support', 'Funding Assistance'],
      category: 'Incubation'
    },
    {
      id: 5,
      name: 'High Performance Computing Lab',
      description: 'Supercomputing facility for complex simulations, data analysis, and computational research projects.',
      image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '40 Students',
      features: ['Parallel Processing', 'Cluster Computing', 'Scientific Software', 'Research Support'],
      category: 'Research Lab'
    },
    {
      id: 6,
      name: 'Digital Library & Learning Commons',
      description: 'Modern digital library with extensive e-resources, collaborative spaces, and advanced learning technologies.',
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '200 Students',
      features: ['50K+ E-books', 'Research Databases', 'Study Pods', 'Digital Resources'],
      category: 'Library'
    }
  ];

  const totalPages = Math.ceil(enhancedFacilities.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= enhancedFacilities.length ? 0 : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, enhancedFacilities.length - itemsPerPage) : Math.max(0, prevIndex - itemsPerPage)
    );
  };

  const goToPage = (pageIndex: number) => {
    setCurrentIndex(pageIndex * itemsPerPage);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      
      <div className="mb-12">
        <div className="text-center mb-10">
          <h4 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Facilities & Infrastructure
          </h4>
          <div className="w-32 h-1 bg-yellow-400 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            World-class facilities supporting excellence in {departmentName}
          </p>
        </div>

        <div className="flex justify-center md:justify-end items-center space-x-6 mb-6">
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / itemsPerPage) === index
                    ? 'bg-yellow-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={prevSlide}
              className="bg-gray-100 hover:bg-yellow-500 hover:text-white p-3 rounded-full transition-all duration-300 group shadow-sm"
              disabled={currentIndex === 0}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-gray-100 hover:bg-yellow-500 hover:text-white p-3 rounded-full transition-all duration-300 group shadow-sm"
              disabled={currentIndex + itemsPerPage >= enhancedFacilities.length}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
        {enhancedFacilities.slice(currentIndex, currentIndex + itemsPerPage).map((facility) => (
          <div
            key={facility.id}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border border-gray-200 hover:border-yellow-300 flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={facility.image && facility.image.startsWith('/') ? `${import.meta.env.BASE_URL}${facility.image.slice(1)}` : facility.image || '/api/placeholder/400/300'}
                alt={facility.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                {facility.category}
              </div>

              {facility.capacity && (
                <div className="absolute bottom-4 right-4 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{facility.capacity}</span>
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex-grow">
                <h5 className="text-xl font-bold text-gray-900 group-hover:text-yellow-700 transition-colors mb-2">
                  {facility.name}
                </h5>
                <p className="text-gray-600 mb-4">
                  {facility.description}
                </p>
              
                <div className="mb-4">
                  <h6 className="font-semibold text-gray-900 mb-2 text-sm">Key Features:</h6>
                  <div className="flex flex-wrap gap-2">
                    {facility.features && facility.features.length > 0 ? (
                      <>
                        {facility.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                            {feature}
                          </span>
                        ))}
                        {facility.features.length > 3 && (
                          <span className="text-gray-500 text-xs">+{facility.features.length - 3} more</span>
                        )}
                      </>
                    ) : (
                      <span className="text-gray-500 italic">No specific features listed</span>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
  
    </div>
  );
};

export default FacilitiesCarousel;
