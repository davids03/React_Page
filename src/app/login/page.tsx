"use client";

import { useState, useEffect } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // si ya hay username, redirige
    if (typeof window !== "undefined" && localStorage.getItem("username")) {
      window.location.href = "/";
    }
  }, []);

  const handleLogin = () => {
    console.log("🔵 handleLogin fired, name =", name);
    alert("Click registrado, name = " + name);
    if (!name.trim()) return;
    localStorage.setItem("username", name.trim());
    window.location.href = "/";
  };

  if (!isClient) return null;

  return (
    <main style={{ padding: 20 }}>
      <h1>Login (DEBUG)</h1>
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </main>
  );
}
