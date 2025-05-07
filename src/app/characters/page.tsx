// src/app/characters/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar personajes:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6 text-center text-lg">Cargando personajes...</p>;
  }

  return (
    <main className="section">
      <div className="container">
        <h1 className="mb-8 text-center text-h3 lg:text-h1">Personajes</h1>
        <div className="row">
          {characters.map((char) => (
            <div key={char.id} className="mb-8 md:col-4 lg:col-3">
              <div className="bg-theme-light dark:bg-darkmode-theme-light rounded-lg p-4 shadow h-full text-center">
                <Image
                  src={char.image}
                  alt={char.name}
                  width={200}
                  height={200}
                  className="mx-auto rounded"
                />
                <h2 className="mt-4 text-xl font-semibold">{char.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {char.species} - {char.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
