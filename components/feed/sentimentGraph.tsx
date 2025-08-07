"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts"
import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A carousel sentiment chart that auto-rotates through entity types"

const chartConfig = {
  sentiment: {
    label: "Sentiment",
    color: "#22c55e", // Green for positive
  },
} satisfies ChartConfig

interface Entity {
  entity: string;
  sentiment_score: number;
  sentiment_label: string;
  evidence_quotes: string;
  portrayal_type: string;
  type: string;
}

interface Entities {
  people: Entity[];
  organizations: Entity[];
  locations: Entity[];
  events: Entity[];
}

interface ChartBarLabelCustomProps {
  entities: Entities;
}

export function ChartBarLabelCustom({ entities }: ChartBarLabelCustomProps) {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Entity types configuration
  const entityTypes = [
    { key: 'people', label: 'People', data: entities.people },
    { key: 'organizations', label: 'Organizations', data: entities.organizations },
    { key: 'locations', label: 'Locations', data: entities.locations },
    { key: 'events', label: 'Events', data: entities.events },
  ];

  // Auto-rotate every 8 seconds, but pause when hovered
  useEffect(() => {
    if (isHovered) return; // Don't rotate when hovered
    
    const interval = setInterval(() => {
      setCurrentTypeIndex((prev) => (prev + 1) % entityTypes.length);
    }, 8000); // Slower rotation - 8 seconds

    return () => clearInterval(interval);
  }, [entityTypes.length, isHovered]);

  // Manual navigation functions
  const goToType = (index: number) => {
    setCurrentTypeIndex(index);
  };

  const goToPrevious = () => {
    setCurrentTypeIndex((prev) => prev === 0 ? entityTypes.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentTypeIndex((prev) => (prev + 1) % entityTypes.length);
  };

  const currentType = entityTypes[currentTypeIndex];
  
  // Filter out zero sentiment entities and transform data
  const chartData = currentType.data
    .filter(entity => entity.sentiment_score !== 0) // Remove zero sentiment
    .map(entity => {
      const maxBarTextLength = Math.max(8, Math.floor(Math.abs(entity.sentiment_score) * 30));
      const truncatedName = entity.entity.length > maxBarTextLength 
        ? entity.entity.slice(0, maxBarTextLength - 3) + '...' 
        : entity.entity;
      
      return {
        entity: entity.entity,
        displayName: truncatedName,
        sentiment: Math.abs(entity.sentiment_score),
        originalSentiment: entity.sentiment_score,
        sentiment_label: entity.sentiment_label,
        evidence_quotes: entity.evidence_quotes,
        portrayal_type: entity.portrayal_type,
        type: entity.type,
      };
    });

  // If no data for current type, show message
  if (chartData.length === 0) {
    return (
      <Card className="bg-black">
        <CardHeader>
          <CardTitle>Sentiment Analysis - {currentType.label}</CardTitle>
          <CardDescription>Entity Sentiment Scores - August 2025</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No sentiment data available for {currentType.label.toLowerCase()}</p>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            <span className="inline-block w-3 h-3 bg-green-500 rounded mr-1"></span>
            Positive sentiment
            <span className="inline-block w-3 h-3 bg-red-500 rounded ml-4 mr-1"></span>
            Negative sentiment
          </div>
          <div className="text-muted-foreground leading-none">
            Auto-rotating through entity types every 8 seconds • Hover to pause
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-black text-white"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sentiment Analysis - {currentType.label}</CardTitle>
            <CardDescription>Average Sentiment Scores - August 2025</CardDescription>
          
         </div>
          
          {/* Manual navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous entity type"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next entity type"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Progress indicators */}
        <div className="flex gap-2 mt-3">
          {entityTypes.map((type, index) => (
            <button
              key={type.key}
              onClick={() => goToType(index)}
              className={`h-2 w-8 rounded transition-all duration-300 ${
                index === currentTypeIndex ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to ${type.label}`}
            />
          ))}
        </div>
        
        
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="entity"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 15)}
              hide
            />
            <XAxis 
              dataKey="sentiment" 
              type="number" 
              domain={[0, 1]}
              hide 
            />
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-black p-3  rounded-lg max-w-xs">
                      <p className="font-semibold">{data.entity}</p>
                      <p><span className="font-medium">Score:</span> {data.originalSentiment.toFixed(2)}</p>
                      <p><span className="font-medium">Label:</span> {data.sentiment_label}</p>
                      <p><span className="font-medium">Type:</span> {data.portrayal_type}</p>
                      <p className="text-sm mt-1"><span className="font-medium">Evidence:</span> "{data.evidence_quotes}"</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="sentiment"
              layout="vertical"
              radius={4}
              barSize={50}
            >
              {/* Color each bar based on sentiment */}
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.originalSentiment >= 0 ? '#015c13ff' : '#790628ff'} // Green for positive, red for negative
                />
              ))}
              
              {/* Entity name labels inside bars */}
              <LabelList
                dataKey="displayName"
                position="insideLeft"
                offset={8}
                className="fill-white font-medium"
                fontSize={12}
                style={{ whiteSpace: 'nowrap' }}
              />
              
              {/* Sentiment scores on the right */}
              <LabelList
                dataKey="originalSentiment"
                position="right"
                offset={8}
                className="fill-foreground font-medium fill-white"
                fontSize={12}
                formatter={(value: number) => value.toFixed(2)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
          
            
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          <span className="inline-block w-3 h-3 bg-[#015c13ff] rounded mr-1"></span>
          Positive sentiment
          <span className="inline-block w-3 h-3 bg-[#790628ff] rounded ml-4 mr-1"></span>
          Negative sentiment
        </div>
      
      </CardFooter>
   
    </Card>
  )
}