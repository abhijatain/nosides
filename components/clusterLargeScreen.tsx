'use client';

import React, { useState, useEffect } from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Clock } from 'lucide-react';
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
    <div className="space-y-4 p-4 lg:p-6">
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
            className="font-inter  grid grid-cols-1 lg:grid-cols-3 gap-6 border-b-2 pb-2 border-black"
          >
            {/* Left: Article Content */}
            <div className="lg:col-span-2">
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
            <div className="lg:col-span-1 rounded-lg p-2">
              <div className=" sm:px-6 md:p-0">
                <div className="flex justify-center gap-6 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded"></div>
                    <span>Negative</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded"></div>
                    <span>Positive</span>
                  </div>
                </div>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="90%" height={100}>
                    <BarChart
                      data={data}
                      layout="vertical"
                      
                    >
                      <CartesianGrid horizontal={false} stroke="#000000ff" strokeDasharray="3 3" />
                      <XAxis
                        type="number"
                        domain={[-0.5, 0.5]}
                        hide={isMobile}
                        stroke="#070707ff"
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
                        stroke="rgba(0, 0, 0, 1)"
                        strokeWidth={1}
                        barSize={20}
                      >
                        <LabelList content={<CustomLabel />} />
                        {data.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                {isMobile && (
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    {data.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-2 bg-gray-800 rounded"
                      >
                        <span className="text-gray-300">{item.entity}</span>
                        <span
                          className={`font-medium ${item.sentiment >= 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {item.sentiment >= 0 ? '+' : ''}{item.displaySentiment}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}