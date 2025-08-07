'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import EntitiesColumn from '@/components/userProfile/entitiesColumn';
import ChannelLogosBar from '@/components/userProfile/channelLogosBar';
import CategoriesColumn from '@/components/userProfile/categoriesColumn';
import SentimentChart from '@/components/userProfile/sentimentChart';
import SiteHeader from '@/components/siteHeader';

export default function UserProfilePage() {
  const [name] = useState('John Doe');
  const [reads] = useState(10);
  const [saved] = useState(60);
  const [hours] = useState(5);
  const [newsletterPref, setNewsletterPref] = useState('whatsapp');
  const [phone] = useState('+1-234-567-8900');
  const [email] = useState('john.doe@example.com');
  const [followedEntities] = useState(['Tesla', 'Elon Musk', 'Apple']);
  const [followedChannels] = useState([
    { name: 'CNN', logo: 'https://via.placeholder.com/50?text=CNN' },
    { name: 'BBC', logo: 'https://via.placeholder.com/50?text=BBC' },
  ]);
  const [avoidCategories] = useState(['Sports', 'Entertainment']);

  // Dummy data for SentimentChart
   const dummyData = [
    { date: '2025-08-01', engagement: 5 },
    { date: '2025-08-02', engagement: 7 },
    { date: '2025-08-03', engagement: 3 },
    { date: '2025-08-04', engagement: 9 },
    { date: '2025-08-05', engagement: 6 },
    { date: '2025-08-06', engagement: 4 },
    { date: '2025-08-07', engagement: 8 },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 p-4">
      <SiteHeader />
      <div className="flex items-center mb-4 mt-16 mb-4">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src="https://via.placeholder.com/64" alt="User Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-semibold">{name}</h1>
          <div className="flex space-x-4 text-sm text-gray-600">
            <span>Reads: {reads}</span>
            <span>Saved: {saved}</span>
            <span>Hours: {hours}</span>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Newsletter Preference</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="whatsapp"
              checked={newsletterPref === 'whatsapp'}
              onChange={(e) => setNewsletterPref(e.target.value)}
              className="mr-2"
            />
            WhatsApp
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="email"
              checked={newsletterPref === 'email'}
              onChange={(e) => setNewsletterPref(e.target.value)}
              className="mr-2"
            />
            Email
          </label>
        </div>
      </div>
      <Button className="mb-4">Edit Profile</Button>
      <SentimentChart data={dummyData} />
      <EntitiesColumn entities={followedEntities} />
      <ChannelLogosBar channels={followedChannels} />
      <CategoriesColumn categories={avoidCategories} title="Avoid Categories" />
      
    </div>
  );
}