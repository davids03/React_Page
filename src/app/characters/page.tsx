// src/app/characters/page.tsx
export const dynamic = 'force-dynamic';

import Image from "next/image";
import config from "../../config/config.json";

export default async function CharactersPage() {
  const isProd = process.env.NODE_ENV === "production";
  const host = isProd
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const basePath = config.site.base_path !== "/" ? config.site.base_path : "";
  const apiUrl = `${host}${basePath}/api/characters`;

  const res = await fetch(apiUrl, {
    next: { revalidate: 0 }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch characters: ${res.status}`);
  }
  const characters: Array<{ id: number; name: string; image: string }> = await res.json();

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {characters.map((char) => (
        <div key={char.id} className="text-center">
          <Image
            src={char.image}
            alt={char.name}
            width={200}
            height={200}
            className="mx-auto rounded-lg shadow"
          />
          <h2 className="mt-2 text-lg font-semibold">{char.name}</h2>
        </div>
      ))}
    </main>
  );
}
