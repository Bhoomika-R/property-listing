'use client';

import { Home, Heart, Map, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="navigation">
      <Link href="/" className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
        <Home size={24} />
        <span>Explore</span>
      </Link>
      <Link href="/wishlist" className={`nav-item ${pathname === '/wishlist' ? 'active' : ''}`}>
        <Heart size={24} />
        <span>Wishlist</span>
      </Link>
      <Link href="/map" className={`nav-item ${pathname === '/map' ? 'active' : ''}`}>
        <Map size={24} />
        <span>Show map</span>
      </Link>
      <Link href="/profile" className={`nav-item ${pathname === '/profile' ? 'active' : ''}`}>
        <User size={24} />
        <span>Log in</span>
      </Link>
    </nav>
  );
}