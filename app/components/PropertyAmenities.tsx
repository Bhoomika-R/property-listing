interface AmenityProps {
  icon: string;
  label: string;
  count: number;
}

function Amenity({ icon, label, count }: AmenityProps) {
  return (
    <div className="amenity-item">
      <span className="amenity-icon">{icon}</span>
      <span className="amenity-count">{count}</span>
      <span className="amenity-label">{label}</span>
    </div>
  );
}

export default function PropertyAmenities() {
  return (
    <div className="amenities-container">
      <h3>Property Amenities</h3>
      <div className="amenities-grid">
        <Amenity icon="🏥" label="Hospital" count={2} />
        <Amenity icon="🚉" label="Gas stations" count={4} />
        <Amenity icon="🏫" label="Schools" count={2} />
      </div>
    </div>
  );
}