'use client';
import { openInGoogleMaps } from "@/lib/googleMapsUtils";

interface ViewMapButtonProps {
  locationDetails: string;
}

export default function ViewMapButton({ locationDetails }: ViewMapButtonProps) {
  return (
    <button className="view-map-button" 
      onClick={() => openInGoogleMaps(locationDetails)}
    >
      View on Map
    </button>
  );
}
