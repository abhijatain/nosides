import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface Channel {
  name: string;
  logo: string;
}

interface ChannelLogosBarProps {
  channels: Channel[];
}

export default function ChannelLogosBar({ channels }: ChannelLogosBarProps) {
  return (
    <section className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Followed Channels</h2>
        <Button variant="ghost" size="sm" className="text-xs">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <div className="flex overflow-x-auto space-x-3 pb-2">
        {channels.map((channel, index) => (
          <div key={index} className="flex flex-col items-center min-w-[60px]">
            <Avatar className="h-12 w-12 border border-slate-200">
              <img src={channel.logo} alt={`${channel.name} logo`} className="w-full h-full object-cover" />
              <AvatarFallback className="bg-slate-100 text-slate-700 font-semibold">
                {channel.name.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-center text-black">{channel.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}