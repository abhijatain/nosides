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
      { name: 'The Sun', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/BBC_News_HD_Logo.svg/2560px-BBC_News_HD_Logo.svg.png' },
  { name: 'CNN', logo: 'https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/06183243/NBC-1.png' },
  { name: 'BBC', logo: 'https://img.freepik.com/free-vector/gradient-breaking-news-logo-design_23-2151157239.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'Fox News', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcapIMOjqC6gOXg8p4pB36JE1XL4EDuUY1Gg&s' },
  { name: 'Al Jazeera', logo: 'https://i.pinimg.com/736x/27/cb/c3/27cbc3bc2388158925c874e012498078.jpg' },

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
      <div className='md:hidden'>
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
      <div className="flex flex-col lg:flex-row gap-8 mt-36 max-w-7xl mx-auto">
    {/* Left Column - Sentiment Chart */}
    <div className="">
      <SentimentChart data={dummyData} />
    </div>
    
    {/* Right Column - User Info and Other Components */}
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
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
      
      <div>
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
      
      <Button className="w-fit">Edit Profile</Button>
      
      <EntitiesColumn entities={followedEntities} />
      <ChannelLogosBar channels={followedChannels} />
      <CategoriesColumn categories={avoidCategories} title="Avoid Categories" />
    </div>
  </div>
      
    </div>

    
  );
}