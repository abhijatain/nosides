// components/TopBar.tsx
import { Heart, Bookmark } from 'lucide-react'; // Assuming lucide-react for icons

interface TopBarProps {
  publishedAt: string;
  onLike: () => void;
  onSave: () => void;
}

export default function TopBar({ publishedAt, onLike, onSave }: TopBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-white">
      <span className="text-sm">Published at: {publishedAt}</span>
      <div className="flex space-x-4">
        <button onClick={onLike}>
          <Heart className="w-5 h-5" />
        </button>
        <button onClick={onSave}>
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}