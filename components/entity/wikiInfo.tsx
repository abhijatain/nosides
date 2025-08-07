// components/entity/wikiInfo.tsx

interface WikiInfoProps {
  info: {
    summary: string;
    url: string;
  };
}

export default function WikiInfo({ info }: WikiInfoProps) {
  return (
    <div className="mb-6 p-4 text-white">
      <p className=" mb-4">{info.summary}</p>
      <a
        href={info.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Read more on Wikipedia
      </a>
    </div>
  );
}