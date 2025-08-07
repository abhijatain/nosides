import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface EntitiesColumnProps {
  entities: string[];
}

export default function EntitiesColumn({ entities }: EntitiesColumnProps) {
  const handleUnfollow = (entity: string) => {
    console.log(`Unfollowed ${entity}`);
  };

  return (
    <section className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Followed Entities</h2>
        <Button variant="ghost" size="sm" className="text-xs">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {entities.map((entity, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-gray-200 rounded">
            <span className="text-gray-800">{entity}</span>
            <Button variant="ghost" size="sm" onClick={() => handleUnfollow(entity)}>
              Unfollow
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}