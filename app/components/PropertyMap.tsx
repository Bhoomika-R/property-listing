'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { Property } from '../data/properties';

interface PropertyMapProps {
  property: Property;
}

export default function PropertyMap({ property }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  const initMap = () => {
    if (!mapRef.current) {
      console.error('Map container not found.');
      return;
    }

    if (!google?.maps) {
      console.error('Google Maps library is not loaded.');
      return;
    }

    // Initialize the map
    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: { lat: property.coordinates.lat, lng: property.coordinates.lng },
      zoom: 15,
      gestureHandling: 'cooperative',
    });

    // Add a marker
    const marker = new google.maps.Marker({
      position: { lat: property.coordinates.lat, lng: property.coordinates.lng },
      map: mapInstanceRef.current,
      title: property.title,
    });

    // Add an info window
    const infoWindow = new google.maps.InfoWindow({
      content: `<div>
                  <strong>${property.title}</strong>
                  <p>${property.locationDetails}</p>
                </div>`,
    });

    marker.addListener('click', () => {
      infoWindow.open(mapInstanceRef.current, marker);
    });
  };

  useEffect(() => {
    if (window.google?.maps && mapRef.current) {
      initMap();
    }
  }, [property]);

  const openInGoogleMaps = () => {
    const locationDetailsEncoded = encodeURIComponent(property.locationDetails);
    const url = `https://www.google.com/maps/search/?api=1&query=${locationDetailsEncoded}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Load the Google Maps script */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        strategy="lazyOnload"
        onLoad={() => {
          if (mapRef.current) initMap();
        }}
        onError={(error) => {
          console.error('Error loading Google Maps:', error);
        }}
      />
      <div className="map-wrapper">
        <div
          ref={mapRef}
          className="property-map"
          onClick={openInGoogleMaps}
          style={{
            width: '100%',
            height: '400px',
            cursor: 'pointer',
          }}
        />
      </div>
    </>
  );
}
