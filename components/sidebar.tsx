'use client';

import { Home, Newspaper, Globe, Grid, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SideNav() {
  return (
    <nav
      className={cn(
        'fixed left-0 top-0 z-40 h-full w-64 border-r bg-background transition-transform duration-300 hidden md:block'
      )}
    >
      <div className="flex h-full flex-col p-4">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/">
              <Home className="mr-2 h-6 w-6" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/articles">
              <Newspaper className="mr-2 h-6 w-6" />
              Feed
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/entities">
              <Globe className="mr-2 h-6 w-6" />
              Entities
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/channels">
              <Grid className="mr-2 h-6 w-6" />
              Channels
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/profile">
              <User className="mr-2 h-6 w-6" />
              Profile
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}