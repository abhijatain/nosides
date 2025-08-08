'use client';

import { useState, useEffect } from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import EntityHeader from '@/components/entity/entityHeader';
import SentimentChart from '@/components/entity/sentimentChart';
import WikiInfo from '@/components/entity/wikiInfo';
import EntityGraph from '@/components/entity/entityGraph';
import LatestArticles from '@/components/entity/latestArticles';
import BottomNav from '@/components/bottomNav';
import SiteHeader from '@/components/siteHeader';

// Mock data for demonstration
const mockEntityData = {
  name: "Tesla, Inc.",
  type: "organization",
  articleCount: 3421, // Plausible estimate based on Tesla's media coverage
  readCount: 1250000, // Plausible estimate for article reads
  sentimentData: [
    { date: "2025-01-01", youtube: 0.4, news: 0.3 }, // Positive due to product launches
    { date: "2025-02-01", youtube: 0.2, news: 0.1 }, // Slight dip
    { date: "2025-03-01", youtube: -0.1, news: -0.2 }, // Negative sentiment from controversies
    { date: "2025-04-01", youtube: 0.5, news: 0.4 }, // Recovery from new announcements
    { date: "2025-05-01", youtube: 0.3, news: 0.2 }, // Stable positive sentiment
    { date: "2025-06-01", youtube: 0.1, news: -0.1 }, // Mixed sentiment
    { date: "2025-07-01", youtube: -0.2, news: -0.3 }, // Negative from X post sentiment
  ],
  wikiInfo: {
    summary: "Tesla, Inc. is an American electric vehicle and clean energy company based in Austin, Texas. Tesla designs and manufactures electric cars, battery energy storage, and solar products. Founded in 2003 by Martin Eberhard and Marc Tarpenning, it became the first American automaker to go public since Ford in 1956.",
    url: "https://en.wikipedia.org/wiki/Tesla,_Inc."
  },
   relationships: [
    { target: "Elon Musk", weight: 0.9, type: "CEO" }, // Strong relationship
    { target: "General Motors", weight: 0.5, type: "competitor" }, // Moderate competition
    { target: "Panasonic", weight: 0.7, type: "partner" }, // Strong partnership for batteries
    { target: "BYD", weight: 0.4, type: "competitor" }, // Growing competition
    { target: "NVIDIA", weight: 0.75, type: "partner" }, // Strong partnership for AI chips
    { target: "Ford", weight: 0.45, type: "competitor" } // Moderate competition in EV market
  ],
  articles: [
    {
      title: "Tesla’s Robotaxi Delay Sparks Investor Concerns",
      source: "Reuters",
      date: "2025-07-15",
      url: "https://www.reuters.com/technology/tesla-robotaxi-delay-2025-07-15/",
      snippet: "Tesla’s delay in unveiling its Robotaxi has raised questions about its autonomous driving timeline..."
    },
    {
      title: "Tesla’s Q2 Earnings Beat Expectations",
      source: "Bloomberg",
      date: "2025-07-22",
      url: "https://www.bloomberg.com/news/tesla-q2-2025/",
      snippet: "Tesla reported stronger-than-expected earnings, driven by energy storage growth..."
    },
    {
      title: "Tesla Faces Criticism Over Political Stance",
      source: "The Guardian",
      date: "2025-08-01",
      url: "https://www.theguardian.com/technology/tesla-political-2025-08-01/",
      snippet: "Recent political comments by Tesla’s CEO have stirred debate among consumers..." //
    }
  ]
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

export default function EntityPage() {
  return (
    <TooltipProvider>
      <SiteHeader />
      <div className="mt-16 min-h-screen bg-gradient-to-br from-[#27548A] via-[#2d5a94] to-[#1e4170] text-white">
        <EntityHeader name={mockEntityData.name} type={mockEntityData.type} />
        <WikiInfo info={mockEntityData.wikiInfo} />
        <div className="bg-white rounded-t-2xl p-4 ">
          <SentimentChart data={mockEntityData.sentimentData} />
          
        
          <EntityGraph 
            mainEntity={mockEntityData.name} 
            relationships={mockEntityData.relationships} 
          />
          <LatestArticles articles={cnnArticles} />
        </div>
      </div>
    </TooltipProvider>
  );
}