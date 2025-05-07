// src/app/api/characters/route.ts
import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function GET() {
  try {
    // Traemos 12 imágenes de gato
    const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=12");
    if (!res.ok) throw new Error(`Cat API error: ${res.status}`);
    const data: Array<{ url: string }> = await res.json();

    // Mapear para que devuelva { id, name, image }
    const results = data.map((item, idx) => ({
      id: idx + 1,
      name: `Cat #${idx + 1}`,
      image: item.url,
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching cats:", error);
    return NextResponse.json({ error: "Error fetching cats" }, { status: 500 });
  }
}
