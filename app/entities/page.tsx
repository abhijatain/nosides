
'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import SiteHeader from '@/components/siteHeader';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FindConnection from '@/components/findConnections';

// Define sentiment data interface
interface SentimentData {
  entity: string;
  sentiment: number;
  displaySentiment: string;
}

// Generate dummy data for top entities
const generateDummyData = () => {
  const entities = [
    "Elon Musk", "Tesla", "General Motors", "Panasonic", "BYD", "NVIDIA", "Ford",
    "Apple", "Google", "Amazon", "Microsoft", "Meta", "SpaceX", "NASA", "Boeing",
    "Volkswagen", "Toyota", "Honda", "Samsung", "Intel", "AMD", "Qualcomm",
    "Pfizer", "Moderna", "Johnson & Johnson", "AstraZeneca", "Walmart", "Target",
    "Alibaba", "Tencent", "Baidu", "JPMorgan Chase", "Goldman Sachs", "Morgan Stanley",
    "Bank of America", "Wells Fargo", "Chevron", "ExxonMobil", "Shell", "BP",
    "Saudi Aramco", "United Airlines", "Delta Air Lines", "American Airlines",
    "FedEx", "UPS", "Disney", "Netflix", "Warner Bros", "Universal Pictures",
    "Sony", "LG", "IBM", "Oracle", "SAP", "Salesforce", "Adobe", "Zoom",
    "TikTok", "ByteDance", "Twitter", "Snapchat", "Reddit", "BBC", "CNN",
    "Fox News", "New York Times", "Washington Post", "Wall Street Journal",
    "Bloomberg", "Reuters", "European Union", "United Nations", "World Bank",
    "IMF", "WHO", "CDC", "FBI", "CIA", "NSA", "Pentagon", "White House",
    "Kremlin", "Xi Jinping", "Vladimir Putin", "Joe Biden", "Kamala Harris",
    "Boris Johnson", "Emmanuel Macron", "Angela Merkel", "Ursula von der Leyen",
    "Christine Lagarde", "Jerome Powell", "Janet Yellen", "BlackRock", "Vanguard",
    "Starbucks", "McDonald's", "Coca-Cola", "PepsiCo", "Nestlé", "Unilever"
  ];

  const selectedEntities = entities.slice(0, 100);

  // Generate dummy sentiment data for top 20
  const sentimentData: SentimentData[] = selectedEntities
    .slice(0, 20)
    .map((entity) => ({
      entity,
      sentiment: (Math.random() * 2 - 1) * 100,
      displaySentiment: `${(Math.random() * 2 - 1).toFixed(2)}`,
    }));

  return { sentimentData };
};

export default function Home() {
  const [data] = useState(() => generateDummyData());
  const { sentimentData } = data;
  
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <SiteHeader />
      <FindConnection />

      {/* Search Bar */}
      <Card className="mb-6 p-4">
        <Input
          type="text"
          placeholder="Search entities or relationship types..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full"
        />
      </Card>

      {/* Top 20 Entities with Sentiment in 2 Columns */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Top 20 Entities</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {sentimentData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-gray-800 rounded"
            >
              <a
                href={`/entities/${item.entity.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-300 hover:text-blue-500"
              >
                {item.entity}
              </a>
              <span
                className={`font-medium ${
                  item.sentiment >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {item.sentiment >= 0 ? '+' : ''}{item.displaySentiment}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
