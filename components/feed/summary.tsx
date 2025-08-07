// components/Summary.tsx

interface SummaryProps {
  bullets: string[];
}

export default function Summary({ bullets }: SummaryProps) {
  return (
    <div className="p-4">
      <ul className="list-disc pl-5 space-y-1 ">
        {bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}