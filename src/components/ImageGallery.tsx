import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';

interface Image {
  url: string;
  caption: string;
}

interface ImageGalleryProps {
  labName: string;
  images: Image[];
}

const ImageGallery: React.FC<ImageGalleryProps> = React.memo(({ labName, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = React.useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = React.useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const openModal = React.useCallback((index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (images.length === 0) {
    return <p className="text-gray-500">No images available for {labName}.</p>;
  }

  return (
    <>
      <div className="relative group">
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={images[currentImageIndex]?.url.startsWith('/') 
              ? `${import.meta.env.BASE_URL}${images[currentImageIndex]?.url.slice(1)}` 
              : images[currentImageIndex]?.url}
            alt={images[currentImageIndex]?.caption || `${labName} Image`}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-sm font-medium">{images[currentImageIndex]?.caption}</p>
            <p className="text-xs text-gray-200">
              {currentImageIndex + 1} of {images.length}
            </p>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-500 text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-yellow-500 text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          <button
            onClick={() => openModal(currentImageIndex)}
            className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                  currentImageIndex === index
                    ? 'border-amber-500 ring-2 ring-amber-200'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <img
                  src={image.url.startsWith('/') 
                    ? `${import.meta.env.BASE_URL}${image.url.slice(1)}` 
                    : image.url}
                  alt={`${labName} thumbnail ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  sizes="100px"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl max-h-full">
            <img
              src={images[currentImageIndex]?.url.startsWith('/') 
                ? `${import.meta.env.BASE_URL}${images[currentImageIndex]?.url.slice(1)}` 
                : images[currentImageIndex]?.url}
              alt={images[currentImageIndex]?.caption}
              loading="lazy"
              decoding="async"
              sizes="90vw"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-4 rounded-lg backdrop-blur-sm">
              <p className="font-medium">{images[currentImageIndex]?.caption}</p>
              <p className="text-sm text-gray-300">
                {labName} - Image {currentImageIndex + 1} of {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default ImageGallery;
