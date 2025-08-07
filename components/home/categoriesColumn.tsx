import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CategoriesColumnProps {
  categories: string[];
}

export default function CategoriesColumn({ categories }: CategoriesColumnProps) {
  return (
    <section className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-slate-900 ">Categories</h2>
      <div className="space-y-3">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-md transition-all duration-200 border-slate-200 bg-white"
          >
            <CardContent className="p-5 flex justify-between items-center">
              <a
                href={`/category/${category.toLowerCase()}`}
                className="text-base font-medium text-slate-800 hover:text-blue-500"
              >
                {category}
              </a>
              <Badge variant="secondary" className="text-xs">
                {Math.floor(Math.random() * 50) + 10} {/* Mock count */}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}