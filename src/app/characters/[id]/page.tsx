"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  origin: string;
}

export default function CharacterDetailPage() {
  const { id } = useParams();
  const [char, setChar] = useState<Character | null>(null);

  useEffect(() => {
    fetch(`/api/characters/${id}`)
      .then((res) => res.json())
      .then((data) => setChar(data));
  }, [id]);

  if (!char) return <p className="p-6">Cargando…</p>;

  return (
    <section className="section pt-14">
      <div className="container text-center">
        <Image
          src={char.image}
          alt={char.name}
          width={300}
          height={300}
          className="mx-auto rounded-full mb-4"
        />
        <h1 className="text-h2 mb-2">{char.name}</h1>
        <p className="text-lg mb-1"><strong>Especie:</strong> {char.species}</p>
        <p className="text-lg mb-1"><strong>Origen:</strong> {char.origin}</p>
      </div>
    </section>
  );
}
