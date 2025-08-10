// data.tsx
import { FiFileText } from 'react-icons/fi';
import { CarouselItem } from '@/components/home/clusterCarousel';

export const channelData = [
  { name: 'CNN', logo: 'https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/06183243/NBC-1.png' },
  { name: 'BBC', logo: 'https://img.freepik.com/free-vector/gradient-breaking-news-logo-design_23-2151157239.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'Fox News', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcapIMOjqC6gOXg8p4pB36JE1XL4EDuUY1Gg&s' },
  { name: 'Al Jazeera', logo: 'https://i.pinimg.com/736x/27/cb/c3/27cbc3bc2388158925c874e012498078.jpg' },
  { name: 'The Sun', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/BBC_News_HD_Logo.svg/2560px-BBC_News_HD_Logo.svg.png' },
  { name: 'CNN', logo: 'https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/06183243/NBC-1.png' },
  { name: 'BBC', logo: 'https://img.freepik.com/free-vector/gradient-breaking-news-logo-design_23-2151157239.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'Fox News', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcapIMOjqC6gOXg8p4pB36JE1XL4EDuUY1Gg&s' },
  { name: 'Al Jazeera', logo: 'https://i.pinimg.com/736x/27/cb/c3/27cbc3bc2388158925c874e012498078.jpg' },
  { name: 'The Sun', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/BBC_News_HD_Logo.svg/2560px-BBC_News_HD_Logo.svg.png' },
];

export const clustersData2: CarouselItem[] = [
  {
    id: 1,
    title: "Tesla's Robotaxi Delay Sparks Debate",
    description: "Tesla's delayed Robotaxi launch has raised concerns about autonomous driving timelines, with mixed sentiment across news outlets. Published: August 5, 2025",
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 2,
    title: 'Global Tech Regulation Tightens',
    description: 'New regulations targeting tech giants like Apple and Google are reshaping the industry, with debates on privacy and innovation. Published: August 3, 2025',
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 3,
    title: 'Boeing Faces Safety Scrutiny',
    description: "Boeing's ongoing safety issues with aircraft have drawn criticism, impacting its public perception. Published: July 30, 2025",
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />,
  },
];

export const clustersData = [
  {
    title: "Tesla's Robotaxi Delay Ignites Industry Discussion",
    summary: "Tesla's postponed Robotaxi launch has sparked widespread concerns and debates regarding the feasibility and timelines of autonomous driving technology in the automotive industry.",
    channels: [channelData[0], channelData[1], channelData[2], channelData[3], channelData[0], channelData[1]],
    date: '2025-08-05',
    url: 'https://example.com/tesla-robotaxi-delay',
    sentimentData: {
      week: [
        { entity: 'Elon Musk', sentiment: -0.28 },
        { entity: 'Tesla', sentiment: 0.35 },
      ],
      month: [
        { entity: 'Elon Musk', sentiment: 0.25 },
        { entity: 'Tesla', sentiment: -0.30 },
      ],
      year: [
        { entity: 'Elon Musk', sentiment: -0.30 },
        { entity: 'Tesla', sentiment: 0.40 },
      ],
    },
  },
  {
    title: 'Global Tech Regulation Intensifies Worldwide',
    summary: 'Stringent new regulations are significantly reshaping the global technology industry, creating challenges and opportunities for major companies like Apple and others.',
    channels: [channelData[1], channelData[3], channelData[2], channelData[6]],
    date: '2025-08-03',
    url: 'https://example.com/tech-regulation',
    sentimentData: {
      week: [
        { entity: 'Tim Cook', sentiment: 0.75 },
        { entity: 'Apple', sentiment: -0.75 },
      ],
      month: [
        { entity: 'Tim Cook', sentiment: 0.70 },
        { entity: 'Apple', sentiment: -0.70 },
      ],
      year: [
        { entity: 'Tim Cook', sentiment: 0.65 },
        { entity: 'Apple', sentiment: -0.65 },
      ],
    },
  },
  {
    title: 'TikTok Ban Faces Supreme Court Showdown',
    summary: 'TikTok is fiercely challenging a potential U.S. ban, with critical final arguments unfolding at the Supreme Court, impacting the future of the popular social media platform.',
    channels: [channelData[0], channelData[3], channelData[4]],
    date: '2025-08-03',
    url: 'https://example.com/tiktok-ban',
    sentimentData: {
      week: [
        { entity: 'TikTok', sentiment: 0.62 },
        { entity: 'TikTok Ban Appeal', sentiment: -0.62 },
      ],
      month: [
        { entity: 'TikTok', sentiment: 0.60 },
        { entity: 'TikTok Ban Appeal', sentiment: -0.60 },
      ],
      year: [
        { entity: 'TikTok', sentiment: 0.65 },
        { entity: 'TikTok Ban Appeal', sentiment: -0.65 },
      ],
    },
  },
  {
    title: 'Tesla’s Texas Factory Expansion Faces Backlash',
    summary: 'Environmental groups are raising significant concerns and criticism over Tesla’s ambitious plans to expand its factory in Texas, citing potential ecological impacts.',
    channels: [channelData[0], channelData[1]],
    date: '2025-08-05',
    url: 'https://example.com/tesla-expansion',
    sentimentData: {
      week: [
        { entity: 'Elon Musk', sentiment: -0.28 },
        { entity: 'Tesla', sentiment: -0.35 },
        { entity: 'Texas', sentiment: -0.35 },
      ],
      month: [
        { entity: 'Elon Musk', sentiment: -0.25 },
        { entity: 'Tesla', sentiment: -0.30 },
        { entity: 'Texas', sentiment: -0.30 },
      ],
      year: [
        { entity: 'Elon Musk', sentiment: -0.30 },
        { entity: 'Tesla', sentiment: -0.40 },
        { entity: 'Texas', sentiment: -0.40 },
      ],
    },
  },
];

export const entitiesData2 = ['Tesla', 'Elon Musk', 'Apple', 'Biden Administration', 'Boeing'];

export const articlesData = [
  {
    title: "Apple's AI Integration Drives Market Confidence and Stock Rally",
    channels: [
      { name: "CNN Business", logo: "https://via.placeholder.com/40?text=CB" },
    ],
    date: "2025-08-06",
    url: "https://www.cnn.com/2025/08/06/apple-ai-integration",
    summary: "Apple's latest AI announcements have boosted investor confidence, with shares reaching new highs amid strong quarterly earnings and positive market reception.",
    entities: [
      { entity: "Apple", sentiment: 0.75, displaySentiment: "75%" },
      { entity: "Investors", sentiment: 0.68, displaySentiment: "68%" },
    ],
  },
  {
    title: "Tesla Factory Expansion Plans Face Environmental Scrutiny",
    channels: [
      { name: "CNN", logo: "https://via.placeholder.com/40?text=CNN" },
      { name: "CNN Climate", logo: "https://via.placeholder.com/40?text=CC" },
    ],
    date: "2025-08-05",
    url: "https://www.cnn.com/2025/08/05/tesla-factory-environment",
    summary: "Environmental groups raise concerns over Tesla's proposed factory expansion in Texas as the company seeks to double production capacity.",
    entities: [
      { entity: "Tesla", sentiment: -0.35, displaySentiment: "35%" },
      { entity: "Elon Musk", sentiment: -0.28, displaySentiment: "28%" },
    ],
  },
  {
    title: "Boeing Safety Oversight Under Comprehensive Federal Review",
    channels: [
      { name: "CNN", logo: "https://via.placeholder.com/40?text=CNN" },
    ],
    date: "2025-08-04",
    url: "https://www.cnn.com/2025/08/04/boeing-safety-review",
    summary: "Federal aviation regulators announce comprehensive review of Boeing's safety protocols following recent manufacturing quality concerns and ongoing issues.",
    entities: [
      { entity: "Boeing", sentiment: -0.78, displaySentiment: "78%" },
      { entity: "FAA", sentiment: 0.45, displaySentiment: "45%" },
    ],
  },
  {
    title: "TikTok Ban Appeals Process Enters Final Stage at Supreme Court",
    channels: [
      { name: "CNN Politics", logo: "https://via.placeholder.com/40?text=CP" },
      { name: "CNN Business", logo: "https://via.placeholder.com/40?text=CB" },
      { name: "CNN Tech", logo: "https://via.placeholder.com/40?text=CT" },
    ],
    date: "2025-08-03",
    url: "https://www.cnn.com/2025/08/03/tiktok-ban-appeals",
    summary: "The Supreme Court prepares to hear final arguments in TikTok's challenge to federal legislation that could ban the app in the United States.",
    entities: [
      { entity: "TikTok", sentiment: -0.62, displaySentiment: "62%" },
      { entity: "Supreme Court", sentiment: 0.18, displaySentiment: "18%" },
    ],
  },
];

export const entityData = {
  name: "Tesla, Inc.",
  type: "organization",
  sentimentData: [
    { date: "2025-01-01", youtube: 0.4, news: 0.3 },
    { date: "2025-02-01", youtube: 0.2, news: 0.1 },
    { date: "2025-03-01", youtube: -0.1, news: -0.2 },
    { date: "2025-04-01", youtube: 0.5, news: 0.4 },
    { date: "2025-05-01", youtube: 0.3, news: 0.2 },
    { date: "2025-06-01", youtube: 0.1, news: -0.1 },
    { date: "2025-07-01", youtube: -0.2, news: -0.3 },
  ],
  wikiInfo: {
    summary: "Tesla, Inc. is an American electric vehicle and clean energy company based in Austin, Texas. Tesla designs and manufactures electric cars, battery energy storage, and solar products. Founded in 2003 by Martin Eberhard and Marc Tarpenning, it became the first American automaker to go public since Ford in 1956.",
    url: "https://en.wikipedia.org/wiki/Tesla,_Inc."
  },
  relationships: [
    { target: "Elon Musk", weight: 0.9, type: "CEO" },
    { target: "General Motors", weight: 0.5, type: "competitor" },
    { target: "Panasonic", weight: 0.7, type: "partner" },
    { target: "BYD", weight: 0.4, type: "competitor" },
    { target: "NVIDIA", weight: 0.75, type: "partner" },
    { target: "Ford", weight: 0.45, type: "competitor" }
  ],
};