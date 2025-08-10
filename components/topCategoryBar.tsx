import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Channel {
  name: string;
  logo: string;
}

interface Category {
  name: string;
  subCategories: string[];
  stats: { label: string; value: string }[];
}

const newsCategories: Category[] = [
  {
    name: 'Top Stories',
    subCategories: [
      'Breaking News', 'Headlines', 'Updates', 'Live Coverage', 'Special Reports',
      'Investigations', 'Editorials', 'Features', 'Analysis', 'Opinion Pieces',
      'Local News', 'National News', 'International News', 'Trending Stories', 'Viral News',

    ],
    stats: [
      { label: 'Articles Today', value: '1,234' },
      { label: 'Live Updates', value: '56' },
      { label: 'Trending Topics', value: '12' },
      { label: 'Reader Views', value: '2.3M' },
    ]
  },
  {
    name: 'World',
    subCategories: [
      'Americas', 'Europe', 'Asia', 'Africa', 'Middle East',
      'Oceania', 'Global Conflicts', 'Diplomacy', 'International Relations', 'Human Rights',
      'Global Economy', 'Climate Issues', 'Cultural Events', 'Global Health', 'Migration',
     ],
    stats: [
      { label: 'Countries Covered', value: '195' },
      { label: 'Conflicts Monitored', value: '23' },
      { label: 'Diplomatic Events', value: '89' },
      { label: 'Global Reports', value: '456' },
    ]
  },
  {
    name: 'Politics',
    subCategories: [
      'Elections', 'Policy', 'Government', 'Legislation', 'Campaigns',
      'Political Parties', 'Debates', 'Public Opinion', 'Lobbying', 'Political Scandals',
      'Governance', 'Reforms', 'Bills', 'Voting Rights', 'Political Analysis',
    ],
    stats: [
      { label: 'Elections Tracked', value: '67' },
      { label: 'Bills Proposed', value: '342' },
      { label: 'Debates Held', value: '28' },
      { label: 'Voter Turnout', value: '65%' },
    ]
  },
  {
    name: 'Business',
    subCategories: [
      'Markets', 'Companies', 'Economy', 'Startups', 'Investments',
      'Corporate News', 'Stock Market', 'Entrepreneurship', 'Finance', 'Mergers',
      'Acquisitions', 'Banking', 'Real Estate', 'Retail', 'Supply Chain',
    ],
    stats: [
      { label: 'Market Cap', value: '$2.5T' },
      { label: 'Startups Funded', value: '789' },
      { label: 'Mergers', value: '45' },
      { label: 'Economic Growth', value: '3.2%' },
    ]
  },
  {
    name: 'Technology',
    subCategories: [
      'Gadgets', 'Innovation', 'Software', 'AI', 'Cybersecurity',
      'Tech Startups', 'Cloud Computing', 'Blockchain', 'IoT', 'Tech Policy',
      'Hardware', 'Tech Reviews', 'Digital Transformation', 'Data Privacy', 'Tech Trends',
     ],
    stats: [
      { label: 'New Patents', value: '1,456' },
      { label: 'Tech Startups', value: '234' },
      { label: 'AI Projects', value: '89' },
      { label: 'Cyber Attacks', value: '12' },
    ]
  },
  {
    name: 'Health',
    subCategories: [
      'Wellness', 'Diseases', 'Research', 'Nutrition', 'Mental Health',
      'Fitness', 'Medical Breakthroughs', 'Public Health', 'Vaccines', 'Healthcare Systems',
      'Epidemiology', 'Health Policy', 'Alternative Medicine', 'Medical Technology', 'Health News',
    ],
    stats: [
      { label: 'Research Studies', value: '567' },
      { label: 'Vaccine Doses', value: '1.2B' },
      { label: 'Health Alerts', value: '34' },
      { label: 'Wellness Programs', value: '123' },
    ]
  },
];

const channels: Channel[] = [
  { name: 'CNN', logo: 'https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/06183243/NBC-1.png' },
  { name: 'BBC', logo: 'https://img.freepik.com/free-vector/gradient-breaking-news-logo-design_23-2151157239.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'Fox News', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcapIMOjqC6gOXg8p4pB36JE1XL4EDuUY1Gg&s' },
  { name: 'Al Jazeera', logo: 'https://i.pinimg.com/736x/27/cb/c3/27cbc3bc2388158925c874e012498078.jpg' },
  { name: 'The Sun', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/BBC_News_HD_Logo.svg/2560px-BBC_News_HD_Logo.svg.png' }
];

export default function NewsTopBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleMouseEnter = (categoryName: string) => {
    setOpenDropdown(categoryName);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className=" md:bg-[#B9375D] text-white relative">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          {/* Categories Section */}
          <div className="flex space-x-4 md:space-x-8 items-center">
            {newsCategories.map((category, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category.name)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={`#${category.name.toLowerCase().replace(' ', '-')}`}
                  className="text-sm md:text-base font-medium hover:text-blue-600 transition-colors flex items-center"
                >
                  {category.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </a>
                
                {/* Individual Dropdown */}
                {openDropdown === category.name && (
                  <div className="absolute left-0 top-full text-black bg-[#E2DDB4] border rounded z-10 w-96 shadow-lg mt-1">
                    <div
                      className="px-6 py-4"
                      onMouseEnter={() => handleMouseEnter(category.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <h3 className="text-lg font-bold mb-4">{category.name}</h3>
                      <div className="grid grid-cols-2 gap-1">
                        {category.subCategories.map((sub, subIndex) => (
                          <a
                            key={subIndex}
                            href={`#${sub.toLowerCase().replace(' ', '-')}`}
                            className="px-3 py-2 text-sm hover:bg-gray-200 rounded transition-colors"
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="h-6 w-px bg-gray-300 mx-4"></div>
          </div>
          
          {/* Channel Logos Section */}
          <div className="flex space-x-4 md:space-x-8 items-center">
            {channels.map((channel, index) => (
              <a
                key={index}
                href={`#${channel.name.toLowerCase()}`}
                className="flex items-center"
              >
                <img
                  src={channel.logo}
                  alt={`${channel.name} logo`}
                  className="h-6 w-auto"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}