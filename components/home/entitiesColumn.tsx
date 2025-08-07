import React from 'react';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';

interface EntitiesColumnProps {
  entities: string[];
}

export default function EntitiesColumn({ entities }: EntitiesColumnProps) {
  // Mock sentiment data for entities
  const sentimentData = entities.map((entity, index) => ({
    entity,
    sentiment: Math.random() * 2 - 1, // Random sentiment between -1 and 1
    displaySentiment: (Math.random() * 100).toFixed(1), // Random display value
  }));

  return (
    <section className="">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-black">Entities</h2>
        <Button variant="ghost" size="sm" className="text-xs text-black">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
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
      </div>
    </section>
  );
}