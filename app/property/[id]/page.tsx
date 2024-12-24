import { MapPin } from 'lucide-react';
import { properties } from '../../data/properties';
import PropertyMap from '../../components/PropertyMap';
import PropertyAmenities from '../../components/PropertyAmenities';
import Navigation from '../../components/Navigation';
import '../../styles/property-detail.css';

// Add generateStaticParams for static path generation
export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

// Make the component a Server Component since we're using static params
export default function PropertyDetail({
  params,
}: {
  params: { id: string };
}) {
  const property = properties.find(p => p.id === params.id);

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="property-detail">
      <div className="property-header">
        <img src={property.images[0]} alt={property.title} className="property-image" />
        <div className="property-title-section">
          <h1>{property.title}</h1>
          <h2>1.5 Cr</h2>
          <p className="emi-text">EMI Available</p>
        </div>
      </div>

      <div className="location-section">
        <div className="location-header">
          <MapPin size={20} />
          <h3>Location</h3>
        </div>
        <p className="location-address">{property.location}</p>
        <PropertyMap property={property} />
        <button className="view-map-button">View on Map</button>
      </div>

      <PropertyAmenities />
      <Navigation />
    </div>
  );
}