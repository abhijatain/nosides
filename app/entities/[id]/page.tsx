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
import ClusterArticleSentiment from '@/components/clusterLargeScreen';

// Import data from data.tsx
import { clustersData, articlesData, entityData } from '@/app/data';
import { Info, TrendingDown, TrendingUp } from 'lucide-react';

// Mock entity data (subset of mockEntityData, only what isn't replaced by imports)


export default function EntityPage() {
  return (
    <TooltipProvider>
      <SiteHeader />
      <div className="md:hidden mt-16 md:mt-34 min-h-screen bg-gradient-to-br from-[#27548A] via-[#2d5a94] to-[#1e4170] text-white">
        <EntityHeader name={entityData.name} type={entityData.type} />
        <WikiInfo info={entityData.wikiInfo} />
        <div className="bg-white rounded-t-2xl p-4 ">
          <SentimentChart data={entityData.sentimentData} />
          <EntityGraph
            mainEntity={entityData.name}
            relationships={entityData.relationships}
          />
          <LatestArticles articles={articlesData} />
        </div>
      </div>
      <div className="hidden md:block mt-38 min-h-screen ">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2">
            {/* Left Column: Cluster Components (2/3 width) */}
            <div className="w-[60%] border-r-2 pr-4 border-black">
              <div className='mx-2 mt-2 rounded border-2 border-black text-black p-4 md:p-0'>
                <EntityHeader name={entityData.name} type={entityData.type} />
                <WikiInfo info={entityData.wikiInfo} />
              </div>
              <ClusterArticleSentiment clusters={clustersData} />
            </div>
            {/* Right Column: NewsFilterBeam (1/3 width) */}
            <div className="p-2 w-[40%]">
              <div className="bg-[#E2DDB4] rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5  mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-md font-semibold text-gray-800 mb-1">Sentiment Over Time</h3>
                    <p className="text-sm text-gray-600">
                      This chart tracks how news channels portray the entity over time, showing whether coverage is
                      <span className="inline-flex items-bottom mx-1 ">
                    <span className="font-medium text-green-700">supportive</span>
                  </span>
                  or
                  <span className="inline-flex items-bottom mx-1">
                    <span className="font-medium text-red-700">critical</span>
                  </span>. Values are averaged across all news sources we cover.
                    </p>
                  </div>
                </div>
              </div>
              <SentimentChart data={entityData.sentimentData} />
              <EntityGraph
                mainEntity={entityData.name}
                relationships={entityData.relationships}
              />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}