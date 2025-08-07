'use client';

import { useState, useEffect } from 'react';
import { Home, Newspaper, Globe, Grid, User } from 'lucide-react';
import Link from 'next/link';

export default function BottomNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px threshold
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`z-1000 fixed bottom-0 left-0 right-0 flex justify-around items-center bg-black text-white border-t py-4 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <Link href="/" className="flex flex-col items-center">
        <Home className="w-6 h-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link href="/articles" className="flex flex-col items-center">
        <Newspaper className="w-6 h-6" />
        <span className="text-xs mt-1">Feed</span>
      </Link>
      <Link href="/entities" className="flex flex-col items-center">
        <Globe className="w-6 h-6" />
        <span className="text-xs mt-1">Entities</span>
      </Link>
      <Link href="/channels" className="flex flex-col items-center">
        <Grid className="w-6 h-6" />
        <span className="text-xs mt-1">Channels</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center">
        <User className="w-6 h-6" />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
}