// src/app/characters/page.tsx
import CatGallery from "./CatGallery";

export default function CharactersPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-center my-6">Galería de Gatos</h1>
      <CatGallery />
    </main>
  );
}
