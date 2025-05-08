// src/app/characters/CatGallery.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Cat = { id: number; name: string; image: string };

export default function CatGallery() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/characters")
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data: Cat[]) => setCats(data))
      .catch((err) => {
        console.error("Error fetching /api/characters:", err);
        setError(err.message);
      })
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
    </div>
  );
}
