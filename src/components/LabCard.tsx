import React from 'react';
import { Users } from 'lucide-react';
import ImageGallery from './ImageGallery';

interface Image {
  url: string;
  caption: string;
}

interface LabCardProps {
  name: string;
  description: string;
  keyFeatures: string[];
  studentCapacity: number;
  images: Image[]; // Accept images directly
}

const LabCard: React.FC<LabCardProps> = React.memo(({
  name,
  description,
  keyFeatures,
  studentCapacity,
  images, // Use prop
}) => {
  // Removed redundant internal state and effect for fetching images

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="p-6 pb-4">
        <ImageGallery labName={name} images={images} />
      </div>

      <div className="p-6 pt-2">
        <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Users className="w-4 h-4" />
          {studentCapacity} Students
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors duration-200">
          {name}
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
          <div className="flex flex-wrap gap-2">
            {keyFeatures.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {feature}
              </span>
            ))}
            {keyFeatures.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                +{keyFeatures.length - 3} more
              </span>
            )}
          </div>
        </div>

        
      </div>
    </div>
  );
});

export default LabCard;
