'use client';

import { useState, useEffect } from 'react';
import { Property } from '../data/properties';

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<Property[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      setWishlistItems(JSON.parse(stored));
    }
  }, []);

  const toggleWishlist = (property: Property) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === property.id);
      const newItems = exists
        ? prev.filter(item => item.id !== property.id) 
        : [...prev, property];        
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      return newItems;
    });
  };

  return { wishlistItems, toggleWishlist };
}