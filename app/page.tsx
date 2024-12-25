'use client';

import { useState, useEffect } from 'react';
import PropertyCard from './components/PropertyCard';
import Navigation from './components/Navigation';
import { properties as initialProperties } from './data/properties';
import './styles/globals.css';

export default function Home() {
  const [properties, setProperties] = useState(initialProperties);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40
    ) {
      setVisibleCount(prev => Math.min(prev + 2, properties.length));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = (id: string) => {
    setProperties(prev =>
      prev.map(property =>
        property.id === id
          ? { ...property, liked: !property.liked }
          : property
      )
    );
  };

  return (
    <main>
      <div className="container">
        <div className="property-grid">
          {properties.slice(0, visibleCount).map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onLike={handleLike}
            />
          ))}
        </div>
      </div>
      <Navigation />
    </main>
  );
}