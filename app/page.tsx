"use client";

import { useState, useEffect } from "react";
import PropertyCard from "./components/PropertyCard";
import Navigation from "./components/Navigation";
import { properties as initialProperties } from "./data/properties";
import "./styles/globals.css";
import Header from "./components/Header";
import { useWishlist } from "./hooks/useWishlist";
export default function Home() {
  const [properties, setProperties] = useState(initialProperties);
  const { toggleWishlist, wishlistItems } = useWishlist();
  const [visibleCount, setVisibleCount] = useState(6);
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 40
    ) {
      setVisibleCount((prev) => Math.min(prev + 2, properties.length));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = (id: string) => {
    const likedProperty = properties.find((property) => property.id === id);
    if (!likedProperty) return;
    toggleWishlist(likedProperty);
    setProperties((prev) =>
      prev.map((property) =>
        property.id === id ? { ...property, liked: !property.liked } : property
      )
    );
  };

  return (
    <main>
      <Header />
      <div className="container">
        <div className="property-grid">
          {properties.slice(0, visibleCount).map((property) => {
            const isLiked = wishlistItems.some(
              (item) => item.id === property.id
            );
            return (
              <PropertyCard
                key={property.id}
                property={{...property, liked : isLiked}}
                onLike={handleLike}
              />
            );
          })}
        </div>
      </div>
      <Navigation />
    </main>
  );
}
