'use client';

import React, { useState } from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const chartConfig = {
  sentiment: {
    label: "Sentiment",
    color: "#FF9F00",
  },
} satisfies ChartConfig;

interface SentimentDataPoint {
  entity: string;
  sentiment: number;
}

interface SentimentData {
  week: SentimentDataPoint[];
  month: SentimentDataPoint[];
  year: SentimentDataPoint[];
}

interface SentimentBarChartProps {
  sentimentData: SentimentData;
  timeFilter: 'week' | 'month' | 'year';
  setTimeFilter: (value: 'week' | 'month' | 'year') => void;
}

// Custom label component for rendering entity names on bars
const CustomLabel = (props: any) => {
  const { x, y, width, height, value, payload } = props;
  
  // Safety check for payload
  if (!payload || !payload.entity) {
    return null;
  }
  
  const isNegative = value < 0;
  
  return (
    <text
      x={isNegative ? x + 5 : x + width - 5}
      y={y + height / 2}
      fill="white"
      textAnchor={isNegative ? "start" : "end"}
      dy={3}
      fontSize={12}
      fontWeight="500"
      className="select-none"
    >
      {payload.entity}
    </text>
  );
};

export default function SentimentBarChart({ sentimentData, timeFilter, setTimeFilter }: SentimentBarChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on component mount
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add safety checks for data
  const rawData = sentimentData?.[timeFilter] || [];
  const data = rawData.map((item) => ({
    entity: item?.entity || 'Unknown',
    sentiment: item?.sentiment || 0,
    fill: (item?.sentiment || 0) >= 0 ? '#059669' : '#dc2626', // Green for positive, red for negative
    displaySentiment: (item?.sentiment || 0).toFixed(2)
  }));

  return (
    <Card className="mb-6 text-white bg-black md:bg-white md:text-black backdrop-blur-sm border-gray-800 md:border-0 md:shadow-none">
      <CardHeader className="pb-4 md:pb-0 md:m-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl">Top 10 Entities</CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              Most supported and criticized entities
            </CardDescription>
          </div>
          <div className="">
            <Select value={timeFilter} onValueChange={setTimeFilter} >
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="week" className="text-white hover:bg-gray-700">Last Week</SelectItem>
              <SelectItem value="month" className="text-white hover:bg-gray-700">Last Month</SelectItem>
              <SelectItem value="year" className="text-white hover:bg-gray-700">Last Year</SelectItem>
            </SelectContent>
          </Select>
          </div>
          
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 md:p-0">
        {/* Legend */}
        <div className="flex justify-center gap-6 mb-4 text-sm md:hidden">
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded"></div>
            <span className="">Negative</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded"></div>
            <span className="">Positive</span>
          </div>
        </div>

        <ChartContainer config={chartConfig} className='md:hidden'>
          <ResponsiveContainer width="100%" height={isMobile ? 600 : 450}>
            <BarChart 
              data={data} 
              layout="vertical"
              margin={{ 
                top: 10, 
                right: isMobile ? 10 : 30, 
                left: isMobile ? 10 : 30, 
                bottom: 10 
              }}
            >
              <CartesianGrid 
                horizontal={false} 
                stroke={isMobile ? "#ffffff" : "#000000ff"} 
                strokeDasharray="3 3"
              />
              <XAxis 
                type="number" 
                domain={[-0.5, 0.5]} 
                hide={isMobile}
                stroke="#ffffffff"
                fontSize={12}
              />
              <YAxis 
                dataKey="entity" 
                type="category" 
                width={0}
                tick={false}
                axisLine={false}
              />
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length && payload[0].payload) {
                    const data = payload[0].payload;
                    const sentimentText = (data.sentiment || 0) > 0 ? 'Positive' : 'Negative';
                    const sentimentColor = (data.sentiment || 0) > 0 ? '#059669' : '#dc2626';
                    
                    return (
                      <div className="bg-black p-3 rounded-lg border border-gray-700 shadow-lg">
                        <p className="font-semibold text-white text-base mb-1">{data.entity || 'Unknown'}</p>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: sentimentColor }}
                          ></div>
                          <span className="text-gray-300 text-sm">
                            {sentimentText}: {Math.abs(data.sentiment || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="sentiment" 
                radius={6}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={1}
              >
                <LabelList content={<CustomLabel />} />
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Mobile-friendly sentiment values */}
        {true && (
          <div className="mt-4 md:mt-0 md:px-4 grid grid-cols-2 gap-2 text-xs">
            {data.map((item, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-2 bg-gray-800 rounded"
              >
                <span className="text-gray-300">{item.entity}</span>
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
        )}
      </CardContent>
    </Card>
  );
}