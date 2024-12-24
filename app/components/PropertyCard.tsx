'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Property } from '../data/properties';
import { useRouter } from 'next/navigation';

interface PropertyCardProps {
  property: Property;
  onLike: (id: string) => void;
}

export default function PropertyCard({ property, onLike }: PropertyCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const handleCardClick = () => {
    router.push(`/property/${property.id}`);
  };

  return (
    <div className="property-card" onClick={handleCardClick}>
      <div className="image-slider">
        <img src={property.images[currentImage]} alt={property.title} onClick={nextImage} />
        <div className="slider-dots">
          {property.images.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentImage ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage(index);
              }}
            />
          ))}
        </div>
        <button
          className="like-button"
          onClick={(e) => {
            e.stopPropagation();
            onLike(property.id);
          }}
        >
          <Heart
            size={20}
            fill={property.liked ? '#ff0000' : 'none'}
            color={property.liked ? '#ff0000' : '#666666'}
          />
        </button>
      </div>
      <div className="property-info">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">{property.location}</p>
        <div className="property-stats">
          <span>{property.views.toLocaleString()} views</span>
          <span>★ {property.rating}</span>
          <span>{property.dateRange}</span>
        </div>
      </div>
    </div>
  );
}