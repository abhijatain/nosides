interface Channel {
  name: string;
  youtubeUrl: string;
  websiteUrl: string;
  views: number;
  articles: number;
  shares: number;
}

interface ChannelHeaderProps {
  channel: Channel;
}

export default function ChannelHeader({ channel }: ChannelHeaderProps) {
  const formatNumber = (num: number) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + 'B';
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M';
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Channel descriptions
  const getChannelDescription = (name: string) => {
    switch (name) {
      case 'CNN':
        return 'Cable News Network - Breaking news, analysis, and investigative reporting from around the world. Your trusted source for global news coverage since 1980.';
      case 'BBC':
        return 'British Broadcasting Corporation - Independent, impartial news and analysis from the world\'s largest broadcasting organization.';
      case 'Fox News':
        return 'America\'s most-watched cable news channel, delivering fair and balanced reporting on politics, business, and world events.';
      default:
        return 'Your source for the latest news, analysis, and breaking stories from around the world.';
    }
  };

  return (
    <div className="py-6 px-4 md:p-2 text-center">
      <h1 className="text-4xl font-bold mb-3">{channel.name}</h1>
      
      {/* Channel Description */}
      <p className="text-gray-200 text-sm leading-relaxed max-w-2xl mx-auto mb-4 px-2">
        {getChannelDescription(channel.name)}
      </p>
      
      {/* Social Links */}
      <div className="flex justify-center space-x-6 mb-6">
        <a
          href={channel.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-blue-300 hover:text-blue-200 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span>YouTube</span>
        </a>
        <a
          href={channel.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-blue-300 hover:text-blue-200 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169-.331-.48-.576-.856-.678-.377-.103-.781-.005-1.115.27L12 10.8 8.402 7.752c-.334-.275-.738-.373-1.115-.27-.376.102-.687.347-.856.678-.168.332-.168.724 0 1.056L9.6 12l-3.169 2.784c-.168.332-.168.724 0 1.056.169.331.48.576.856.678.377.103.781.005 1.115-.27L12 13.2l3.598 3.048c.334.275.738.373 1.115.27.376-.102.687-.347.856-.678.168-.332.168-.724 0-1.056L14.4 12l3.169-2.784c.168-.332.168-.724 0-1.056z"/>
          </svg>
          <span>Website</span>
        </a>
      </div>

      {/* Creative Stats Display */}
      <div className="flex justify-between md:hidden">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">Views</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatNumber(channel.views)}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">Articles</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatNumber(channel.articles)}</p>

        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
            </svg>
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">Shares</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatNumber(channel.shares)}</p>

        </div>
      </div>
    </div>
  );
}