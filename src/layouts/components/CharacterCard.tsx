import Link from "next/link";

interface Props {
  id: number;
  name: string;
  species: string;
}

export default function CharacterCard({ id, name, species }: Props) {
  return (
    <Link href={`/character/${id}`}>
      <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-md hover:shadow-lg transition">
        <h2 className="text-xl font-semibold text-primary">{name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{species}</p>
      </div>
    </Link>
  );
}
