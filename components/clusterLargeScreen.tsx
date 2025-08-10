'use client';

import React, { useState, useEffect } from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Clock, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

const chartConfig = {
  sentiment: {
    label: 'Sentiment',
    color: '#FF9F00',
  },
} satisfies ChartConfig;

interface Channel {
  name: string;
  logo: string;
}

interface SentimentDataPoint {
  entity: string;
  sentiment: number;
}

interface SentimentData {
  week: SentimentDataPoint[];
  month: SentimentDataPoint[];
  year: SentimentDataPoint[];
}

interface Cluster {
  title: string;
  summary: string;
  channels: Channel[];
  date: string;
  url: string;
  sentimentData: SentimentData;
}

interface ClusterArticleSentimentProps {
  clusters: Cluster[];
}

const CustomLabel = (props: any) => {
  const { x, y, width, height, value, payload } = props;
  if (!payload || !payload.entity) {
    return null;
  }
  const isNegative = value < 0;
  return (
    <text
      x={isNegative ? x + 5 : x + width - 5}
      y={y + height / 2}
      fill="white"
      textAnchor={isNegative ? 'start' : 'end'}
      dy={3}
      fontSize={12}
      fontWeight="500"
      className="select-none"
    >
      {payload.entity}
    </text>
  );
};

export default function ClusterArticleSentiment({ clusters }: ClusterArticleSentimentProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [timeFilter] = useState<'week' | 'month' | 'year'>('week');
  const [showExplanation, setShowExplanation] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const renderChannels = (channels: Channel[]) => {
    if (channels.length === 1) {
      const channel = channels[0];
      return (
        <div className="flex items-center gap-2 mb-3">
          <img
            src={channel.logo}
            alt={channel.name}
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
          <span className="text-sm font-medium text-gray-700">{channel.name}</span>
        </div>
      );
    }
    return (
      <div className="flex -space-x-2 mb-3">
        {channels.slice(0, 4).map((channel, index) => (
          <img
            key={index}
            src={channel.logo}
            alt={channel.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
            style={{ zIndex: channels.length - index }}
            title={channel.name}
          />
        ))}
        {channels.length > 4 && (
          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">+{channels.length - 4}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-2">
      {/* Header with explanation */}
      <div className="bg-[#E2DDB4] rounded-lg p-4 mb-6 text-black">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5  mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h2 className="text-lg font-semibold  mb-2">
              News Sentiment Analysis
            </h2>
            {showExplanation && (
              <div className="text-sm  space-y-2">
                <p>
                  Each news story below is analyzed to show how different entities (people, organizations, topics) 
                  are portrayed across news channels. The sentiment chart shows whether coverage is generally 
                  <span className="inline-flex items-bottom mx-1 ">
                    <span className="font-medium text-green-700">supportive</span>
                  </span>
                  or
                  <span className="inline-flex items-bottom mx-1">
                    <span className="font-medium text-red-700">critical</span>
                  </span>
                  of each entity.
                </p>
                <p className="text-xs text-gray-600">
                  Values represent the average sentiment across all news channels covering this story.
                </p>
              </div>
            )}
            
          </div>
        </div>
      </div>

      {clusters.map((cluster, index) => {
        const data = cluster.sentimentData[timeFilter].map((item) => ({
          entity: item.entity || 'Unknown',
          sentiment: item.sentiment || 0,
          fill: item.sentiment >= 0 ? '#059669' : '#dc2626',
          displaySentiment: (item.sentiment || 0).toFixed(2),
        }));

        return (
          <div
            key={index}
            className="font-inter flex border-b-2 border-black mb-2"
          >
            {/* Left: Article Content */}
            <div className="w-[70%]">
              <article className="group relative">
                <div className="flex justify-between">
                  {renderChannels(cluster.channels)}
                  <div className="flex items-center gap-1 text-gray-500 mb-3">
                    <Clock className="w-3 h-3" />
                    <time className="text-xs font-medium">{getRelativeTime(cluster.date)}</time>
                  </div>
                </div>
                <a
                  href={cluster.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group-hover:text-blue-600 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-black leading-tight mb-3 group-hover:text-blue-700 line-clamp-2">
                    {cluster.title}
                  </h3>
                </a>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{cluster.summary}</p>
              </article>
            </div>
            
            {/* Right: Sentiment Chart */}
            <div className="w-[30%] p-2 ml-2">
              <div className="mb-4">
             
                <p className="text-xs text-gray-600 mb-3">
                  How news channels portray key entities in this story:
                </p>
              </div>
              
              <div className="sm:px-6 md:p-0">
                <div className="flex justify-center gap-4 mb-4 text-xs">
                  <div className="flex items-center gap-2 bg-white px-3 py-1">
                    <TrendingDown className="w-3 h-3 text-red-600" />
                    <span className="font-medium">Critical</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="font-medium">Supportive</span>
                  </div>
                </div>
                
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="90%" height={120}>
                    <BarChart
                      data={data}
                      layout="vertical"
                    >
                      <CartesianGrid horizontal={false} stroke="#e5e7eb" strokeDasharray="2 2" />
                      <XAxis
                        type="number"
                        domain={[-0.5, 0.5]}
                        hide={isMobile}
                        stroke="#6b7280"
                        fontSize={10}
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
                            const sentimentText = (data.sentiment || 0) > 0 ? 'Supportive' : 'Critical';
                            const sentimentColor = (data.sentiment || 0) > 0 ? '#059669' : '#dc2626';
                            const icon = (data.sentiment || 0) > 0 ? '↗' : '↘';
                            return (
                              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-lg">
                                <p className="font-semibold text-gray-800 text-sm mb-1">{data.entity || 'Unknown'}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">{icon}</span>
                                  <span className="text-gray-600 text-sm">
                                    <span className="font-medium" style={{ color: sentimentColor }}>
                                      {sentimentText}
                                    </span>
                                    {' '}coverage ({Math.abs(data.sentiment || 0).toFixed(2)})
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Average across all news sources</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar
                        dataKey="sentiment"
                        radius={4}
                        stroke="rgba(0, 0, 0, 0.1)"
                        strokeWidth={1}
                        barSize={18}
                      >
                        <LabelList content={<CustomLabel />} />
                        {data.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                
                
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}