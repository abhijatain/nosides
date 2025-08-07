import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface CategoriesColumnProps {
  categories: string[];
  title: string;
}

export default function CategoriesColumn({ categories, title }: CategoriesColumnProps) {
  return (
    <section className='mb-2 pb-8'>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button variant="ghost" size="sm" className="text-xs">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {categories.map((category, index) => (
          <div key={index} className="p-2 bg-gray-200 rounded">
            <span className="text-gray-800">{category}</span>
          </div>
        ))}
      </div>
    </section>
  );
}