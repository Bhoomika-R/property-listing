'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Property } from '../data/properties';
import Image from 'next/image';
import '../styles/property-detail.css'
interface PropertyMapProps {
  property: Property;
}

export default function PropertyMap({ property }: PropertyMapProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  // URL for static Google Maps preview image
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${property.coordinates.lat},${property.coordinates.lng}&zoom=15&size=600x400&markers=color:red%7C${property.coordinates.lat},${property.coordinates.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

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

    setIsMapLoaded(true); // Mark that the map has loaded
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
          <Image 
            src="https://cdn.prod.website-files.com/5c29380b1110ec92a203aa84/66e5ce469b48938aa34d8684_Google%20Maps%20-%20Compressed.jpg"
            alt="Property Location"
            width={600} // specify width
            height={400} // specify height
            onClick={openInGoogleMaps} // open Google Maps on click
            style={{ cursor: 'pointer' }}
          />
      </div>
    </>
  );
}
