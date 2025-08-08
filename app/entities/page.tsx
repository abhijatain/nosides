'use client';

import { useEffect, useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import EntityGraph from '@/components/entity/entityGraph2';
import SiteHeader from '@/components/siteHeader';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

// Define the Relationship interface with sentiment
interface Relationship {
  from: string;
  to: string;
  weight: number;
  type: string;
  sentiment?: number; // Add sentiment (-1 to 1)
}

// Define sentiment data interface
interface SentimentData {
  entity: string;
  sentiment: number;
  displaySentiment: string;
}

// Autocomplete Input Component
interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  suggestions: string[];
  className?: string;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  placeholder,
  suggestions,
  className
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
    setActiveSuggestion(-1);
  }, [value, suggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestion >= 0 && activeSuggestion < filteredSuggestions.length) {
        handleSuggestionClick(filteredSuggestions[activeSuggestion]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestion(-1);
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      setShowSuggestions(false);
      setActiveSuggestion(-1);
    }, 150);
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(value.length > 0 && filteredSuggestions.length > 0)}
        onBlur={handleBlur}
        className={className}
      />
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                index === activeSuggestion ? 'bg-blue-100' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Generate dummy data with sentiment
const generateDummyData = () => {
  const entities = [
    "Elon Musk", "Tesla", "General Motors", "Panasonic", "BYD", "NVIDIA", "Ford",
    "Apple", "Google", "Amazon", "Microsoft", "Meta", "SpaceX", "NASA", "Boeing",
    "Volkswagen", "Toyota", "Honda", "Samsung", "Intel", "AMD", "Qualcomm",
    "Pfizer", "Moderna", "Johnson & Johnson", "AstraZeneca", "Walmart", "Target",
    "Alibaba", "Tencent", "Baidu", "JPMorgan Chase", "Goldman Sachs", "Morgan Stanley",
    "Bank of America", "Wells Fargo", "Chevron", "ExxonMobil", "Shell", "BP",
    "Saudi Aramco", "United Airlines", "Delta Air Lines", "American Airlines",
    "FedEx", "UPS", "Disney", "Netflix", "Warner Bros", "Universal Pictures",
    "Sony", "LG", "IBM", "Oracle", "SAP", "Salesforce", "Adobe", "Zoom",
    "TikTok", "ByteDance", "Twitter", "Snapchat", "Reddit", "BBC", "CNN",
    "Fox News", "New York Times", "Washington Post", "Wall Street Journal",
    "Bloomberg", "Reuters", "European Union", "United Nations", "World Bank",
    "IMF", "WHO", "CDC", "FBI", "CIA", "NSA", "Pentagon", "White House",
    "Kremlin", "Xi Jinping", "Vladimir Putin", "Joe Biden", "Kamala Harris",
    "Boris Johnson", "Emmanuel Macron", "Angela Merkel", "Ursula von der Leyen",
    "Christine Lagarde", "Jerome Powell", "Janet Yellen", "BlackRock", "Vanguard",
    "Starbucks", "McDonald's", "Coca-Cola", "PepsiCo", "Nestlé", "Unilever"
  ];

  const selectedEntities = entities.slice(0, 100);
  const relationships: Relationship[] = [];
  const relationshipTypes = ["partner", "competitor", "investor", "supplier"];
  const mainEntity = selectedEntities[0]; // e.g., "Elon Musk"
  const edgeSet = new Set<string>();

  // Generate relationships with sentiment
  selectedEntities.forEach((entity) => {
    const numRelationships = Math.floor(Math.random() * 3) + 1; // 1-3 relationships
    const otherEntities = selectedEntities.filter((e) => e !== entity);
    const shuffledOthers = otherEntities.sort(() => Math.random() - 0.5);

    for (let j = 0; j < Math.min(numRelationships, otherEntities.length); j++) {
      const to = shuffledOthers[j];
      const edgeKey = `${entity}-${to}`;
      const reverseEdgeKey = `${to}-${entity}`;
      if (!edgeSet.has(edgeKey) && !edgeSet.has(reverseEdgeKey)) {
        const weight = Math.random() * 0.9 + 0.1;
        const type = relationshipTypes[Math.floor(Math.random() * relationshipTypes.length)];
        // Generate sentiment between -1 and 1, with bias based on relationship type
        let sentiment = Math.random() * 2 - 1;
        if (type === "partner") sentiment = Math.abs(sentiment); // Partners tend to be positive
        if (type === "competitor") sentiment = -Math.abs(sentiment); // Competitors tend to be negative
        
        relationships.push({ from: entity, to, weight, type, sentiment });
        edgeSet.add(edgeKey);
      }
    }
    // Ensure Elon Musk and Tesla have a positive relationship
    if (entity === "Elon Musk" && !edgeSet.has("Elon Musk-Tesla")) {
      relationships.push({ 
        from: "Elon Musk", 
        to: "Tesla", 
        weight: 0.9, 
        type: "CEO", 
        sentiment: 0.8 // Very positive
      });
      edgeSet.add("Elon Musk-Tesla");
    }
  });

  // Generate dummy sentiment data for top 20
  const sentimentData: SentimentData[] = selectedEntities
    .slice(0, 20)
    .map((entity) => ({
      entity,
      sentiment: (Math.random() * 2 - 1) * 100, // Random sentiment between -100 and 100
      displaySentiment: `${(Math.random() * 2 - 1).toFixed(2)}`, // Random display between -1 and 1
    }));

  return { mainEntity, relationships, sentimentData, selectedEntities };
};

export default function Home() {
  // Generate data once and store in state to prevent fluctuations
  const [data] = useState(() => generateDummyData());
  const { mainEntity, relationships, sentimentData, selectedEntities } = data;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [entity1, setEntity1] = useState("");
  const [entity2, setEntity2] = useState(""); // Default to Tesla for testing
  const [filteredRelationships, setFilteredRelationships] = useState(relationships);
  const [path, setPath] = useState<Relationship[] | null>(null);
  const [connectionSentiment, setConnectionSentiment] = useState<string>('');

  // Initialize filtered relationships when relationships change
  useEffect(() => {
    setFilteredRelationships(relationships);
  }, [relationships]);

  // Find shortest path between two entities with sentiment analysis (case-insensitive)
  const findConnection = () => {
    if (!entity1 || !entity2 || entity1.toLowerCase() === entity2.toLowerCase() || !relationships.length) {
      setPath(null);
      setConnectionSentiment('');
      return;
    }

    // Find exact matches (case-insensitive)
    const findExactEntity = (input: string) => {
      return selectedEntities.find(entity => 
        entity.toLowerCase() === input.toLowerCase()
      ) || input;
    };

    const exactEntity1 = findExactEntity(entity1);
    const exactEntity2 = findExactEntity(entity2);

    const visited = new Set<string>();
    const queue: { entity: string; path: Relationship[] }[] = [];
    const entityMap = new Map<string, Relationship[]>();

    // Build bidirectional relationship map
    relationships.forEach((rel) => {
      if (!entityMap.has(rel.from)) entityMap.set(rel.from, []);
      entityMap.get(rel.from)!.push(rel);
      if (!entityMap.has(rel.to)) entityMap.set(rel.to, []);
      entityMap.get(rel.to)!.push({ 
        ...rel, 
        from: rel.to, 
        to: rel.from,
        sentiment: rel.sentiment // Keep the same sentiment for reverse edge
      });
    });

    queue.push({ entity: exactEntity1, path: [] });
    visited.add(exactEntity1);

    while (queue.length > 0) {
      const { entity, path: currentPath } = queue.shift()!;
      const rels = entityMap.get(entity) || [];

      for (const rel of rels) {
        const nextEntity = rel.to;
        if (nextEntity === exactEntity2) {
          const foundPath = [...currentPath, rel];
          setPath(foundPath);
          
          // Calculate overall sentiment of the connection path
          const avgSentiment = foundPath.reduce((sum, r) => sum + (r.sentiment || 0), 0) / foundPath.length;
          let sentimentLabel = 'Neutral';
          let sentimentColor = 'text-gray-500';
          
          if (avgSentiment > 0.1) {
            sentimentLabel = 'Positive';
            sentimentColor = 'text-green-500';
          } else if (avgSentiment < -0.1) {
            sentimentLabel = 'Negative';
            sentimentColor = 'text-red-500';
          }
          
          setConnectionSentiment(`Overall Connection Sentiment: ${sentimentLabel} (${avgSentiment.toFixed(2)})`);
          return;
        }
        if (!visited.has(nextEntity)) {
          visited.add(nextEntity);
          queue.push({ entity: nextEntity, path: [...currentPath, rel] });
        }
      }
    }
    setPath(null);
    setConnectionSentiment('No connection found');
  };

  // Filter relationships based on search term
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredRelationships(relationships);
    } else {
      setFilteredRelationships(
        relationships.filter(
          (rel) =>
            rel.from.toLowerCase().includes(term) ||
            rel.to.toLowerCase().includes(term) ||
            rel.type.toLowerCase().includes(term)
        )
      );
    }
  };

  // Get sentiment color class
  const getSentimentColorClass = (sentiment: string) => {
    if (sentiment.includes('Positive')) return 'text-green-500';
    if (sentiment.includes('Negative')) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      {/* Connection Finder Section with Graph */}
      <SiteHeader />
      <Card className="mb-6 mt-18">
        <CardHeader>
          <CardTitle>Find Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row sm:flex-row sm:space-x-2 mb-4 space-x-2 sm:space-y-0">
            <AutocompleteInput
              value={entity1}
              onChange={setEntity1}
              placeholder="Entity 1"
              suggestions={selectedEntities}
              className="w-full sm:w-5/12 text-sm"
            />
            <AutocompleteInput
              value={entity2}
              onChange={setEntity2}
              placeholder="Entity 2"
              suggestions={selectedEntities}
              className="w-full sm:w-5/12 text-sm"
            />
            <Button onClick={findConnection} className=" sm:w-2/12">Find</Button>
          </div>
          
          {connectionSentiment && (
            <div className={`mb-4 font-medium ${getSentimentColorClass(connectionSentiment)}`}>
              {connectionSentiment}
            </div>
          )}
          
          {path && path.length > 0 ? (
            <div>
              <div className="text-gray-700 mb-4">
                <div className="font-semibold mb-2">Connection Path:</div>
                {path.map((rel, idx) => (
                  <div key={idx} className="mb-1 flex items-center">
                    <span className="mr-2">{rel.from}</span>
                    <div className={`w-4 h-1 mx-2 ${
                      rel.sentiment && rel.sentiment > 0.1 ? 'bg-green-500' :
                      rel.sentiment && rel.sentiment < -0.1 ? 'bg-red-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="ml-2">{rel.to}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      (sentiment: {rel.sentiment?.toFixed(2) || '0.00'})
                    </span>
                  </div>
                ))}
              </div>
              <EntityGraph
                mainEntity={entity1}
                relationships={path.map(p => ({ 
                  ...p, 
                  weight: 1,
                  sentiment: p.sentiment 
                }))}
              />
            </div>
          ) : connectionSentiment.includes('No connection') ? (
            <p className="text-gray-500">No connection found between the entities.</p>
          ) : null}
        </CardContent>
      </Card>

      {/* Search Bar */}
      <Card className="mb-6 p-4">
        <Input
          type="text"
          placeholder="Search entities or relationship types..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full"
        />
      </Card>

      {/* Top 20 Entities with Sentiment in 2 Columns */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Top 20 Entities</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {sentimentData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-gray-800 rounded"
            >
              <a
                href={`/entities/${item.entity.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-300 hover:text-blue-500"
              >
                {item.entity}
              </a>
              <span
                className={`font-medium ${
                  item.sentiment >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {item.sentiment >= 0 ? '+' : ''}{item.displaySentiment}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}