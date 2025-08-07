'use client';

import React, { useState } from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import ChannelHeader from '@/components/channels/channelHeader';
import SentimentBarChart from '@/components/channels/sentimentBarChart';
import LatestArticles from '@/components/entity/latestArticles';
import BottomNav from '@/components/bottomNav';
import SiteHeader from '@/components/siteHeader';

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

export default function ChannelPageCNN() {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'year'>('month');

  return (
    <TooltipProvider>
      <SiteHeader />
      <div className="mt-16 min-h-screen bg-gradient-to-br from-[#27548A] via-[#2d5a94] to-[#1e4170] text-white">
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
    </TooltipProvider>
  );
}