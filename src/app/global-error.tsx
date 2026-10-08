"use client";

// Replaces the root layout when it fails, so it ships its own <html> and inline styles.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#fff", color: "#010101" }}>
        <main style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "48px 24px" }}>
          <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em", color: "#757575" }}>Erro inesperado</p>
          <h1 style={{ fontSize: "clamp(40px, 8vw, 120px)", lineHeight: 0.85, letterSpacing: "-0.05em", margin: "24px 0" }}>
            Algo não saiu como esperado.
          </h1>
          <button
            type="button"
            onClick={reset}
            style={{ alignSelf: "flex-start", height: 50, padding: "0 20px", borderRadius: 12, border: 0, background: "#010101", color: "#fff", fontSize: 16, cursor: "pointer" }}
          >
            Tentar novamente
          </button>
        </main>
      </body>
    </html>
  );
}
