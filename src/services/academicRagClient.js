/**
 * Base URL del asistente RAG (FastAPI: academic_rag_api_colab.py).
 *
 * - Colab / ngrok: en `.env` poné `VITE_ACADEMIC_RAG_URL=https://xxxx.ngrok-free.app` (la que imprime Colab).
 * - API solo en tu PC (puerto 8000): `VITE_RAG_PROXY_LOCAL=true` y el proxy de Vite usa `/academic-rag` → 127.0.0.1:8000.
 * Sin URL ni proxy explícito, no se llama al RAG (evita ECONNREFUSED si no hay nada en :8000).
 */
export function getAcademicRagBaseUrl() {
  const raw = import.meta.env.VITE_ACADEMIC_RAG_URL;
  if (raw && typeof raw === "string" && raw.trim() !== "") {
    return raw.replace(/\/$/, "");
  }
  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_RAG_PROXY_LOCAL === "true"
  ) {
    return "/academic-rag";
  }
  return "";
}

/**
 * @returns {Promise<{ reply: string, error?: string } | null>}
 *          null si no hay URL base (modo solo frontend).
 */
export async function queryAcademicRag(message, options = {}) {
  const base = getAcademicRagBaseUrl();
  if (!base) return null;

  const timeoutMs = options.timeoutMs ?? 180000;
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), timeoutMs);

  const headers = {
    "Content-Type": "application/json",
  };
  if (base.includes("ngrok")) {
    headers["ngrok-skip-browser-warning"] = "1";
  }

  try {
    const res = await fetch(`${base}/v1/chat`, {
      method: "POST",
      headers,
      body: JSON.stringify({ message }),
      signal: ctrl.signal,
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(
        "El RAG no devolvió JSON (¿página intermedia de ngrok?). Revisá la URL y los headers."
      );
    }
    if (!res.ok) {
      throw new Error(data.error || `RAG HTTP ${res.status}`);
    }
    return data;
  } catch (e) {
    if (e.name === "AbortError") {
      throw new Error(
        `Tiempo de espera agotado (${timeoutMs / 1000}s). El Colab puede estar lento o colgado en preprocess_query / Gemini.`
      );
    }
    throw e;
  } finally {
    clearTimeout(tid);
  }
}
