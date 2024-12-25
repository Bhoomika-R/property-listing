'use client';

import { useWishlist } from '../hooks/useWishlist';
import PropertyCard from '../components/PropertyCard';
import Navigation from '../components/Navigation';

export default function WishlistPage() {
  const { likedItems, toggleLike } = useWishlist();

  return (
    <main>
      <div className="container">
        <h1 style={{ margin: '20px 0', fontSize: '24px' }}>My Wishlist</h1>
        {likedItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            No liked properties in your wishlist yet
          </p>
        ) : (
          <div className="property-grid">
            {likedItems.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onLike={toggleLike}  // Pass toggleLike function to handle like/unlike
              />
            ))}
          </div>
        )}
      </div>
      <Navigation />
    </main>
  );
}
