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
import { useState } from "react";
import { Button } from "@/components/ui/button";

const chartConfig = {
  engagement: {
    label: "Articles Read",
    color: "#00ff00ff",
  },
} satisfies ChartConfig;

interface EngagementData {
  date: string;
  engagement: number;
}

interface SentimentChartProps {
  data: EngagementData[];
}

export default function SentimentChart({ data }: SentimentChartProps) {
  const [timeFilter, setTimeFilter] = useState("month");

  const filterData = (data: EngagementData[]) => {
    const now = new Date();
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      switch (timeFilter) {
        case "week":
          return (now.getTime() - itemDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
        case "year":
          return itemDate.getFullYear() === now.getFullYear();
        case "month":
        default:
          return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
      }
    });
  };

  return (
    <Card className="mb-6 bg-black text-white">
      <CardHeader>
        <CardTitle>Engagement Over Time</CardTitle>
        <CardDescription className="">Number of articles read by the user</CardDescription>
        <div className="flex space-x-2 mt-2">
          <Button
            variant={timeFilter === "month" ? "secondary" : "default"}
            onClick={() => setTimeFilter("month")}
          >
            Month
          </Button>
          <Button
            variant={timeFilter === "week" ? "secondary" : "default"}
            onClick={() => setTimeFilter("week")}
          >
            Week
          </Button>
          <Button
            variant={timeFilter === "year" ? "secondary" : "default"}
            onClick={() => setTimeFilter("year")}
          >
            Year
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filterData(data)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
              />
              <YAxis
                domain={[0, 10]}
                tickFormatter={(value) => value.toFixed(0)}
              />
              <Tooltip
                content={({ payload, label }) => {
                  if (payload && payload.length) {
                    return (
                      <div className="bg-black p-3 rounded-lg text-white">
                        <p className="font-semibold">{new Date(label).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                        {payload.map((entry, index) => (
                          <p key={index}>
                            <span className="font-medium">{entry.name}:</span> {entry.value.toFixed(0)}
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
                dataKey="engagement"
                stroke={chartConfig.engagement.color}
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