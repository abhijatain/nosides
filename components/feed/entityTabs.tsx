// components/EntityTabs.tsx
import { useState } from 'react';
import SentimentBarChart from '../channels/sentimentBarChart';

interface Entity {
  entity: string;
  type: string;
  sentiment_score: number;
  sentiment_label: string;
  evidence_quotes: string;
  portrayal_type: string;
}

interface Entities {
  people: Entity[];
  organizations: Entity[];
  locations: Entity[];
  events: Entity[];
}

interface EntityTabsProps {
  entities: Entities;
}

export default function EntityTabs({ entities }: EntityTabsProps) {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'year'>('month');

  // Transform entities into SentimentData format
  const sentimentData = {
    week: [
      ...entities.people.map(e => ({ entity: e.entity, sentiment: e.sentiment_score })),
      ...entities.organizations.map(e => ({ entity: e.entity, sentiment: e.sentiment_score })),
      ...entities.locations.map(e => ({ entity: e.entity, sentiment: e.sentiment_score })),
      ...entities.events.map(e => ({ entity: e.entity, sentiment: e.sentiment_score })),
    ].filter(e => e.sentiment !== 0).slice(0, 10), // Exclude neutral, limit to top 10
    month: [
      ...entities.people.map(e => ({ entity: e.entity, sentiment: e.sentiment_score * 1.1 })),
      ...entities.organizations.map(e => ({ entity: e.entity, sentiment: e.sentiment_score * 1.1 })),
      ...entities.locations.map(e => ({ entity: e.entity, sentiment: e.sentiment_score * 1.1 })),
      ...entities.events.map(e => ({ entity: e.entity, sentiment: e.sentiment_score * 1.1 })),
    ].filter(e => e.sentiment !== 0).slice(0, 10),
    year: [
      ...entities.people.map(e => ({ entity: e.entity, sentiment: e.sentiment_score * 1.2 })),
      ...entities.organizations.map(e => ({ entity: e.entity, sentiment: e.sentiment_score * 1.2 })),
      ...entities.locations.map(e => ({ entity: e.entity, sentiment: e.sentiment_score * 1.2 })),
      ...entities.events.map(e => ({ entity: e.entity, sentiment: e.sentiment_score * 1.2 })),
    ].filter(e => e.sentiment !== 0).slice(0, 10),
  };

  return (
    <div className="w-full">
      <SentimentBarChart
        sentimentData={sentimentData} 
        timeFilter={timeFilter} 
        setTimeFilter={setTimeFilter} 
      />
    </div>
  );
}