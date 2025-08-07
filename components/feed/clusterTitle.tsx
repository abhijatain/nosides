// components/ClusterTitle.tsx

interface ClusterTitleProps {
  title: string;
}

export default function ClusterTitle({ title }: ClusterTitleProps) {
  return (
    <div className="flex flex-col text-white py-6 px-2 gap-6">
      <h1 className="text-4xl font-bold text-center">{title}</h1>
      {/* <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">Views</span>
          </div>
          <p className="text-2xl font-bold text-white">1,234</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">Articles</span>
          </div>
          <p className="text-2xl font-bold text-white">456</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
            </svg>
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">Shares</span>
          </div>
          <p className="text-2xl font-bold text-white">7,890</p>
        </div>
      </div> */}
    </div>
  );
}