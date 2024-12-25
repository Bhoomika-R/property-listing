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
    <div>
    <div className="property-detail">
      

      <div className="property-header">
        <div className="most-liked-tag">Most liked</div>
        <img src={property.images[0]} alt={property.title} className="property-image" />
      </div>

      <div className="content">
        <div className="title-section">
          <div className="title-row">
            <h1>{property.title}</h1>
            <div className="price-row">
              <h2>{property.price}</h2>
              <span className="emi-tag">EMI Available</span>
            </div>
          </div>
          <div className="location-pin">
            <MapPin size={16} />
            <span>Sector 57, Gurgaon</span>
          </div>
        </div>

        <div className="location-section">
          <h3 className="section-title">Location</h3>
          <div className="location-card">
            <MapPin size={20} className="location-icon" />
            <p className="location-address">
              {property.locationDetails}
            </p>
          </div>
          <div className="map-section">
            <div className="map-container">
              <PropertyMap property={property} />
            </div>
            <button className="view-map-button" 
            >
              View on Map
            </button>
          </div>
        </div>

        <div className="amenities-section">
          <div className="amenities-grid">
            <div className="amenities-type-button">
              <span className="count" style={{marginRight:'2px'}}>2</span>
              <span className="label">Hospital</span>
            </div>
            <div className="amenities-type-button">
              <span className="count" style={{marginRight:'2px'}}>4</span>
              <span className="label">Gas stations</span>
            </div>
            <div className="amenities-type-button">
              <span className="count" style={{marginRight:'2px'}}>2</span>
              <span className="label">Schools</span>
            </div>
          </div>
        </div>

        <div className="property-type">
          <h3>Property Ammenties</h3>
          <div className="type-buttons">
            <button className="type-button active">House</button>
            <button className="type-button">Apartment</button>
          </div>
        </div>
      </div>

    </div>
      <Navigation />
    </div>
  );
}