'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import SiteHeader from '@/components/siteHeader';
import ChannelLogosBar from '@/components/home/channelLogosBar';
import Carousel from '@/components/home/clusterCarousel';
import CategoriesColumn from '@/components/home/categoriesColumn';
import EntitiesColumn from '@/components/home/entitiesColumn';
import LatestArticles from '@/components/entity/latestArticles';
import BottomNav from '@/components/bottomNav';
import { CarouselItem } from '@/components/home/clusterCarousel';
import { FiFileText } from 'react-icons/fi';
import NewsFilterBeam from '@/components/home/newsFilterBeam';
import Glow from '@/components/glow';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

// Mock data
const channelData = [
  { name: 'CNN', logo: 'https://via.placeholder.com/50?text=CNN' },
  { name: 'BBC', logo: 'https://via.placeholder.com/50?text=BBC' },
  { name: 'Fox News', logo: 'https://via.placeholder.com/50?text=Fox' },
  { name: 'Al Jazeera', logo: 'https://via.placeholder.com/50?text=AJ' },
  { name: 'The Sun', logo: 'https://via.placeholder.com/50?text=Sun' },
];

const clustersData: CarouselItem[] = [
  {
    id: 1,
    title: "Tesla's Robotaxi Delay Sparks Debate",
    description: "Tesla's delayed Robotaxi launch has raised concerns about autonomous driving timelines, with mixed sentiment across news outlets. Published: August 5, 2025",
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 2,
    title: 'Global Tech Regulation Tightens',
    description: 'New regulations targeting tech giants like Apple and Google are reshaping the industry, with debates on privacy and innovation. Published: August 3, 2025',
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 3,
    title: 'Boeing Faces Safety Scrutiny',
    description: "Boeing's ongoing safety issues with aircraft have drawn criticism, impacting its public perception. Published: July 30, 2025",
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />,
  },
];

const categoriesData = ['Technology', 'Politics', 'Business', 'Environment', 'Health'];

const entitiesData = ['Tesla', 'Elon Musk', 'Apple', 'Biden Administration', 'Boeing'];

const articlesData = [
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

export default function HomePage() {
  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-slate-50 ">
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
              items={clustersData}
              baseWidth={350}
              autoplay={true}
              autoplayDelay={6000}
              pauseOnHover={true}
              loop={true}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ChannelLogosBar channels={channelData} />
              
              <EntitiesColumn entities={entitiesData} />
              
            </div>
            <LatestArticles articles={articlesData} />
          </div>
        </div>
      
      </div>
    </TooltipProvider>
  );
}