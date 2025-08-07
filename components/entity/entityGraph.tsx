'use client';

import { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface Relationship {
  target: string;
  weight: number;
  type: string;
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

    // Prepare nodes
    const nodes = [
      { id: mainEntity, label: mainEntity, color: '#FF9F00', font: { color: '#FFFFFF' } },
      ...relationships.map((rel) => ({
        id: rel.target,
        label: rel.target,
        color: '#592966',
        font: { color: '#FFFFFF' }
      }))
    ];

    // Prepare edges with weights
    const edges = relationships.map((rel) => ({
      from: mainEntity,
      to: rel.target,
      label: rel.type,
      width: Math.max(1, rel.weight * 5), // Scale weight to edge width (0.1-1.0 -> 0.5-5)
      color: { color: '#FFFFFF', opacity: Math.min(rel.weight, 0.8) }
    }));

    const data = { nodes, edges };

    const options = {
      nodes: {
        shape: 'circle',
        size: 20,
        font: { size: 12 },
      },
      edges: {
        font: { size: 10, align: 'middle' },
        smooth: { type: 'continuous' }
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -50,
          centralGravity: 0.01,
          springLength: 100,
          springConstant: 0.08
        },
        maxVelocity: 50,
        solver: 'forceAtlas2Based'
      },
      interaction: {
        hover: true,
        zoomView: true,
        dragView: true
      }
    };

    // Initialize network
    networkRef.current = new Network(containerRef.current, data, options);

    // Cleanup
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
        <CardTitle>Top 6 Entity Relationships</CardTitle>
      </CardHeader>
      <CardContent className='p-0 m-0'>
        <div
          ref={containerRef}
          style={{
            height: '400px',
            width: '100%',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2327548A'/%3E%3Ccircle cx='10' cy='10' r='1' fill='%23FFFFFF' opacity='0.8'/%3E%3Ccircle cx='20' cy='80' r='0.8' fill='%23FFFFFF' opacity='0.6'/%3E%3Ccircle cx='50' cy='30' r='1.2' fill='%23FFFFFF' opacity='0.7'/%3E%3Ccircle cx='70' cy='60' r='0.9' fill='%23FFFFFF' opacity='0.5'/%3E%3Ccircle cx='90' cy='20' r='1' fill='%23FFFFFF' opacity='0.6'/%3E%3Ccircle cx='30' cy='50' r='0.7' fill='%23FFFFFF' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '100px 100px'
          }}
        />
        
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500 mt-2">
          Edge thickness represents relationship strength. Hover or drag to interact.
        </p>
      </CardFooter>
    </Card>
  );
}