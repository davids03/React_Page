// src/app/api/characters/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data = await res.json();
    return NextResponse.json(data.results);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
