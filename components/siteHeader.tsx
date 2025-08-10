'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, Home, Newspaper, Globe, Grid, User } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import NewsTopBar from './topCategoryBar';

export default function SiteHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Set the current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setCurrentDate(formattedDate);

    // Handle scroll behavior
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { href: '/', label: 'Home', icon: <Home className="mr-2 h-6 w-6" /> },
    { href: '/articles', label: 'Feed', icon: <Newspaper className="mr-2 h-6 w-6" /> },
    { href: '/entities', label: 'Entities', icon: <Globe className="mr-2 h-6 w-6" /> },
    { href: '/channels', label: 'Channels', icon: <Grid className="mr-2 h-6 w-6" /> },
    { href: '/profile', label: 'Profile', icon: <User className="mr-2 h-6 w-6" /> },
  ];

  const largeScreenNavItems = [
    { href: '/entities', label: 'Entities', icon: <Globe className="mr-2 h-6 w-6" /> },
    { href: '/profile', label: 'Profile', icon: <User className="mr-2 h-6 w-6" /> },
  ];

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 bg-[#27548A] text-white md:bg-[#B9375D] md:text-white transition-transform duration-300 ',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="md:max-w-7xl md:mx-auto flex items-center justify-between p-4 lg:p-4 ">
        {/* Mobile and Tablet: Menu Button and Logo */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden mr-2 p-0">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col p-4 space-y-1">
                {navItems.map((item) => (
                  <Button key={item.href} variant="ghost" className="w-full justify-start" asChild>
                    <Link href={item.href}>
                      {item.icon}
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-2xl font-bold md:hidden">nosides</h1>
        </div>

        {/* Large Screen: Date, Logo, Entities, Profile */}
        <div className=" hidden lg:flex lg:flex-col lg:items-center  lg:justify-between lg:w-full lg:gap-6 ">

          <div className='md:border-b-2 md:p-2 hidden lg:flex lg:items-center  lg:justify-between lg:w-full'>
            <span className="text-base font-medium">{currentDate}</span>
            <h1 className="text-5xl font-bold">NOSIDES</h1>
            <div>
              {largeScreenNavItems.map((item) => (
                <Button key={item.href} variant="ghost" className=" hover:text-blue-200" asChild>
                  <Link href={item.href} className="flex items-center">
                    {item.icon}
                    {item.label}
                  </Link>
                </Button>
              ))}

            </div>
          </div>
          <NewsTopBar />
        </div>

      </div>
    </header>
  );
}