'use client';

import { useWishlist } from '../hooks/useWishlist';
import PropertyCard from '../components/PropertyCard';
import Navigation from '../components/Navigation';

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();
  console.log("wishlistItems",wishlistItems);
  
  return (
    <main>
      <div className="container">
        <h1 style={{ margin: '20px 0', fontSize: '24px' }}>My Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            No properties in your wishlist yet
          </p>
        ) : (
          <div className="property-grid">
            {wishlistItems.map(property => (
              <PropertyCard
                key={property.id}
                property={{...property, liked:true}}
                onLike={() => toggleWishlist(property)}
              />
            ))}
          </div>
        )}
      </div>
      <Navigation />
    </main>
  );
}