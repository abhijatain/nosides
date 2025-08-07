import { ExternalLink, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface Entity {
  entity: string;
  sentiment: number;
  displaySentiment: string;
}

interface Channel {
  name: string;
  logo: string;
}

interface Article {
  title: string;
  channels: Channel[];
  date: string;
  url: string;
  summary: string;
  entities: Entity[];
}

interface LatestArticlesProps {
  articles: Article[];
}

export default function LatestArticles({ articles }: LatestArticlesProps) {
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return `${diffInDays}d ago`;
      } else {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
      }
    }
  };

  const renderChannels = (channels: Channel[]) => {
    if (channels.length === 1) {
      // Single channel: show avatar and name
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
    } else {
      // Multiple channels: show stacked avatars only
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
    }
  };

  return (
    <div className="">


      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-black">Latest Articles</h2>
        <Button variant="ghost" size="sm" className="text-xs text-black">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
        {articles.map((article, index) => (
          <article
            key={index}
            className="group relative bg-gradient-to-r from-gray-50 to-white p-5 hover:shadow-md"
          >
            {/* Priority indicator for first article */}
            {index === 0 && (
              <div className="absolute -top-2 -right-2">
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  BREAKING
                </div>
              </div>
            )}

            <div className='flex justify-between'>
              {/* Channel avatars */}
              {renderChannels(article.channels)}

              {/* Time */}
              <div className="flex items-center gap-1 text-gray-500 mb-3">
                <Clock className="w-3 h-3" />
                <time className="text-xs font-medium">
                  {getRelativeTime(article.date)}
                </time>
              </div>

            </div>



            {/* Title */}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group-hover:text-blue-600 transition-colors duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-3 group-hover:text-blue-700 line-clamp-2">
                {article.title}
              </h3>
            </a>

            {/* Summary point */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {article.summary}
            </p>

            {/* Entities with sentiment */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              {article.entities.slice(0, 6).map((item, entityIndex) => (
                <div
                  key={entityIndex}
                  className="flex justify-between items-center p-2 bg-gray-800 rounded"
                >
                  <span className="text-gray-300 truncate">{item.entity}</span>
                  <span
                    className={`font-medium ml-2 ${item.sentiment >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                  >
                    {item.sentiment >= 0 ? '+' : ''}{item.displaySentiment}
                  </span>
                </div>
              ))}
            </div>



            {/* Bottom border with gradient */}
            <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </article>
        ))}
      </div>


    </div>
  );
}