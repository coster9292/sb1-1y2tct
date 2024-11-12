import React from 'react';

interface CarImageProps {
  imageUrl?: string;
  title: string;
}

export function CarImage({ imageUrl, title }: CarImageProps) {
  return (
    <div className="h-64 bg-gray-50 rounded-xl overflow-hidden mb-8">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-400">No image available</span>
        </div>
      )}
    </div>
  );
}