// src/app/characters/page.tsx
import Image from "next/image";

export default async function CatsPage() {
  // Llamada a nuestra API interna de gatos
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/characters`);
  if (!res.ok) {
    throw new Error(`Failed to fetch cats: ${res.status}`);
  }
  const cats: Array<{ id: number; name: string; image: string }> = await res.json();

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cats.map((cat) => (
        <div key={cat.id} className="text-center">
          <Image
            src={cat.image}
            alt={cat.name}
            width={250}
            height={250}
            className="mx-auto rounded-lg shadow"
          />
          <h2 className="mt-2 text-lg font-semibold">{cat.name}</h2>
        </div>
      ))}
    </main>
  );
}
