// components/entity/sentimentChart.tsx
'use client';

import { TrendingUp } from "lucide-react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  youtube: {
    label: "YouTube Sentiment",
    color: "#ff9100ff",
  },
  news: {
    label: "News Sentiment",
    color: "#cb1effff",
  },
} satisfies ChartConfig;

interface SentimentData {
  date: string;
  youtube: number;
  news: number;
}

interface SentimentChartProps {
  data: SentimentData[];
}

export default function SentimentChart({ data }: SentimentChartProps) {
  return (
    <Card className="mb-6 bg-black text-white  md:shadow-none md:border-0">
      <CardHeader>
        <CardTitle>Sentiment Over Time</CardTitle>
        <CardDescription  className="">Average sentiment scores from YouTube and News sources</CardDescription>
      </CardHeader>
      <CardContent >
        <ChartContainer config={chartConfig} >
          <ResponsiveContainer width="100%" height={300} >
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
              />
              <YAxis
                domain={[-1, 1]}
                tickFormatter={(value) => value.toFixed(2)}
              />
              <Tooltip
                content={({ payload, label }) => {
                  if (payload && payload.length) {
                    return (
                      <div className="bg-black p-3 rounded-lg text-white">
                        <p className="font-semibold">{new Date(label).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                        {payload.map((entry, index) => (
                          <p key={index}>
                            <span className="font-medium">{entry.name}:</span> {entry.value.toFixed(2)}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="youtube"
                stroke={chartConfig.youtube.color}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="news"
                stroke={chartConfig.news.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}