// components/entity/entityHeader.tsx

interface EntityHeaderProps {
  name: string;
  type: string;
}

export default function EntityHeader({ name, type }: EntityHeaderProps) {
  return (
    <div className="py-6 px-4">
      <h1 className="text-4xl font-bold text-center">{name}</h1>
      <p className="text-center text-sm capitalize mt-2 opacity-80">{type}</p>
    </div>
  );
}