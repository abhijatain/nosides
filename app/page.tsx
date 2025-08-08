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

// Mock data
const channelData = [
  { name: 'CNN', logo: 'https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/06183243/NBC-1.png' },
  { name: 'BBC', logo: 'https://img.freepik.com/free-vector/gradient-breaking-news-logo-design_23-2151157239.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'Fox News', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcapIMOjqC6gOXg8p4pB36JE1XL4EDuUY1Gg&s' },
  { name: 'Al Jazeera', logo: 'https://i.pinimg.com/736x/27/cb/c3/27cbc3bc2388158925c874e012498078.jpg' },
  { name: 'The Sun', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/BBC_News_HD_Logo.svg/2560px-BBC_News_HD_Logo.svg.png' },
    { name: 'CNN', logo: 'https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/06183243/NBC-1.png' },
  { name: 'BBC', logo: 'https://img.freepik.com/free-vector/gradient-breaking-news-logo-design_23-2151157239.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'Fox News', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcapIMOjqC6gOXg8p4pB36JE1XL4EDuUY1Gg&s' },
  { name: 'Al Jazeera', logo: 'https://i.pinimg.com/736x/27/cb/c3/27cbc3bc2388158925c874e012498078.jpg' },
  { name: 'The Sun', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/BBC_News_HD_Logo.svg/2560px-BBC_News_HD_Logo.svg.png' },

];


const clustersData2: CarouselItem[] = [
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

const clustersData = [
  {
    title: "Tesla's Robotaxi Delay Ignites Industry Discussion",
    summary: "Tesla's postponed Robotaxi launch has sparked widespread concerns and debates regarding the feasibility and timelines of autonomous driving technology in the automotive industry.",
    channels: [channelData[0], channelData[1],channelData[2], channelData[3],channelData[0], channelData[1]],
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
    channels: [channelData[1], channelData[3],,channelData[2], channelData[6]],
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

const categoriesData = ['Technology', 'Politics', 'Business', 'Environment', 'Health'];

const entitiesData2 = ['Tesla', 'Elon Musk', 'Apple', 'Biden Administration', 'Boeing'];

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
      <div className="hidden md:flex flex-col min-h-screen ">
        <SiteHeader />
       
        <div className="flex-1 p-4 lg:p-6 lg:mt-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Cluster Components (2/3 width) */}
              <div className="lg:col-span-2 space-y-6 border-r-2 pr-4 border-black">
                <ClusterArticleSentiment clusters={clustersData} />
              </div>
              {/* Right Column: NewsFilterBeam (1/3 width) */}
              <div className="lg:col-span-1">
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