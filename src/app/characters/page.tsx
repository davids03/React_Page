// src/app/characters/page.tsx
export const dynamic = 'force-dynamic';

import Image from "next/image";

type Cat = { id: string; url: string };

export default async function CharactersPage() {
  let cats: Cat[] = [];

  try {
    const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=12", {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error(`Cat API responded ${res.status}`);
    cats = await res.json();
  } catch (error) {
    console.error("Error fetching cats:", error);
    return (
      <main className="p-6 text-center text-red-600">
        <h1>Error loading cats</h1>
        <p>Vuelve a intentarlo más tarde.</p>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cats.map((cat) => (
        <div key={cat.id} className="text-center">
          <Image
            src={cat.url}
            alt={`Cat ${cat.id}`}
            width={250}
            height={250}
            className="mx-auto rounded-lg shadow"
          />
          <h2 className="mt-2 text-lg font-semibold">Cat #{cat.id}</h2>
        </div>
      ))}
    </main>
  );
}
