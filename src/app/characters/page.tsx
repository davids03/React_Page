// src/app/characters/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Cat = { id: string; url: string };

export default function CharactersPage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=12")
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data: Cat[]) => setCats(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Cargando gatos… 🐱</p>;
  }
  if (error) {
    return (
      <p className="p-6 text-center text-red-600">
        Error al cargar gatos: {error}
      </p>
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
