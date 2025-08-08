import React from 'react';
import { ChevronRight } from 'lucide-react';
import ChannelLogosBar from './home/channelLogosBar';

interface Channel {
  name: string;
  logo: string;
}

const newsCategories = [
  'Top Stories',
  'World',
  'Politics',
  'Business',
  'Technology',
  'Health'
];

const channels: Channel[] = [
  { name: 'CNN', logo: 'https://example.com/cnn-logo.png' },
  { name: 'BBC', logo: 'https://example.com/bbc-logo.png' },
  { name: 'Reuters', logo: 'https://example.com/reuters-logo.png' },
  { name: 'Al Jazeera', logo: 'https://example.com/aljazeera-logo.png' },
    { name: 'The Guardian', logo: 'https://example.com/guardian-logo.png' },
    { name: 'Bloomberg', logo: 'https://example.com/bloomberg-logo.png' },
    
];

export default function NewsTopBar() {
  return (
    <nav className="border-b-2 border-black bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center ">
          {/* Categories Section */}
          <div className="flex space-x-4 md:space-x-8 items-center">
            {newsCategories.map((category, index) => (
              <a
                key={index}
                href={`#${category.toLowerCase().replace(' ', '-')}`}
                className="text-sm md:text-base font-medium  hover:text-blue-600 transition-colors"
              >
                {category}
              </a>
            ))}
            <div className="h-6 w-px bg-gray-300 mx-4"></div>
          </div>
          
          {/* Channel Logos Section */}
          <div className="flex space-x-4 md:space-x-8 items-center">
            {channels.map((channel, index) => (
                <a
                  key={index}
                    href={`#${channel.name.toLowerCase()}`}
                    className="flex items-center space-x-2 text-sm md:text-base font-medium  hover:text-blue-600 transition-colors"
                >
                    {channel.name}
                </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}