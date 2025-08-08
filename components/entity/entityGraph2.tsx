'use client';

import { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface Relationship {
  from: string;
  to: string;
  weight: number;
  type: string;
  sentiment?: number; // Add sentiment property
}

interface EntityGraphProps {
  mainEntity: string;
  relationships: Relationship[];
}

export default function EntityGraph({ mainEntity, relationships }: EntityGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a set of unique nodes from relationships (both 'from' and 'to')
    const nodeSet = new Set<string>([mainEntity]);
    relationships.forEach((rel) => {
      nodeSet.add(rel.from);
      nodeSet.add(rel.to);
    });

    // Prepare nodes with size based on connectivity
    const nodeMap = new Map<string, number>();
    relationships.forEach((rel) => {
      nodeMap.set(rel.from, (nodeMap.get(rel.from) || 0) + 1);
      nodeMap.set(rel.to, (nodeMap.get(rel.to) || 0) + 1);
    });
    const nodes = Array.from(nodeSet).map((id) => ({
      id,
      label: id,
      color: id === mainEntity ? '#FF9F00' : '#592966',
      font: { color: '#FFFFFF' },
      size: Math.min(30, (nodeMap.get(id) || 1) * 5),
    }));

    // Function to get edge color based on sentiment
    const getEdgeColor = (sentiment: number = 0) => {
      if (sentiment > 0) return '#22C55E'; // Green for positive
      if (sentiment < 0) return '#EF4444'; // Red for negative
      return '#6B7280'; // Gray for neutral/zero
    };

    // Prepare edges with sentiment-based colors
    const edges = relationships
      .filter((rel) => rel.weight >= 0.3)
      .map((rel) => ({
        from: rel.from,
        to: rel.to,
        width: Math.max(2, rel.weight * 5),
        color: { color: getEdgeColor(rel.sentiment), opacity: 0.8 },
        smooth: { type: 'continuous' },
      }));

    const data = { nodes, edges };

    const options = {
      nodes: {
        shape: 'circle',
        font: { size: 12 },
      },
      edges: {
        font: { size: 0 }, // Hide edge labels
        smooth: { type: 'continuous' },
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -100,
          centralGravity: 0.005,
          springLength: 200,
          springConstant: 0.05,
        },
        maxVelocity: 50,
        solver: 'forceAtlas2Based',
        stabilization: { iterations: 1000 },
      },
      interaction: {
        hover: true,
        zoomView: true,
        dragView: true,
      },
      layout: {
        improvedLayout: true,
      },
    };

    networkRef.current = new Network(containerRef.current, data, options);

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [mainEntity, relationships]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Entity Relationship Graph</CardTitle>
      </CardHeader>
      <CardContent className="p-0 m-0">
        <div
          ref={containerRef}
          style={{
            height: '300px',
            width: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2327548A'/%3E%3Ccircle cx='10' cy='10' r='1' fill='%23FFFFFF' opacity='0.8'/%3E%3Ccircle cx='20' cy='80' r='0.8' fill='%23FFFFFF' opacity='0.6'/%3E%3Ccircle cx='50' cy='30' r='1.2' fill='%23FFFFFF' opacity='0.7'/%3E%3Ccircle cx='70' cy='60' r='0.9' fill='%23FFFFFF' opacity='0.5'/%3E%3Ccircle cx='90' cy='20' r='1' fill='%23FFFFFF' opacity='0.6'/%3E%3Ccircle cx='30' cy='50' r='0.7' fill='%23FFFFFF' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '100px 100px',
          }}
        />
      </CardContent>
      <CardFooter>
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-gray-500">
            Edge thickness represents relationship strength. Hover or drag to interact.
          </p>
          <div className="flex items-center space-x-6 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-green-500"></div>
              <span>Positive</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-red-500"></div>
              <span>Negative</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-gray-500"></div>
              <span>Neutral</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}