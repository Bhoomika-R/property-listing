'use client';

import { useState, useEffect } from 'react';
import { Property } from '../data/properties';

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<Property[]>([]);

  // Initialize wishlist from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      setWishlistItems(JSON.parse(stored));
    }
  }, []);

  // Add or remove property from wishlist, and toggle liked state
  const addToWishlist = (property: Property) => {
    setWishlistItems(prev => {
      // Check if property already exists in wishlist
      const exists = prev.some(item => item.id === property.id);
      
      // If property exists, remove it, otherwise add it
      const newItems = exists
        ? prev.filter(item => item.id !== property.id)
        : [...prev, { ...property, liked: true }];  // Add to wishlist with liked as true

      // Persist updated wishlist to localStorage
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      return newItems;
    });
  };

  // Toggle liked state of a property in the wishlist
  const toggleLike = (propertyId: string) => {
    setWishlistItems(prev => {
      const newItems = prev.map(item => {
        if (item.id === propertyId) {
          return { ...item, liked: !item.liked };  // Toggle liked state
        }
        return item;
      });

      // Persist updated wishlist to localStorage
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      return newItems;
    });
  };

  // Filter out only liked items from the wishlist
  const likedItems = wishlistItems.filter(property => property.liked);

  return { wishlistItems, likedItems, addToWishlist, toggleLike };
}
