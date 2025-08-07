// components/ChannelStack.tsx

interface Channel {
  name: string;
  logo: string;
}

interface ChannelStackProps {
  channels: Channel[];
  selectedChannel: number;
  onSelect: (index: number) => void;
}

function getInitials(name: string): string {
  return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 3);
}

export default function ChannelStack({ channels, selectedChannel, onSelect }: ChannelStackProps) {
  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-2">
      <div className="flex flex-row gap-4 px-4 py-2">
        {channels.map((channel, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 flex items-center justify-center transition-all duration-200 ${
              selectedChannel === index ? 'border-blue-500 scale-105' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <div className="w-full h-full flex items-center justify-center bg-black text-white font-bold text-sm">
              {getInitials(channel.name)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}