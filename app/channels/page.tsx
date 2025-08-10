'use client';

import React, { useState } from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import ChannelHeader from '@/components/channels/channelHeader';
import SentimentBarChart from '@/components/channels/sentimentBarChart';
import LatestArticles from '@/components/entity/latestArticles';
import BottomNav from '@/components/bottomNav';
import SiteHeader from '@/components/siteHeader';
import ClusterArticleSentiment from '@/components/clusterLargeScreen';
import SentimentChart from '@/components/entity/sentimentChart';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Enhanced mock data for CNN
const cnnData = {
  name: "CNN",
  youtubeUrl: "https://www.youtube.com/@CNN",
  websiteUrl: "https://www.cnn.com",
  views: 17100000000, // 17.1B views
  articles: 25000,     // 25K articles
  shares: 8500000,     // 8.5M shares
};

// Mock sentiment data for entities mentioned by CNN
const sentimentData = {
  week: [
    { entity: "Apple", sentiment: 0.35 },
    { entity: "Biden Admin", sentiment: 0.25 },
    { entity: "Tesla", sentiment: 0.2 },
    { entity: "Elon Musk", sentiment: 0.15 },
    { entity: "Google", sentiment: 0.1 },
    { entity: "Meta", sentiment: -0.15 },
    { entity: "Amazon", sentiment: -0.2 },
    { entity: "Boeing", sentiment: -0.25 },
    { entity: "Twitter/X", sentiment: -0.3 },
    { entity: "TikTok", sentiment: -0.35 },
  ],
  month: [
    { entity: "Apple", sentiment: 0.4 },
    { entity: "Tesla", sentiment: 0.25 },
    { entity: "Biden Admin", sentiment: 0.2 },
    { entity: "Google", sentiment: 0.15 },
    { entity: "Elon Musk", sentiment: 0.1 },
    { entity: "Meta", sentiment: -0.1 },
    { entity: "Amazon", sentiment: -0.25 },
    { entity: "Boeing", sentiment: -0.3 },
    { entity: "TikTok", sentiment: -0.3 },
    { entity: "Twitter/X", sentiment: -0.35 },
  ],
  year: [
    { entity: "Apple", sentiment: 0.45 },
    { entity: "Biden Admin", sentiment: 0.3 },
    { entity: "Tesla", sentiment: 0.3 },
    { entity: "Google", sentiment: 0.2 },
    { entity: "Elon Musk", sentiment: 0.2 },
    { entity: "Meta", sentiment: -0.2 },
    { entity: "Amazon", sentiment: -0.3 },
    { entity: "Boeing", sentiment: -0.35 },
    { entity: "Twitter/X", sentiment: -0.4 },
    { entity: "TikTok", sentiment: -0.4 },
  ],
};

// Mock latest articles for CNN aligned with new component structure
const cnnArticles = [
  {
    title: "Apple's AI Integration Drives Market Confidence and Stock Rally",
    channels: [
      { name: "CNN Business", logo: "https://via.placeholder.com/40?text=CB" },
    ],
    date: "2025-08-06",
    url: "https://www.cnn.com/2025/08/06/apple-ai-integration",
    summary: "Apple's latest AI announcements have boosted investor confidence, with shares reaching new highs amid strong quarterly earnings and positive market reception.",
    entities: [
      { entity: "Apple", sentiment: 0.75, displaySentiment: "75%" },
      { entity: "Investors", sentiment: 0.68, displaySentiment: "68%" },
    ]
  },
  {
    title: "Tesla Factory Expansion Plans Face Environmental Scrutiny",
    channels: [
      { name: "CNN", logo: "https://via.placeholder.com/40?text=CNN" },
      { name: "CNN Climate", logo: "https://via.placeholder.com/40?text=CC" },
    ],
    date: "2025-08-05",
    url: "https://www.cnn.com/2025/08/05/tesla-factory-environment",
    summary: "Environmental groups raise concerns over Tesla's proposed factory expansion in Texas as the company seeks to double production capacity.",
    entities: [
      { entity: "Tesla", sentiment: -0.35, displaySentiment: "35%" },
      { entity: "Elon Musk", sentiment: -0.28, displaySentiment: "28%" },
    ]
  },
  {
    title: "Boeing Safety Oversight Under Comprehensive Federal Review",
    channels: [
      { name: "CNN", logo: "https://via.placeholder.com/40?text=CNN" },
    ],
    date: "2025-08-04",
    url: "https://www.cnn.com/2025/08/04/boeing-safety-review",
    summary: "Federal aviation regulators announce comprehensive review of Boeing's safety protocols following recent manufacturing quality concerns and ongoing issues.",
    entities: [
      { entity: "Boeing", sentiment: -0.78, displaySentiment: "78%" },
      { entity: "FAA", sentiment: 0.45, displaySentiment: "45%" },
    ]
  },
  {
    title: "TikTok Ban Appeals Process Enters Final Stage at Supreme Court",
    channels: [
      { name: "CNN Politics", logo: "https://via.placeholder.com/40?text=CP" },
      { name: "CNN Business", logo: "https://via.placeholder.com/40?text=CB" },
      { name: "CNN Tech", logo: "https://via.placeholder.com/40?text=CT" },
    ],
    date: "2025-08-03",
    url: "https://www.cnn.com/2025/08/03/tiktok-ban-appeals",
    summary: "The Supreme Court prepares to hear final arguments in TikTok's challenge to federal legislation that could ban the app in the United States.",
    entities: [
      { entity: "TikTok", sentiment: -0.62, displaySentiment: "62%" },
      { entity: "Supreme Court", sentiment: 0.18, displaySentiment: "18%" },
    ]
  },
];

const channelData = [
  { name: 'CNN', logo: 'https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/06183243/NBC-1.png' },
  { name: 'BBC', logo: 'https://img.freepik.com/free-vector/gradient-breaking-news-logo-design_23-2151157239.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'Fox News', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbniq9GcTcapIMOjqC6gOXg8p4pB36JE1XL4EDuUY1Gg&s' },
  { name: 'Al Jazeera', logo: 'https://i.pinimg.com/736x/27/cb/c3/27cbc3bc2388158925c874e012498078.jpg' },
  { name: 'The Sun', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/BBC_News_HD_Logo.svg/2560px-BBC_News_HD_Logo.svg.png' },
  { name: 'CNN', logo: 'https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/06183243/NBC-1.png' },
  { name: 'BBC', logo: 'https://img.freepik.com/free-vector/gradient-breaking-news-logo-design_23-2151157239.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'Fox News', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbniq9GcTcapIMOjqC6gOXg8p4pB36JE1XL4EDuUY1Gg&s' },
  { name: 'Al Jazeera', logo: 'https://i.pinimg.com/736x/27/cb/c3/27cbc3bc2388158925c874e012498078.jpg' },
  { name: 'The Sun', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/BBC_News_HD_Logo.svg/2560px-BBC_News_HD_Logo.svg.png' },
];

const clustersData = [
  {
    title: "Tesla's Robotaxi Delay Ignites Industry Discussion",
    summary: "Tesla's postponed Robotaxi launch has sparked widespread concerns and debates regarding the feasibility and timelines of autonomous driving technology in the automotive industry.",
    channels: [channelData[0], channelData[1], channelData[2], channelData[3], channelData[0], channelData[1]],
    date: '2025-08-05',
    url: 'https://example.com/tesla-robotaxi-delay',
    sentimentData: {
      week: [
        { entity: 'Elon Musk', sentiment: -0.28 },
        { entity: 'Tesla', sentiment: 0.35 },
      ],
      month: [
        { entity: 'Elon Musk', sentiment: 0.25 },
        { entity: 'Tesla', sentiment: -0.30 },
      ],
      year: [
        { entity: 'Elon Musk', sentiment: -0.30 },
        { entity: 'Tesla', sentiment: 0.40 },
      ],
    },
  },
  {
    title: 'Global Tech Regulation Intensifies Worldwide',
    summary: 'Stringent new regulations are significantly reshaping the global technology industry, creating challenges and opportunities for major companies like Apple and others.',
    channels: [channelData[1], channelData[3], channelData[2], channelData[6]],
    date: '2025-08-03',
    url: 'https://example.com/tech-regulation',
    sentimentData: {
      week: [
        { entity: 'Tim Cook', sentiment: 0.75 },
        { entity: 'Apple', sentiment: -0.75 },
      ],
      month: [
        { entity: 'Tim Cook', sentiment: 0.70 },
        { entity: 'Apple', sentiment: -0.70 },
      ],
      year: [
        { entity: 'Tim Cook', sentiment: 0.65 },
        { entity: 'Apple', sentiment: -0.65 },
      ],
    },
  },
  {
    title: 'TikTok Ban Faces Supreme Court Showdown',
    summary: 'TikTok is fiercely challenging a potential U.S. ban, with critical final arguments unfolding at the Supreme Court, impacting the future of the popular social media platform.',
    channels: [channelData[0], channelData[3], channelData[4]],
    date: '2025-08-03',
    url: 'https://example.com/tiktok-ban',
    sentimentData: {
      week: [
        { entity: 'TikTok', sentiment: 0.62 },
        { entity: 'TikTok Ban Appeal', sentiment: -0.62 },
      ],
      month: [
        { entity: 'TikTok', sentiment: 0.60 },
        { entity: 'TikTok Ban Appeal', sentiment: -0.60 },
      ],
      year: [
        { entity: 'TikTok', sentiment: 0.65 },
        { entity: 'TikTok Ban Appeal', sentiment: -0.65 },
      ],
    },
  },
  {
    title: 'Tesla’s Texas Factory Expansion Faces Backlash',
    summary: 'Environmental groups are raising significant concerns and criticism over Tesla’s ambitious plans to expand its factory in Texas, citing potential ecological impacts.',
    channels: [channelData[0], channelData[1]],
    date: '2025-08-05',
    url: 'https://example.com/tesla-expansion',
    sentimentData: {
      week: [
        { entity: 'Elon Musk', sentiment: -0.28 },
        { entity: 'Tesla', sentiment: -0.35 },
        { entity: 'Texas', sentiment: -0.35 },
      ],
      month: [
        { entity: 'Elon Musk', sentiment: -0.25 },
        { entity: 'Tesla', sentiment: -0.30 },
        { entity: 'Texas', sentiment: -0.30 },
      ],
      year: [
        { entity: 'Elon Musk', sentiment: -0.30 },
        { entity: 'Tesla', sentiment: -0.40 },
        { entity: 'Texas', sentiment: -0.40 },
      ],
    },
  },
];

// Mock entity sentiment data for search
const entitySentimentData = {
  Apple: [
    { date: "2025-01-01", news: 0.3 },
    { date: "2025-02-01", news: 0.1 },
    { date: "2025-03-01", news: -0.2 },
    { date: "2025-04-01", news: 0.4 },
    { date: "2025-05-01", news: 0.2 },
    { date: "2025-06-01", news: -0.1 },
    { date: "2025-07-01", news: -0.3 },
  ],
  Tesla: [
    { date: "2025-01-01", news: 0.2 },
    { date: "2025-02-01", news: 0.0 },
    { date: "2025-03-01", news: -0.3 },
    { date: "2025-04-01", news: 0.3 },
    { date: "2025-05-01", news: 0.1 },
    { date: "2025-06-01", news: -0.2 },
    { date: "2025-07-01", news: -0.4 },
  ],
  "Elon Musk": [
    { date: "2025-01-01", news: 0.1 },
    { date: "2025-02-01", news: -0.1 },
    { date: "2025-03-01", news: -0.4 },
    { date: "2025-04-01", news: 0.2 },
    { date: "2025-05-01", news: 0.0 },
    { date: "2025-06-01", news: -0.3 },
    { date: "2025-07-01", news: -0.5 },
  ],
  Google: [
    { date: "2025-01-01", news: 0.25 },
    { date: "2025-02-01", news: 0.15 },
    { date: "2025-03-01", news: -0.1 },
    { date: "2025-04-01", news: 0.35 },
    { date: "2025-05-01", news: 0.2 },
    { date: "2025-06-01", news: -0.05 },
    { date: "2025-07-01", news: -0.2 },
  ],
  "Biden Admin": [
    { date: "2025-01-01", news: 0.15 },
    { date: "2025-02-01", news: 0.05 },
    { date: "2025-03-01", news: -0.25 },
    { date: "2025-04-01", news: 0.3 },
    { date: "2025-05-01", news: 0.1 },
    { date: "2025-06-01", news: -0.15 },
    { date: "2025-07-01", news: -0.35 },
  ],
};

export default function ChannelPageCNN() {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'year'>('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('Apple'); // Default entity
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 0) {
      const filteredSuggestions = Object.keys(entitySentimentData).filter(entity =>
        entity.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectEntity = (entity: string) => {
    setSelectedEntity(entity);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <TooltipProvider>
      <SiteHeader />
      <div className="md:hidden mt-16 min-h-screen bg-gradient-to-br from-[#27548A] via-[#2d5a94] to-[#1e4170] text-white">
        <ChannelHeader channel={cnnData} />
        <div className="bg-gradient-to-br from-[#E9E9E9] to-[#f5f5f5] rounded-t-3xl p-4 shadow-2xl">
          <SentimentBarChart
            sentimentData={sentimentData}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
          />
          <LatestArticles articles={cnnArticles} />
        </div>
      </div>
      <div className="hidden md:block p-6 lg:mt-36">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2">
            {/* Left Column: Cluster Components (2/3 width) */}
            <div className="w-[60%] border-r-2 pr-4 border-black">
              <div className='mb-4 rounded bg-gradient-to-br from-[#27548A] via-[#2d5a94] to-[#1e4170] text-white'>
                <ChannelHeader channel={cnnData} />
              </div>
              <ClusterArticleSentiment clusters={clustersData} />
            </div>
            {/* Right Column: Sentiment Analysis (1/3 width) */}
            <div className="w-[40%] p-2">
              <h1 className="text-2xl font-bold mb-4">CNN Sentiment Analysis</h1>
              <div className="mb-4 text-sm">
                The chart below illustrates the sentiment expressed by CNN towards various entities, indicating levels of support or criticism over selected time periods.
              </div>
              <SentimentBarChart
                sentimentData={sentimentData}
                timeFilter={timeFilter}
                setTimeFilter={setTimeFilter}
              />
              <div >
                <h2 className="text-xl font-semibold mb-2">Entity Sentiment Over Time</h2>
                <div className="relative mb-4 ">
                  <Input
                    type="text"
                    placeholder="Search for an entity..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => handleSearch(searchTerm)}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  {suggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border rounded-md w-full mt-1 max-h-60 overflow-auto">
                      {suggestions.map((entity, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectEntity(entity)}
                        >
                          {entity}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <SentimentChart data={entitySentimentData[selectedEntity] || entitySentimentData['Apple']} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}