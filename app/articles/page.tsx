'use client';

import { useState, useRef } from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import TopBar from '@/components/feed/topBar';
import ClusterTitle from '@/components/feed/clusterTitle';
import EntityTabs from '@/components/feed/entityTabs';
import Summary from '@/components/feed/summary';
import ChannelStack from '@/components/feed/channelStack';
import BottomNav from '@/components/bottomNav';
import SiteHeader from '@/components/siteHeader';

// Dummy data for visualization
const dummyChannels = [
  { name: 'CNN', logo: 'https://via.placeholder.com/50?text=CNN' },
  { name: 'BBC', logo: 'https://via.placeholder.com/50?text=BBC' },
  { name: 'Fox News', logo: 'https://via.placeholder.com/50?text=Fox' },
  { name: 'Al Jazeera', logo: 'https://via.placeholder.com/50?text=AJ' },
  { name: 'New York Times', logo: 'https://via.placeholder.com/50?text=NYT' },
  { name: 'MSNBC', logo: 'https://via.placeholder.com/50?text=MSNBC' },
  { name: 'Reuters', logo: 'https://via.placeholder.com/50?text=Reuters' },
  { name: 'The Guardian', logo: 'https://via.placeholder.com/50?text=Guardian' },
  { name: 'Wall Street Journal', logo: 'https://via.placeholder.com/50?text=WSJ' },
  { name: 'Washington Post', logo: 'https://via.placeholder.com/50?text=WP' },
  { name: 'Bloomberg', logo: 'https://via.placeholder.com/50?text=Bloomberg' },
  { name: 'NPR', logo: 'https://via.placeholder.com/50?text=NPR' },
  { name: 'Sky News', logo: 'https://via.placeholder.com/50?text=Sky' },
  { name: 'ABC News', logo: 'https://via.placeholder.com/50?text=ABC' },
  { name: 'CBS News', logo: 'https://via.placeholder.com/50?text=CBS' },
];

const dummyEntities = {
  people: [
    {
      entity: "Dummy Person 1",
      type: "people",
      sentiment_score: 0.2,
      sentiment_label: "positive",
      evidence_quotes: "Dummy evidence for person 1",
      portrayal_type: "hero"
    },
    {
      entity: "Dummy Person 2",
      type: "people",
      sentiment_score: -0.5,
      sentiment_label: "negative",
      evidence_quotes: "Dummy evidence for person 2",
      portrayal_type: "villain"
    }
  ],
  organizations: [
    {
      entity: "Financial Action Task Force (FATF)",
      type: "organizations",
      sentiment_score: 0.0,
      sentiment_label: "neutral",
      evidence_quotes: "a new report by the Financial Action Task Force (FATF), the global anti-terror financing watchdog",
      portrayal_type: "expert"
    },
    {
      entity: "National Development Complex (NDC)",
      type: "organizations",
      sentiment_score: -0.7,
      sentiment_label: "negative",
      evidence_quotes: "linked to Islamabad’s National Development Complex, which is involved in the country’s missile development programme... The bill of lading of the seized cargo provided evidence of the “link between the importer and the National Development Complex, which is involved in the development of long-range ballistic missiles”",
      portrayal_type: "villain"
    },
    {
      entity: "Missile Technology Control Regime (MTCR)",
      type: "organizations",
      sentiment_score: 0.0,
      sentiment_label: "neutral",
      evidence_quotes: "these sensitive items are included in dual-use export control lists of the Missile Technology Control Regime (MTCR)",
      portrayal_type: "neutral"
    },
    {
      entity: "Indian Customs authorities",
      type: "organizations",
      sentiment_score: 0.6,
      sentiment_label: "positive",
      evidence_quotes: "In 2020, Indian Customs authorities seized an Asian-flagged ship bound for Pakistan. During an investigation, Indian authorities confirmed that documents mis-declared the shipment’s dual-use items",
      portrayal_type: "hero"
    },
    {
      entity: "United Nations Security Council",
      type: "organizations",
      sentiment_score: 0.0,
      sentiment_label: "neutral",
      evidence_quotes: "implementation of targeted financial sanctions under the United Nations Security Council resolutions on proliferation",
      portrayal_type: "neutral"
    }
  ],
  locations: [
    {
      entity: "India",
      type: "locations",
      sentiment_score: 0.5,
      sentiment_label: "positive",
      evidence_quotes: "India seized the dual-use equipment from merchant vessel Da Cui Yun at Kandla port in Gujarat on February 3, 2020.",
      portrayal_type: "hero"
    },
    {
      entity: "Pakistan",
      type: "locations",
      sentiment_score: -0.6,
      sentiment_label: "negative",
      evidence_quotes: "A dual-use equipment seized by India from a Pakistan-bound merchant vessel in 2020 is linked to Islamabad’s National Development Complex, which is involved in the country’s missile development programme",
      portrayal_type: "villain"
    },
    {
      entity: "Islamabad",
      type: "locations",
      sentiment_score: -0.0,
      sentiment_label: "negative",
      evidence_quotes: "linked to Islamabad’s National Development Complex",
      portrayal_type: "neutral"
    },
    {
      entity: "Kandla port",
      type: "locations",
      sentiment_score: 0.0,
      sentiment_label: "neutral",
      evidence_quotes: "India seized the dual-use equipment from merchant vessel Da Cui Yun at Kandla port in Gujarat on February 3, 2020.",
      portrayal_type: "neutral"
    },
    {
      entity: "Gujarat",
      type: "locations",
      sentiment_score: 0.0,
      sentiment_label: "neutral",
      evidence_quotes: "at Kandla port in Gujarat",
      portrayal_type: "neutral"
    }
  ],
  events: [
    {
      entity: "Seizure of dual-use cargo from merchant vessel Da Cui Yun at Kandla port on February 3, 2020",
      type: "events",
      sentiment_score: -0.5,
      sentiment_label: "negative",
      evidence_quotes: "The export of equipment such as autoclaves without formal approval from various authorities is a violation of the existing law",
      portrayal_type: "victim"
    }
  ]
};

const dummySummaryBullets = [
  "India seized dual-use equipment from a Pakistan-bound ship in 2020.",
  "The equipment is linked to Pakistan's National Development Complex (NDC).",
  "NDC is involved in Pakistan's missile development program.",
  "The seizure occurred at Kandla port in Gujarat on February 3, 2020.",
  "The ship was the merchant vessel Da Cui Yun.",
  "Items were mis-declared in shipping documents.",
  "Sensitive items fall under Missile Technology Control Regime (MTCR) lists.",
  "FATF report highlights proliferation financing risks.",
  "United Nations Security Council resolutions on proliferation mentioned.",
  "Export of such equipment without approval violates laws."
];

const mockClusters = [
  {
    id: 1,
    publishedAt: '2025-08-05',
    title: 'Dual-Use Equipment Seizure Linked to Pakistan Missile Program',
    sources: [
      {
        channel: dummyChannels[0],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[1],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[2],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[3],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[4],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[5],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[6],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[7],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[8],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[9],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[10],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[11],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[12],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[13],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
      {
        channel: dummyChannels[14],
        entities: dummyEntities,
        summaryBullets: dummySummaryBullets,
      },
    ],
  },
];

export default function ClustersPage() {
  const [currentClusterIndex, setCurrentClusterIndex] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [activeTab, setActiveTab] = useState('summary');
  const [isGraphExplanationOpen, setIsGraphExplanationOpen] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const currentCluster = mockClusters[currentClusterIndex];
  const currentSource = currentCluster.sources[selectedChannel];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      if (currentClusterIndex < mockClusters.length - 1) {
        setCurrentClusterIndex(currentClusterIndex + 1);
      }
    } else if (touchEndX.current - touchStartX.current > 50) {
      if (currentClusterIndex > 0) {
        setCurrentClusterIndex(currentClusterIndex - 1);
      }
    }
  };

  return (
    <TooltipProvider>
      <SiteHeader />
      <div
        className="min-h-screen bg-[#27548A] relative mt-16"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className='bg-gradient-to-br from-[#27548A] via-[#2d5a94] to-[#1e4170] text-white'>
          
          <ClusterTitle title={currentCluster.title} />
          <TopBar
            publishedAt={currentCluster.publishedAt}
            onLike={() => console.log('Liked')}
            onSave={() => console.log('Saved')}
          />
        </div>

        <div className="bg-[#E9E9E9] rounded-t-2xl p-2 ">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-2 px-4 text-center font-medium ${activeTab === 'summary'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center font-medium ${activeTab === 'analysis'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab('analysis')}
            >
              Analysis
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'summary' && (
            <div className="p-2">
              <div className="flex items-center gap-2 text-sm text-black rounded-lg border-2 border-black p-2 m-2">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
                </svg>
                <p>To view a summary specific to a channel, select a channel from below.</p>
              </div>
              <ChannelStack
                channels={currentCluster.sources.map(s => s.channel)}
                selectedChannel={selectedChannel}
                onSelect={setSelectedChannel}
              />
              <Summary bullets={currentSource.summaryBullets} />
            </div>
          )}
          {activeTab === 'analysis' && (
            <div className="p-2">
              <div className=" text-black">
                <button
                  className="w-full flex justify-between items-center p-2  rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setIsGraphExplanationOpen(!isGraphExplanationOpen)}
                >
                  <h2 className="text-lg font-semibold">What This Graph Shows</h2>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${isGraphExplanationOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isGraphExplanationOpen && (
                  <div className="mt-2 p-2  rounded-lg text-sm">
                    <p>
                      This graph shows how positively or negatively different people, organizations, locations, or events are portrayed in the news. Each bar represents an entity, like a person or a place, and its length shows the strength of the sentiment. Green bars mean positive coverage (e.g., praised or supported), while red bars mean negative coverage (e.g., criticized or viewed unfavorably). You can use the dropdown to see sentiments over the last week, month, or year.
                    </p>
                  </div>
                )}
              </div>
              <EntityTabs entities={currentSource.entities} />
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}