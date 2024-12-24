'use client';

import { useEffect, useRef } from 'react';
import { Property } from '../data/properties';

interface PropertyMapProps {
  property: Property;
}

export default function PropertyMap({ property }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      
      mapInstanceRef.current = new Map(mapRef.current, {
        center: { lat: property.coordinates.lat, lng: property.coordinates.lng },
        zoom: 15,
        gestureHandling: "cooperative", // Enables two-finger pan on mobile
      });

      new google.maps.Marker({
        position: { lat: property.coordinates.lat, lng: property.coordinates.lng },
        map: mapInstanceRef.current,
        title: property.title,
      });
    };

    initMap();
  }, [property]);

  return <div ref={mapRef} className="property-map" />;
}