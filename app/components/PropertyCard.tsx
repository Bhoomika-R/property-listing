"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Property } from "../data/properties";
import { useRouter } from "next/navigation";

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
    <div onClick={handleCardClick}>
      <div className="property-card">
        <div className="image-slider">
          {property.mostLiked && (
            <div className="most-liked-tag">Most Liked</div>
          )}
          <img
            src={property.images[currentImage]}
            alt={property.title}
            onClick={nextImage}
          />
          <div className="slider-dots">
            {property.images.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentImage ? "active" : ""}`}
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
              size={16}
              fill={property.liked ? "#ff0000" : "none"}
              color={property.liked ? "#ff0000" : "#666666"}
            />
          </button>
        </div>
      </div>
      <div className="property-info">
        <div className="property-stats">
          <span className="views">👁 {property.views.toLocaleString()}</span>
          <span className="rating" style={{ color: property.rating < 3 ? 'red' : property.rating < 4 ? 'orange' : 'green' }}>★ {property.rating}</span>
        </div>
        <p className="property-title">{property.title}</p>
        <div className="property-date" >{property.dateRange}</div>
      </div>
    </div>
  );
}
