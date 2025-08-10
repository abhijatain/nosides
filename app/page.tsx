'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import SiteHeader from '@/components/siteHeader';
import ChannelLogosBar from '@/components/home/channelLogosBar';
import Carousel from '@/components/home/clusterCarousel';
import EntitiesColumn from '@/components/home/entitiesColumn';
import LatestArticles from '@/components/entity/latestArticles';
import { CarouselItem } from '@/components/home/clusterCarousel';
import { FiFileText } from 'react-icons/fi';
import NewsFilterBeam from '@/components/home/newsFilterBeam';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import NewsTopBar from '@/components/topCategoryBar';
import FindConnection from '@/components/findConnections';
import ClusterArticleSentiment from '@/components/clusterLargeScreen';

import { channelData, clustersData, clustersData2, entitiesData2, articlesData } from './data'; // Import data

export default function HomePage() {
  return (
    <TooltipProvider>
      <div className="hidden md:flex flex-col min-h-screen ">
        <SiteHeader />
       
        <div className="flex-1 p-4 lg:p-6 lg:mt-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-2 ">
              {/* Left Column: Cluster Components (2/3 width) */}
              <div className="w-[60%]  border-r-2 pr-4 border-black">
                <ClusterArticleSentiment clusters={clustersData} />
              </div>
              {/* Right Column: NewsFilterBeam (1/3 width) */}
              <div className="">
                <NewsFilterBeam />
                <hr />
                <FindConnection />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-screen bg-slate-50 md:hidden">
        <SiteHeader />
        <div className="mt-18">




          <NewsFilterBeam />
        </div>

        <div className="flex-1  pb-16 p-2">

          <div className="">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-black">Trending Topics</h2>
              <Button variant="ghost" size="sm" className="text-xs text-black">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <Carousel
              items={clustersData2}
              baseWidth={350}
              autoplay={true}
              autoplayDelay={6000}
              pauseOnHover={true}
              loop={true}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ChannelLogosBar channels={channelData} />

              <EntitiesColumn entities={entitiesData2} />

            </div>
            <LatestArticles articles={articlesData} />
          </div>
        </div>

      </div>
    </TooltipProvider>
  );
}